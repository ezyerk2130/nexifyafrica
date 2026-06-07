import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const VALID_TAGS = [
  "sanity",
  "caseStudy",
  "service",
  "faqItem",
  "principle",
  "teamMember",
  "homePage",
  "manifestoPage",
  "teamPage",
  "contactPage",
] as const;

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const docType = (body as { _type?: string })._type;

    const tagsToRevalidate =
      docType && (VALID_TAGS as readonly string[]).includes(docType)
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
