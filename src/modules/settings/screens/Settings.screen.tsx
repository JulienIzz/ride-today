import { t } from "@lingui/core/macro";

import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";

export const Settings = () => {
  return (
    <PageTemplate>
      <PageTitleWithBack title={t`Settings`} />
    </PageTemplate>
  );
};
