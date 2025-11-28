import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { openURL } from "expo-linking";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";

import { SectionList } from "#design-system/components/Sections/SectionList";
import { useGlobalModalActions } from "#modules/modal/useModal";
import { Typography } from "#shared/fonts/Typography";

export const About = () => {
  const router = useRouter();
  const { _ } = useLingui();

  const { showOnboarding } = useGlobalModalActions();

  return (
    <SectionList
      title={_(msg`About`)}
      childrens={[
        <Section
          key={"Privacy policy"}
          label={_(msg`Privacy policy`)}
          onPress={() => openURL("https://www.ride-today.com/privacy")}
        />,
        <Section
          key={"User prevention"}
          label={_(msg`User prevention`)}
          onPress={showOnboarding}
        />,
        <Section
          key={"Credits"}
          label={_(msg`Credits`)}
          onPress={() => {
            router.navigate("/about/credits");
          }}
        />,
      ]}
    />
  );
};

const Section = ({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) => {
  const theme = useTheme();

  return (
    <SectionContainer onPress={onPress}>
      <Typography variant="P1" color={theme.colors.neutral[0]} text={label} />
      <ChevronRight size={24} color={theme.colors.neutral[0]} />
    </SectionContainer>
  );
};

const SectionContainer = styled.TouchableOpacity({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
