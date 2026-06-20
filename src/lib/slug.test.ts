import { describe, expect, it } from "vitest";
import {
  caseStudyPathSegment,
  decodePathSegment,
  normalizePathSegment,
} from "./slug";

describe("decodePathSegment", () => {
  it("decodes encoded route segments", () => {
    expect(decodePathSegment("crafted%20Malkia%20App")).toBe("crafted Malkia App");
  });

  it("returns malformed encoded values unchanged", () => {
    expect(decodePathSegment("100%25-growth%")).toBe("100%25-growth%");
  });
});

describe("normalizePathSegment", () => {
  it("normalizes authored phrase slugs to URL path segments", () => {
    expect(normalizePathSegment("Creating best online language learning experience")).toBe(
      "creating-best-online-language-learning-experience",
    );
  });

  it("normalizes encoded route segments", () => {
    expect(normalizePathSegment("crafted%20Malkia%20App")).toBe("crafted-malkia-app");
  });
});

describe("caseStudyPathSegment", () => {
  it("returns a canonical case-study path segment", () => {
    expect(caseStudyPathSegment("reimagining payments")).toBe("reimagining-payments");
  });
});
