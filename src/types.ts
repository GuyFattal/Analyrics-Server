import { type } from "os";

export type word = {
  text_data: string;
  section: number;
  section_row: number;
  row_offset: number;
};

export type valueAndID = {
  id: string;
  value: string;
};

export type wordsResult = {
  WID: string;
  text_data: string;
  SID: string;
  section: number;
  section_row: number;
  row_offset: number;
}[];

export type SongWithWordsFetch = {
  SID: string;
  words: string;
  song_name: string;
  artists: string;
};
export type xmlFetch = { xml: string }[];
