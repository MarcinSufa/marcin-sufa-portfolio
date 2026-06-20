import { describe, expect, it } from "vitest";
import {
  navLinks,
  socials,
  stats,
  agentChips,
  terminalScript,
  marqueeItems,
  experience,
  education,
  languages,
  focus,
  projects,
  ossTools,
  rules,
  principles,
  loopPhases,
  loopUnit,
  loopConstants,
  fleetModels,
  stackGroups,
} from "./content";

describe("content invariants", () => {
  it("has the expected collection sizes", () => {
    expect(navLinks).toHaveLength(5);
    expect(stats).toHaveLength(3);
    expect(agentChips).toHaveLength(5);
    expect(experience).toHaveLength(5);
    expect(education).toHaveLength(3);
    expect(languages).toHaveLength(2);
    expect(focus).toHaveLength(3);
    expect(projects).toHaveLength(6);
    expect(ossTools).toHaveLength(4);
    expect(rules).toHaveLength(7);
    expect(principles).toHaveLength(6);
    expect(loopPhases).toHaveLength(6);
    expect(loopUnit).toHaveLength(3);
    expect(loopConstants).toHaveLength(4);
    expect(fleetModels).toHaveLength(5);
    expect(stackGroups).toHaveLength(5);
  });

  it("exposes the core contact details", () => {
    expect(socials.email).toBe("sufa.marcin@gmail.com");
    expect(socials.cv).toMatch(/\.pdf$/);
    expect(socials.x).toContain("smolexander");
    expect(socials.github).toContain("MarcinSufa");
  });

  it("nav links are in-page anchors", () => {
    for (const link of navLinks) {
      expect(link.href.startsWith("#")).toBe(true);
      expect(link.label.length).toBeGreaterThan(0);
    }
  });

  it("marks exactly one current experience entry", () => {
    expect(experience.filter((e) => e.current).length).toBe(1);
    expect(experience[0].current).toBe(true);
  });

  it("agent chips carry a valid rgb triplet and percentage position", () => {
    for (const chip of agentChips) {
      expect(chip.rgb).toHaveLength(3);
      chip.rgb.forEach((c) => {
        expect(c).toBeGreaterThanOrEqual(0);
        expect(c).toBeLessThanOrEqual(255);
      });
      expect(chip.left).toMatch(/%$/);
      expect(chip.top).toMatch(/%$/);
    }
  });

  it("the terminal script alternates commands and outputs", () => {
    const cmds = terminalScript.filter((s) => "cmd" in s);
    const outs = terminalScript.filter((s) => "out" in s);
    expect(cmds.length).toBeGreaterThan(0);
    expect(outs.length).toBeGreaterThan(0);
    expect(cmds.length + outs.length).toBe(terminalScript.length);
  });

  it("marks exactly two cross-model review phases in the loop", () => {
    expect(loopPhases.filter((p) => p.review).length).toBe(2);
  });

  it("every project has a tech list and a CTA label", () => {
    for (const project of projects) {
      expect(project.techs.length).toBeGreaterThan(0);
      expect(project.linkLabel.length).toBeGreaterThan(0);
    }
  });

  it("marks exactly one accent stack group", () => {
    expect(stackGroups.filter((g) => g.accent).length).toBe(1);
  });

  it("marqueeItems are unique, non-empty strings", () => {
    expect(new Set(marqueeItems).size).toBe(marqueeItems.length);
    marqueeItems.forEach((item) => expect(item.length).toBeGreaterThan(0));
  });
});
