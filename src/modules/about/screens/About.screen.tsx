import { t } from "@lingui/core/macro";

import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";

export const About = () => {
  return (
    <SafePageTemplate>
      <PageTitleWithBack title={t`About`} />
    </SafePageTemplate>
  );
};
