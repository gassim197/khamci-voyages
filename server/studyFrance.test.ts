import { beforeEach, describe, expect, it, vi } from "vitest";
import { studyFranceRouter } from "./studyFrance";
import { createQuote } from "./db";
import { sendStudyApplicationNotification } from "./email";
import type { TrpcContext } from "./_core/context";
import { csvCell } from "../shared/csv";
vi.mock("./db", () => ({ createQuote: vi.fn() }));
vi.mock("./email", () => ({ sendStudyApplicationNotification: vi.fn() }));
const caller = studyFranceRouter.createCaller({
  user: null,
  req: { headers: {} },
  res: {},
} as TrpcContext);
const valid = {
  name: "Aïssatou Test",
  email: "etudiante@example.com",
  phone: "+224 611 000 000",
  city: "Conakry",
  diploma: "Licence en gestion",
  level: "Master" as const,
  field: "Gestion",
  intake: "À définir",
  progress: "Je commence mon projet" as const,
  funding: "Financement prévu" as const,
  consent: true as const,
  campaign: {
    source: "facebook",
    medium: "social",
    name: "objectif-france",
    content: "carrousel-2",
  },
};
beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(createQuote).mockResolvedValue(undefined);
  vi.mocked(sendStudyApplicationNotification).mockResolvedValue(true);
});
describe("Préinscription France", () => {
  it("saves project, campaign and dated consent in the existing admin inbox", async () => {
    expect(await caller.submit(valid)).toEqual({ success: true });
    expect(createQuote).toHaveBeenCalledTimes(1);
    const saved = vi.mocked(createQuote).mock.calls[0][0];
    expect(saved).toMatchObject({
      serviceType: "etudes_france",
      source: "etudes-france",
      status: "pending",
      passengers: null,
      destination: "France",
      clientEmail: valid.email,
    });
    for (const text of [
      "Conakry",
      "Licence en gestion",
      "Master",
      "À définir",
      "carrousel-2",
      "formulaire France v1",
    ])
      expect(saved.message).toContain(text);
    expect(sendStudyApplicationNotification).toHaveBeenCalledTimes(1);
  });
  it.each([
    { consent: false },
    { website: "spam.example" },
    { email: "incorrect" },
    { phone: "abc" },
    { level: "invalid" },
    { notes: "x".repeat(1001) },
    { campaign: { source: "x".repeat(101) } },
  ])("rejects invalid input before storage: %j", async invalid => {
    await expect(
      caller.submit({ ...valid, ...invalid } as never)
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(createQuote).not.toHaveBeenCalled();
    expect(sendStudyApplicationNotification).not.toHaveBeenCalled();
  });
  it("returns a retryable error when storage fails and sends no notification", async () => {
    vi.mocked(createQuote).mockRejectedValue(new Error("database unavailable"));
    await expect(caller.submit(valid)).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
    });
    expect(sendStudyApplicationNotification).not.toHaveBeenCalled();
  });
  it("keeps a saved application successful if the email service fails", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(sendStudyApplicationNotification).mockRejectedValue(
      new Error("smtp unavailable")
    );
    await expect(caller.submit(valid)).resolves.toEqual({ success: true });
    expect(createQuote).toHaveBeenCalledTimes(1);
    log.mockRestore();
  });
  it("does not let the visitor override the workflow fields", async () => {
    await caller.submit({
      ...valid,
      status: "completed",
      source: "admin",
      serviceType: "vol",
    } as never);
    expect(createQuote).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "pending",
        source: "etudes-france",
        serviceType: "etudes_france",
      })
    );
  });
});
describe("CSV des demandes", () => {
  it("preserves delimiters, quotes and newlines", () => {
    expect(csvCell('Nom; "test"\nProjet')).toBe('"Nom; ""test""\nProjet"');
  });
  it.each(["=1+1", "+224611000000", " @SUM(A1)", "-1+2"])(
    "neutralizes spreadsheet formulas: %s",
    value => {
      expect(csvCell(value)).toBe(`"'${value}"`);
    }
  );
});
