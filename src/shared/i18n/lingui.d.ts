type MacroMessageDescriptor = (
  | {
      id: string;
      message?: string;
    }
  | {
      id?: string;
      message: string;
    }
) & {
  comment?: string;
  context?: string;
};

declare module "@lingui/core/macro" {
  export function t(
    descriptor: MacroMessageDescriptor | TemplateStringsArray,
  ): string;
}
