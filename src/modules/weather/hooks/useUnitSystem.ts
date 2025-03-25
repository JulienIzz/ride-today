import { UnitsEnum } from "#modules/weather/types/units.types";
import { useMMKVUnits } from "#shared/mmkv/useMMKV";

export const useUnitSystem = () => {
  const { isImperialEnabled } = useMMKVUnits();
  const unitSystem = isImperialEnabled ? UnitsEnum.METRIC : UnitsEnum.IMPERIAL;
  return unitSystem;
};
