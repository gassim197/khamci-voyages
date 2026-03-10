import { describe, it, expect } from "vitest";

describe("Email configuration", () => {
  it("should have GMAIL_USER environment variable set", () => {
    const gmailUser = process.env.GMAIL_USER;
    // The secret should be set (non-empty string)
    expect(gmailUser).toBeDefined();
    expect(typeof gmailUser).toBe("string");
    expect(gmailUser!.length).toBeGreaterThan(0);
  });

  it("should have GMAIL_APP_PASSWORD environment variable set", () => {
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    // The secret should be set (non-empty string)
    expect(gmailPass).toBeDefined();
    expect(typeof gmailPass).toBe("string");
    expect(gmailPass!.length).toBeGreaterThan(0);
  });

  it("GMAIL_USER should look like an email address", () => {
    const gmailUser = process.env.GMAIL_USER;
    if (gmailUser) {
      expect(gmailUser).toMatch(/@/);
    }
  });
});
