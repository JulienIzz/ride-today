import {
  getBaseNotation,
  getConditionNotation,
  getTemperatureModifier,
} from "#modules/weather/domain/conditionScore";

describe("getTemperatureModifier", () => {
  it("returns -5 for very cold temperatures (below -2°C)", () => {
    expect(getTemperatureModifier(-10)).toBe(-5);
    expect(getTemperatureModifier(-3)).toBe(-5);
  });

  it("returns -4 for cold temperatures (-2°C to 2°C)", () => {
    expect(getTemperatureModifier(-2)).toBe(-4);
    expect(getTemperatureModifier(0)).toBe(-4);
    expect(getTemperatureModifier(1)).toBe(-4);
  });

  it("returns -1 for cool temperatures (2°C to 10°C)", () => {
    expect(getTemperatureModifier(2)).toBe(-1);
    expect(getTemperatureModifier(5)).toBe(-1);
    expect(getTemperatureModifier(9)).toBe(-1);
  });

  it("returns 0 for comfortable temperatures (10°C to 30°C)", () => {
    expect(getTemperatureModifier(10)).toBe(0);
    expect(getTemperatureModifier(20)).toBe(0);
    expect(getTemperatureModifier(29)).toBe(0);
  });

  it("returns -1 for hot temperatures (30°C and above)", () => {
    expect(getTemperatureModifier(30)).toBe(-1);
    expect(getTemperatureModifier(40)).toBe(-1);
  });
});

describe("getBaseNotation", () => {
  it("returns 5 for clear/sunny conditions (code 1000)", () => {
    expect(getBaseNotation(1000)).toBe(5);
  });

  it("returns 5 for cloudy conditions", () => {
    expect(getBaseNotation(1003)).toBe(5); // Partly cloudy
    expect(getBaseNotation(1006)).toBe(5); // Cloudy
    expect(getBaseNotation(1009)).toBe(5); // Overcast
  });

  it("returns 3 for light rain conditions", () => {
    expect(getBaseNotation(1180)).toBe(3); // Patchy light rain
    expect(getBaseNotation(1183)).toBe(3); // Light rain
  });

  it("returns 0 for dangerous snow conditions", () => {
    expect(getBaseNotation(1114)).toBe(0); // Blowing snow
    expect(getBaseNotation(1225)).toBe(0); // Heavy snow
  });

  it("returns undefined for unknown condition codes", () => {
    expect(getBaseNotation(9999)).toBeUndefined();
  });
});

describe("getConditionNotation", () => {
  describe("ideal conditions (sunny, comfortable temperature, daytime)", () => {
    it("returns 5 for sunny day at 20°C", () => {
      expect(getConditionNotation(1000, 1, 20)).toBe(5);
    });

    it("returns 5 for cloudy day at 15°C", () => {
      expect(getConditionNotation(1006, 1, 15)).toBe(5);
    });
  });

  describe("temperature impact", () => {
    it("reduces score for cold temperatures", () => {
      // Sunny (base 5) + cold modifier (-4) = 1
      expect(getConditionNotation(1000, 1, 0)).toBe(1);
    });

    it("reduces score for very cold temperatures", () => {
      // Sunny (base 5) + very cold modifier (-5) = 0
      expect(getConditionNotation(1000, 1, -10)).toBe(0);
    });

    it("reduces score for hot temperatures", () => {
      // Sunny (base 5) + hot modifier (-1) = 4
      expect(getConditionNotation(1000, 1, 35)).toBe(4);
    });
  });

  describe("night time impact", () => {
    it("halves the score at night", () => {
      // Sunny (base 5) + comfortable temp (0) = 5, then halved = 2
      expect(getConditionNotation(1000, 0, 20)).toBe(2);
    });

    it("halves score at night with cold temperature", () => {
      // Sunny (base 5) + cold (-1) = 4, then halved = 2
      expect(getConditionNotation(1000, 0, 5)).toBe(2);
    });
  });

  describe("bad weather conditions", () => {
    it("returns low score for heavy rain", () => {
      // Heavy rain (base 1) + comfortable temp (0) = 1
      expect(getConditionNotation(1195, 1, 20)).toBe(1);
    });

    it("returns 0 for blizzard conditions", () => {
      // Blowing snow (base 0) + any modifier = 0 minimum
      expect(getConditionNotation(1114, 1, 20)).toBe(0);
    });
  });

  describe("unknown condition codes", () => {
    it("returns undefined for unknown codes", () => {
      expect(getConditionNotation(9999, 1, 20)).toBeUndefined();
    });
  });

  describe("score never goes negative", () => {
    it("clamps to 0 for extremely bad combinations", () => {
      // Snow (base 0) + very cold (-5) should still be 0, not negative
      expect(getConditionNotation(1225, 1, -20)).toBe(0);
    });
  });
});
