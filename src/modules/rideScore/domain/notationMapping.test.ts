import { conditionNotations } from "#modules/rideScore/domain/notationMapping";

describe("conditionNotations", () => {
  it("contains mappings for all weather API condition codes", () => {
    expect(conditionNotations.length).toBeGreaterThan(0);
  });

  it("has unique condition codes", () => {
    const codes = conditionNotations.map((c) => c.code);
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  it("has notation values between 0 and 5", () => {
    conditionNotations.forEach(({ notation }) => {
      expect(notation).toBeGreaterThanOrEqual(0);
      expect(notation).toBeLessThanOrEqual(5);
    });
  });

  describe("clear/cloudy conditions have high notations", () => {
    const clearCodes = [1000, 1003, 1006, 1009];

    it.each(clearCodes)("code %i has notation 5", (code) => {
      const condition = conditionNotations.find((c) => c.code === code);
      expect(condition?.notation).toBe(5);
    });
  });

  describe("snow conditions have low notations", () => {
    const snowCodes = [1114, 1213, 1216, 1219, 1222, 1225, 1237];

    it.each(snowCodes)("code %i has notation 0 or 1", (code) => {
      const condition = conditionNotations.find((c) => c.code === code);
      expect(condition?.notation).toBeLessThanOrEqual(1);
    });
  });

  describe("rain conditions have moderate notations", () => {
    const lightRainCodes = [1180, 1183, 1186, 1189];

    it.each(lightRainCodes)("light rain code %i has notation 3", (code) => {
      const condition = conditionNotations.find((c) => c.code === code);
      expect(condition?.notation).toBe(3);
    });

    const heavyRainCodes = [1195, 1246];

    it.each(heavyRainCodes)("heavy rain code %i has notation 1", (code) => {
      const condition = conditionNotations.find((c) => c.code === code);
      expect(condition?.notation).toBe(1);
    });
  });
});
