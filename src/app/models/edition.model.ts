export interface EditionResponse {
  code: number;
  status: string;
  data: Edition[];
}

export interface Edition {
  direction: string;
  englishName: string;
  format: string;
  identifier: string;
  language: string;
  name: string;
  type: string;
}