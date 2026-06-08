import { describe, expect, it } from "vitest";
import { isSafeHref, safeHref } from "./url";

describe("isSafeHref", () => {
  it("accepts http and https URLs", () => {
    expect(isSafeHref("http://example.com")).toBe(true);
    expect(isSafeHref("https://example.com/path?q=1")).toBe(true);
  });

  it("accepts mailto and tel schemes", () => {
    expect(isSafeHref("mailto:hello@nexifyafrica.com")).toBe(true);
    expect(isSafeHref("tel:+254700000000")).toBe(true);
  });

  it("accepts relative paths and anchors", () => {
    expect(isSafeHref("/contact")).toBe(true);
    expect(isSafeHref("#section")).toBe(true);
    expect(isSafeHref("?tab=2")).toBe(true);
    expect(isSafeHref("//cdn.example.com/img.png")).toBe(true);
  });

  it("rejects javascript and data URLs", () => {
    expect(isSafeHref("javascript:alert(1)")).toBe(false);
    expect(isSafeHref("JavaScript:alert(1)")).toBe(false);
    expect(isSafeHref("data:text/html,<script>alert(1)</script>")).toBe(false);
    expect(isSafeHref("vbscript:msgbox(1)")).toBe(false);
  });

  it("rejects empty, whitespace, and nullish values", () => {
    expect(isSafeHref("")).toBe(false);
    expect(isSafeHref("   ")).toBe(false);
    expect(isSafeHref(undefined)).toBe(false);
    expect(isSafeHref(null)).toBe(false);
  });
});

describe("safeHref", () => {
  it("returns the href when safe", () => {
    expect(safeHref("https://example.com")).toBe("https://example.com");
  });

  it("returns the fallback when unsafe", () => {
    expect(safeHref("javascript:alert(1)")).toBe("#");
    expect(safeHref("javascript:alert(1)", "/")).toBe("/");
    expect(safeHref(undefined, "/home")).toBe("/home");
  });
});
