import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ScrollView } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import { RightInfos } from "#modules/about/components/RightInfos";
import { TopRightGradientSmall } from "#shared/components/gradients/TopRightGradient";
import { PageTemplate } from "#shared/components/PageTemplate";
import { Typography } from "#shared/fonts/Typography";

const centeredStyle = {
  alignItems: "center",
} as const;

export default function PrivacyPolicy() {
  const theme = useTheme();
  const { _ } = useLingui();

  return (
    <PageTemplate>
      <TopRightGradientSmall />
      <ScrollView
        contentContainerStyle={centeredStyle}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <CenterContainer>
          {/* Title */}
          <Typography
            variant="H1"
            bold
            text={_(msg`Ride Today – Privacy Policy`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(msg`(Last Updated: April 2025)`)}
            color={theme.colors.neutral[0]}
          />

          {/* Introduction */}
          <Description
            variant="H2"
            bold
            text={_(msg`1. Introduction`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`Welcome to Ride Today. We respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy describes how we collect, use, and safeguard your personal information when you use Ride Today (the "App").`,
            )}
            color={theme.colors.neutral[0]}
          />

          {/* Creator Info */}
          <Description
            variant="H3"
            text={_(msg`Creator and Developer`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`This application was created and developed by Julien IZZILLO. If you have any questions or concerns about this Privacy Policy, you can reach us at contact@ride-today.com.`,
            )}
            color={theme.colors.neutral[0]}
          />

          {/* Data Collection */}
          <Description
            variant="H2"
            bold
            text={_(msg`2. Data We Collect`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`Ride Today only collects your device's location data. No other personal information, such as your name, email, or unique device identifiers, is gathered or processed. Your location data cannot be used to identify you, either by us or by our third-party service providers.`,
            )}
            color={theme.colors.neutral[0]}
          />

          {/* Use of Data */}
          <Description
            variant="H3"
            text={_(msg`How We Use Your Data`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`We use your location data solely to fetch relevant weather details from our trusted third-party weather provider. No other data is transmitted to the weather provider. By transmitting only location coordinates—and not any personally identifiable information—you remain anonymous to us and our third-party services.`,
            )}
            color={theme.colors.neutral[0]}
          />

          {/* Data Retention & Deletion */}
          <Description
            variant="H2"
            bold
            text={_(msg`3. Data Retention & Deletion`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`Because your location data remains on your device, we do not maintain separate databases storing your personal information. You may delete this data at any time by clearing the application data or uninstalling the App.`,
            )}
            color={theme.colors.neutral[0]}
          />

          {/* Data Security */}
          <Description
            variant="H2"
            bold
            text={_(msg`4. Data Security`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`We implement security measures to help protect your data. Any communication with our weather provider is encrypted using industry-standard protocols (e.g., HTTPS). We take precautions to keep your data secure on your device; however, no security system is completely impenetrable, and we cannot guarantee absolute security of your data.`,
            )}
            color={theme.colors.neutral[0]}
          />

          {/* Children's Privacy */}
          <Description
            variant="H2"
            bold
            text={_(msg`5. Children's Privacy`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`Ride Today does not knowingly collect any personal information from individuals under the age of 13 (or a minor in your jurisdiction) without parental consent. If you believe we have inadvertently collected such data, please contact us so that we can promptly remove the information.`,
            )}
            color={theme.colors.neutral[0]}
          />

          {/* Changes */}
          <Description
            variant="H2"
            bold
            text={_(msg`6. Changes to This Privacy Policy`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`We may update this Privacy Policy from time to time to reflect changes in our practices. When we do, we will post the updated policy within the App and update the "Last Updated" date at the top of this document. Your continued use of the App following any changes indicates your acknowledgment of the modifications.`,
            )}
            color={theme.colors.neutral[0]}
          />

          {/* Contact */}
          <Description
            variant="H2"
            bold
            text={_(msg`7. Contact Us`)}
            color={theme.colors.neutral[0]}
          />
          <Description
            variant="P1"
            text={_(
              msg`If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at contact@ride-today.com.`,
            )}
            color={theme.colors.neutral[0]}
          />

          <RightInfos />
        </CenterContainer>
      </ScrollView>
    </PageTemplate>
  );
}

const Description = styled(Typography)({
  textAlign: "justify",
});

const CenterContainer = styled(FlexView)(({ theme }) => ({
  maxWidth: 600,
  padding: theme.spacings.l,
  gap: theme.spacings.m,
}));
