import { type NextRequest, NextResponse } from "next/server";
import { getSanityWriteClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 50_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactSubmissionDocument = {
  _type: "contactSubmission";
  name: string;
  email: string;
  details: string;
  submittedAt: string;
  status: "new";
  source: "contact-page";
  phone?: string;
  company?: string;
  userAgent?: string;
};

function readField(formData: FormData, field: string, maxLength: number) {
  const value = formData.get(field);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function readSingleLineField(formData: FormData, field: string, maxLength: number) {
  return readField(formData, field, maxLength).replace(/\s+/g, " ");
}

function isOversizedRequest(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  return Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES;
}

export async function POST(request: NextRequest) {
  if (isOversizedRequest(request)) {
    return NextResponse.json(
      { message: "Please shorten your message and try again." },
      { status: 413 },
    );
  }

  try {
    const formData = await request.formData();
    const honeypot = readSingleLineField(formData, "website", 200);

    if (honeypot) {
      return NextResponse.json({ message: "Message sent." });
    }

    const name = readSingleLineField(formData, "name", 120);
    const email = readSingleLineField(formData, "email", 160).toLowerCase();
    const phone = readSingleLineField(formData, "phone", 60);
    const company = readSingleLineField(formData, "company", 160);
    const details = readField(formData, "details", 4000);

    if (!name || !email || !details) {
      return NextResponse.json(
        { message: "Please fill in your name, email, and project details." },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const userAgent = request.headers.get("user-agent");
    const document: ContactSubmissionDocument = {
      _type: "contactSubmission",
      name,
      email,
      details,
      submittedAt: new Date().toISOString(),
      status: "new",
      source: "contact-page",
      ...(phone ? { phone } : {}),
      ...(company ? { company } : {}),
      ...(userAgent ? { userAgent } : {}),
    };

    await getSanityWriteClient().create(document);

    return NextResponse.json({ message: "Message sent." }, { status: 201 });
  } catch (error) {
    console.error("[contact] Failed to create Sanity submission", error);
    return NextResponse.json(
      { message: "We could not send your message right now. Please try again." },
      { status: 500 },
    );
  }
}