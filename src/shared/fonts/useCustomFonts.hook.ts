import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
  });

  return { fontsLoaded };
};
