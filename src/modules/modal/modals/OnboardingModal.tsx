import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ScrollView } from "react-native-gesture-handler";

import { ScaledButton } from "#design-system/components/Button/Button";
import { Modal } from "#modules/modal/Modal";
import { useGlobalModal, useGlobalModalActions } from "#modules/modal/useModal";
import { Typography } from "#shared/fonts/Typography";
import { useMMKVOnboarding } from "#shared/mmkv/useMMKV";

export const OnboardingModal = () => {
  const theme = useTheme();
  const { _ } = useLingui();

  const { isVisible, modal } = useGlobalModal();

  const { hideModal } = useGlobalModalActions();

  const { setHasReadOnboarding } = useMMKVOnboarding();

  const isModalVisible = isVisible && modal === "onboarding";

  if (!isModalVisible) return null;

  return (
    <Modal>
      <Container>
        <Title
          variant="H2"
          color={theme.colors.neutral[0]}
          bold
          text={_(msg`Important Notice`)}
        />
        <ScrollView showsVerticalScrollIndicator={true}>
          <TextContainer>
            <Typo
              variant="P1"
              color={theme.colors.neutral[0]}
              text={_(
                msg`This application provides a general weather-based riding score for your convenience.`,
              )}
            />
            <Typo
              variant="P1"
              color={theme.colors.neutral[0]}
              text={_(
                msg`Actual conditions may differ from predictions, and unforeseen circumstances can arise at any time. Your decision to ride should not be based solely on this score or any other information provided by the app.`,
              )}
            />
            <Typo
              variant="P1"
              color={theme.colors.neutral[0]}
              text={_(
                msg`By proceeding, you acknowledge that the developers and providers of this service cannot be held responsible for any consequences arising from your ride decisions.`,
              )}
            />
          </TextContainer>
        </ScrollView>
        <ScaledButton
          onPress={() => {
            setHasReadOnboarding(true);
            hideModal();
          }}
          title={_(msg`Got it`)}
        />
      </Container>
    </Modal>
  );
};

const Container = styled.View(({ theme }) => ({
  width: "100%",
  height: 500,
  backgroundColor: theme.colors.background.component,
  borderRadius: theme.borderRadius.xl,
  padding: theme.spacings.l,
  gap: theme.spacings.l,
  alignItems: "center",
}));

const TextContainer = styled.View(({ theme }) => ({
  flex: 1,
  gap: theme.spacings.m,
}));

const Title = styled(Typography)({
  textAlign: "center",
});

const Typo = styled(Typography)({
  textAlign: "justify",
});
