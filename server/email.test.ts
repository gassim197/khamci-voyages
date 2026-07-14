import { describe, it, expect } from "vitest";

describe("Email configuration (Resend)", () => {
  it("EMAIL_FROM should look like an email address when set", () => {
    const from = process.env.EMAIL_FROM;
    if (from) {
      expect(from).toMatch(/@/);
    }
  });

  it("RESEND_API_KEY should look like a Resend key when set", () => {
    const key = process.env.RESEND_API_KEY;
    if (key) {
      // Les clés Resend commencent par "re_".
      expect(key.startsWith("re_")).toBe(true);
    }
  });
});
