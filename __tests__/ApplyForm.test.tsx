import { describe, it, expect } from "vitest";
import { applySchema } from "../components/ApplyForm";

describe("ApplyForm validation", () => {
  it("rejects underage applicants", () => {
    const res = applySchema.safeParse({
      fullName: "A",
      discordTag: "user",
      ign: "char",
      age: 15,
      experience: "some experience here",
      why: "this is a sufficiently long explanation of why",
      attachments: undefined
    });
    expect(res.success).toBe(false);
  });

  it("accepts valid applicants", () => {
    const res = applySchema.safeParse({
      fullName: "Jane Doe",
      discordTag: "jane",
      ign: "Jane Doe",
      age: 20,
      experience: "cops and robbers and EMS",
      why: "I am here to tell a grounded story and follow rules.",
      attachments: undefined
    });
    expect(res.success).toBe(true);
  });
});


