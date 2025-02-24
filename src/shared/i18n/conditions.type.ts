export type Conditions = Condition[];

export interface Condition {
  code: number;
  day: string;
  night: string;
  icon: number;
  languages: Language[];
}

export interface Language {
  lang_name: string;
  lang_iso: string;
  day_text: string;
  night_text: string;
}
