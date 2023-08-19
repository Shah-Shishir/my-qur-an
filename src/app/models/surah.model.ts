import { Edition } from "./edition.model";

export interface SurahsResponse {
  code: number;
  status: string;
  data: Surah[];
}

export interface SurahResponse {
  code: number;
  status: string;
  data: Surah;
}

export interface Ayah {
  audio: string;
  audioSecondary: string[];
  hizbQuarter: number;
  juz: number;
  manzil: number;
  number: number;
  numberInSurah: number;
  page: number;
  ruku: number;
  sajda: boolean;
  text: string;
}

export interface Surah {
  ayahs: Ayah[];
  edition: Edition;
  englishName: string;
  englishNameTranslation: string;
  name: string;
  number: number;
  numberOfAyahs: number;
  revelationType: string;
  currentlyPlaying: boolean;
}