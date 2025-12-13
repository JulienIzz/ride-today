import { conditionNotations } from "#modules/rideScore/domain/notationMapping";
import type { ConditionNotation } from "#modules/weather/domain/types";

/**
 * Calculates a temperature modifier based on how the temperature
 * affects riding comfort.
 *
 * @param tempInCelsius - Temperature in Celsius
 * @returns A modifier to apply to the base condition notation
 */
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

/**
 * Looks up the base notation for a weather condition code.
 *
 * @param code - Weather API condition code
 * @returns The base notation (0-5) or undefined if code not found
 */
export const getBaseNotation = (code: number): number | undefined => {
  return conditionNotations.find(
    (conditionNotation) => conditionNotation.code === code,
  )?.notation;
};

/**
 * Calculates the final condition notation for riding conditions.
 *
 * Takes into account:
 * - Base weather condition (rain, sun, snow, etc.)
 * - Temperature comfort
 * - Day/night (night conditions are halved)
 *
 * @param code - Weather API condition code
 * @param isDay - 1 for day, 0 for night
 * @param tempInCelsius - Current temperature in Celsius
 * @returns ConditionNotation (0-5) or undefined if condition code not found
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
