import { i18n } from "@lingui/core";

import type { Conditions } from "#shared/i18n/conditions.type";

import conditionsJSON from "./conditions.json";

export const getConditionsTranslation = (
  conditionCode: number,
  isDay: boolean,
) => {
  const conditions: Conditions = conditionsJSON;
  const localeCode = i18n.locale;

  const condition = conditions
    ?.find((cdt) => cdt.code === conditionCode)
    ?.languages.find((language) => language.lang_iso === localeCode)?.[
    isDay ? "day_text" : "night_text"
  ];

  return condition;
};
