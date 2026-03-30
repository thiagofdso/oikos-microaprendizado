import { describe, expect, it } from "vitest";

import { dashboardSnapshot } from "@/data/mock-data";

describe("dashboardSnapshot", () => {
  it("deep freezes cloned fixture data", () => {
    expect(Object.isFrozen(dashboardSnapshot)).toBe(true);
    expect(Object.isFrozen(dashboardSnapshot.sessions)).toBe(true);
    expect(Object.isFrozen(dashboardSnapshot.sessions[0])).toBe(true);
    expect(Object.isFrozen(dashboardSnapshot.sessions[0].lessonIds)).toBe(true);

    expect(() => {
      dashboardSnapshot.sessions[0].title = "Mutated title";
    }).toThrow(TypeError);

    expect(() => {
      dashboardSnapshot.sessions[0].lessonIds.push("lesson-extra");
    }).toThrow(TypeError);
  });
});
