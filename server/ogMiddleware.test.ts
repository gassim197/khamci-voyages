import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";

// Mock the db module
vi.mock("./db", () => ({
  getBlogPostBySlug: vi.fn(),
}));

import { ogMiddleware } from "./ogMiddleware";
import { getBlogPostBySlug } from "./db";

const mockedGetBlogPostBySlug = vi.mocked(getBlogPostBySlug);

function createMockReq(path: string, userAgent?: string): Partial<Request> {
  return {
    path,
    headers: { "user-agent": userAgent || "Mozilla/5.0" },
  };
}

function createMockRes(): Partial<Response> {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.set = vi.fn().mockReturnValue(res);
  res.end = vi.fn().mockReturnValue(res);
  return res;
}

describe("ogMiddleware", () => {
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
    vi.clearAllMocks();
  });

  it("should call next() for non-blog paths", () => {
    const req = createMockReq("/", "facebookexternalhit/1.1");
    const res = createMockRes();

    ogMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should call next() for blog paths from regular browsers", () => {
    const req = createMockReq("/blog/my-article", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    const res = createMockRes();

    ogMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should serve OG HTML for blog paths from Facebook crawler", async () => {
    const mockPost = {
      id: 1,
      title: "Voyager à Dubaï en 2026",
      slug: "voyager-a-dubai-2026",
      excerpt: "Découvrez nos conseils pour un voyage inoubliable à Dubaï.",
      content: "Contenu complet...",
      coverImage: "https://example.com/dubai.jpg",
      category: "destinations",
      status: "published" as const,
      authorName: "KHAMCI VOYAGES",
      readTime: 5,
      publishedAt: new Date("2026-05-01"),
      createdAt: new Date("2026-04-30"),
      updatedAt: new Date("2026-05-01"),
    };

    mockedGetBlogPostBySlug.mockResolvedValue(mockPost);

    const req = createMockReq("/blog/voyager-a-dubai-2026", "facebookexternalhit/1.1");
    const res = createMockRes();

    ogMiddleware(req as Request, res as Response, next);

    // Wait for async resolution
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(mockedGetBlogPostBySlug).toHaveBeenCalledWith("voyager-a-dubai-2026");
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.set).toHaveBeenCalledWith({ "Content-Type": "text/html; charset=utf-8" });
    expect(res.end).toHaveBeenCalled();

    // Check that the HTML contains OG tags
    const html = (res.end as any).mock.calls[0][0] as string;
    expect(html).toContain('og:title');
    expect(html).toContain("Voyager à Dubaï en 2026");
    expect(html).toContain('og:image');
    expect(html).toContain("https://example.com/dubai.jpg");
    expect(html).toContain('og:description');
    expect(html).toContain("Découvrez nos conseils");
    expect(html).toContain('og:type');
    expect(html).toContain("article");
    expect(html).toContain("twitter:card");
  });

  it("should serve OG HTML for WhatsApp crawler", async () => {
    const mockPost = {
      id: 2,
      title: "Test Article",
      slug: "test-article",
      excerpt: "Test excerpt",
      content: "Content",
      coverImage: null,
      category: "conseils",
      status: "published" as const,
      authorName: null,
      readTime: 3,
      publishedAt: new Date("2026-05-10"),
      createdAt: new Date("2026-05-10"),
      updatedAt: new Date("2026-05-10"),
    };

    mockedGetBlogPostBySlug.mockResolvedValue(mockPost);

    const req = createMockReq("/blog/test-article", "WhatsApp/2.23.20.0");
    const res = createMockRes();

    ogMiddleware(req as Request, res as Response, next);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(mockedGetBlogPostBySlug).toHaveBeenCalledWith("test-article");
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);

    const html = (res.end as any).mock.calls[0][0] as string;
    expect(html).toContain("Test Article");
    // Should use default og-image when coverImage is null
    expect(html).toContain("og-image.jpg");
  });

  it("should call next() for unpublished posts", async () => {
    const mockPost = {
      id: 3,
      title: "Draft Article",
      slug: "draft-article",
      excerpt: "Draft",
      content: "Content",
      coverImage: null,
      category: "actualites",
      status: "draft" as const,
      authorName: null,
      readTime: 2,
      publishedAt: null,
      createdAt: new Date("2026-05-15"),
      updatedAt: new Date("2026-05-15"),
    };

    mockedGetBlogPostBySlug.mockResolvedValue(mockPost);

    const req = createMockReq("/blog/draft-article", "facebookexternalhit/1.1");
    const res = createMockRes();

    ogMiddleware(req as Request, res as Response, next);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should call next() when post is not found", async () => {
    mockedGetBlogPostBySlug.mockResolvedValue(null);

    const req = createMockReq("/blog/nonexistent", "Twitterbot/1.0");
    const res = createMockRes();

    ogMiddleware(req as Request, res as Response, next);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should detect various social crawlers", () => {
    const crawlers = [
      "facebookexternalhit/1.1",
      "Facebot",
      "Twitterbot/1.0",
      "LinkedInBot/1.0",
      "WhatsApp/2.23.20.0",
      "Slackbot-LinkExpanding 1.0",
      "TelegramBot",
      "Discordbot/2.0",
    ];

    crawlers.forEach((ua) => {
      const req = createMockReq("/blog/test", ua);
      const res = createMockRes();
      const localNext = vi.fn();

      mockedGetBlogPostBySlug.mockResolvedValue({
        id: 1,
        title: "Test",
        slug: "test",
        excerpt: "Test",
        content: "Content",
        coverImage: null,
        category: "destinations",
        status: "published" as const,
        authorName: null,
        readTime: 3,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      ogMiddleware(req as Request, res as Response, localNext);

      // Should NOT call next immediately (it's processing the request)
      expect(localNext).not.toHaveBeenCalled();
    });
  });
});
