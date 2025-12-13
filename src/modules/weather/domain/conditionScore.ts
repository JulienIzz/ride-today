import { conditionNotations } from "#modules/rideScore/domain/notationMapping";
import type { ConditionNotation } from "#modules/weather/domain/types";

export const getTemperatureModifier = (tempInCelsius: number): number => {
  if (tempInCelsius < -2) {
    return -5;
  }
  if (tempInCelsius < 2) {
    return -4;
  }
  if (tempInCelsius < 10) {
    return -1;
  }
  if (tempInCelsius < 30) {
    return 0;
  }
  return -1;
};

export const getBaseNotation = (code: number): number | undefined => {
  return conditionNotations.find(
    (conditionNotation) => conditionNotation.code === code,
  )?.notation;
};

/**
 * Calculates the final condition notation for riding conditions.
 * Takes into account base weather condition, temperature comfort,
 * and day/night (night conditions are halved).
 */
export const getConditionNotation = (
  code: number,
  isDay: number,
  tempInCelsius: number,
): ConditionNotation | undefined => {
  const baseNotation = getBaseNotation(code);

  if (baseNotation === undefined) {
    return undefined;
  }

  const temperatureModifier = getTemperatureModifier(tempInCelsius);
  const modifiedNotation = baseNotation + temperatureModifier;

  return Math.max(
    Math.trunc(modifiedNotation / (isDay ? 1 : 2)),
    0,
  ) as ConditionNotation;
};
