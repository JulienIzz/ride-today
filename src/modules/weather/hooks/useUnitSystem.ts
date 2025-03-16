import { useMMKVBoolean } from "react-native-mmkv";

import { UnitsEnum } from "#modules/weather/types/units.types";
import { storage, StorageKeys } from "#shared/mmkv/store";

export const useUnitSystem = () => {
  const [isImperialEnabled] = useMMKVBoolean(
    StorageKeys.IS_IMPERIAL_ENABLED,
    storage,
  );
  const unitSystem = isImperialEnabled ? UnitsEnum.METRIC : UnitsEnum.IMPERIAL;
  return unitSystem;
};
