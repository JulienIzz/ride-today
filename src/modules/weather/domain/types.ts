/**
 * Weather domain types
 *
 * These represent the core domain concepts for weather conditions
 * and their impact on riding conditions.
 */

/**
 * Condition notation represents how suitable weather conditions are for riding.
 * 0 = Worst (dangerous conditions)
 * 5 = Best (ideal conditions)
 */
export type ConditionNotation = 0 | 1 | 2 | 3 | 4 | 5;
