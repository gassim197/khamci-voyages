import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  createQuote: vi.fn().mockResolvedValue({ insertId: 1 }),
  getAllQuotes: vi.fn().mockResolvedValue([
    {
      id: 1,
      clientName: "Jean Dupont",
      clientEmail: "jean@example.com",
      clientPhone: "+224 611 000 000",
      destination: "Paris → Conakry",
      departureDate: "2026-04-01",
      returnDate: "2026-04-15",
      passengers: 2,
      serviceType: "vol",
      message: "Voyage de vacances",
      adminNotes: null,
      status: "pending",
      source: "website",
      createdAt: new Date("2026-03-01"),
      updatedAt: new Date("2026-03-01"),
    },
  ]),
  updateQuoteStatus: vi.fn().mockResolvedValue({}),
  deleteQuote: vi.fn().mockResolvedValue({}),
  createTestimonial: vi.fn().mockResolvedValue({ insertId: 1 }),
  getAllTestimonials: vi.fn().mockResolvedValue([
    {
      id: 1,
      clientName: "Marie Martin",
      clientTitle: "Entrepreneur",
      clientLocation: "Paris, France",
      content: "Excellent service, je recommande vivement KHAMCI VOYAGES pour tous vos voyages.",
      rating: 5,
      status: "pending",
      createdAt: new Date("2026-03-01"),
      updatedAt: new Date("2026-03-01"),
    },
  ]),
  getApprovedTestimonials: vi.fn().mockResolvedValue([]),
  updateTestimonialStatus: vi.fn().mockResolvedValue({}),
  deleteTestimonial: vi.fn().mockResolvedValue({}),
}));

// Mock the email module
vi.mock("./email", () => ({
  sendNewQuoteNotification: vi.fn().mockResolvedValue(true),
  sendQuoteConfirmationToClient: vi.fn().mockResolvedValue(true),
  sendNewTestimonialNotification: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { "x-admin-token": "khamci2024" },
    } as unknown as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// =====================
// AUTH - ADMIN LOGIN
// =====================
describe("auth.adminLogin", () => {
  it("should return success with correct password", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.auth.adminLogin({ password: "khamci2024" });
    expect(result.success).toBe(true);
    expect(result.token).toBe("khamci2024");
  });

  it("should throw UNAUTHORIZED with wrong password", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.auth.adminLogin({ password: "wrongpassword" })
    ).rejects.toThrow("Mot de passe incorrect");
  });
});

// =====================
// QUOTES
// =====================
describe("quotes.submit", () => {
  it("should submit a quote successfully", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.quotes.submit({
      clientName: "Jean Dupont",
      clientEmail: "jean@example.com",
      clientPhone: "+224 611 000 000",
      destination: "Paris → Conakry",
      departureDate: "2026-04-01",
      returnDate: "2026-04-15",
      passengers: 2,
      serviceType: "vol",
      message: "Voyage de vacances",
      source: "website",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.quotes.submit({
        clientName: "Jean Dupont",
        clientEmail: "invalid-email",
      })
    ).rejects.toThrow();
  });

  it("should reject name that is too short", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.quotes.submit({
        clientName: "J",
        clientEmail: "jean@example.com",
      })
    ).rejects.toThrow();
  });
});

describe("quotes.list (admin only)", () => {
  it("should return quotes list for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.quotes.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("clientName");
    expect(result[0]).toHaveProperty("status");
  });

  it("should reject non-admin access", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.quotes.list()).rejects.toThrow("Accès non autorisé");
  });
});

describe("quotes.updateStatus (admin only)", () => {
  it("should update quote status", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.quotes.updateStatus({
      id: 1,
      status: "in_progress",
      adminNotes: "Traitement en cours",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid status", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    await expect(
      caller.quotes.updateStatus({
        id: 1,
        status: "invalid_status" as any,
      })
    ).rejects.toThrow();
  });
});

describe("quotes.delete (admin only)", () => {
  it("should delete a quote", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.quotes.delete({ id: 1 });
    expect(result.success).toBe(true);
  });
});

// =====================
// TESTIMONIALS
// =====================
describe("testimonials.submit", () => {
  it("should submit a testimonial successfully", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.testimonials.submit({
      clientName: "Marie Martin",
      clientTitle: "Entrepreneur",
      clientLocation: "Paris, France",
      content: "Excellent service, je recommande vivement KHAMCI VOYAGES pour tous vos voyages.",
      rating: 5,
    });
    expect(result.success).toBe(true);
  });

  it("should reject content that is too short", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.testimonials.submit({
        clientName: "Marie Martin",
        content: "Trop court",
      })
    ).rejects.toThrow();
  });
});

describe("testimonials.listAll (admin only)", () => {
  it("should return all testimonials for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.testimonials.listAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("clientName");
    expect(result[0]).toHaveProperty("status");
  });

  it("should reject non-admin access", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.testimonials.listAll()).rejects.toThrow("Accès non autorisé");
  });
});

describe("testimonials.updateStatus (admin only)", () => {
  it("should approve a testimonial", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.testimonials.updateStatus({
      id: 1,
      status: "approved",
    });
    expect(result.success).toBe(true);
  });

  it("should reject a testimonial", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.testimonials.updateStatus({
      id: 1,
      status: "rejected",
    });
    expect(result.success).toBe(true);
  });
});

describe("testimonials.delete (admin only)", () => {
  it("should delete a testimonial", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.testimonials.delete({ id: 1 });
    expect(result.success).toBe(true);
  });
});
