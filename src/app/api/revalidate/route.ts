import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const VALID_TAGS = [
  "sanity",
  "caseStudy",
  "service",
  "faqItem",
  "principle",
  "teamMember",
  "siteSettings",
  "homePage",
  "manifestoPage",
  "teamPage",
  "contactPage",
  "careersPage",
] as const;

/** Constant-time string comparison that tolerates differing lengths. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still run a comparison to keep timing roughly constant.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/** Reads the shared secret from the Authorization header (preferred) or query string (legacy). */
function extractSecret(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }
  return request.nextUrl.searchParams.get("secret");
}

/** Optional defense-in-depth: verify Sanity's HMAC signature when a signing secret is configured. */
function verifySanitySignature(rawBody: string, signatureHeader: string | null, signingSecret: string): boolean {
  if (!signatureHeader) return false;
  // Header format: "t=<timestamp>,v1=<base64url-hmac>"
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((segment) => {
      const [key, value] = segment.split("=");
      return [key?.trim(), value?.trim()];
    }),
  );
  const timestamp = parts.t;
  const provided = parts.v1;
  if (!timestamp || !provided) return false;

  const expected = createHmac("sha256", signingSecret)
    .update(`${timestamp}.${rawBody}`)
    .digest("base64url");

  return safeEqual(provided, expected);
}

export async function POST(request: NextRequest) {
  const sharedSecret = process.env.SANITY_WEBHOOK_SECRET;
  const signingSecret = process.env.SANITY_WEBHOOK_SIGNING_SECRET;

  // Read the raw body once so it can be used for both signature checks and JSON parsing.
  const rawBody = await request.text();

  let authorized = false;

  // Preferred: HMAC signature verification when a signing secret is configured.
  if (signingSecret) {
    authorized = verifySanitySignature(
      rawBody,
      request.headers.get("sanity-webhook-signature"),
      signingSecret,
    );
  }

  // Fallback / additional layer: shared secret via header or query param.
  if (!authorized && sharedSecret) {
    const provided = extractSecret(request);
    authorized = provided !== null && safeEqual(provided, sharedSecret);
  }

  if (!authorized) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    let docType: string | undefined;
    try {
      docType = (JSON.parse(rawBody || "{}") as { _type?: string })._type;
    } catch {
      docType = undefined;
    }

    const isKnownType = docType && (VALID_TAGS as readonly string[]).includes(docType);

    if (docType && !isKnownType) {
      console.warn(`[revalidate] Unknown document _type "${docType}" — revalidating all tags`);
    }

    const tagsToRevalidate = isKnownType
      ? [docType as (typeof VALID_TAGS)[number]]
      : [...VALID_TAGS];

    // Next.js 16 revalidateTag requires a second profile argument
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, {});
    }

    return NextResponse.json({ revalidated: true, tags: tagsToRevalidate, now: Date.now() });
  } catch (error) {
    console.error("[revalidate]", error);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
