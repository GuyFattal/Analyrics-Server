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

export type parsedXML = {
  xml: {
    artists?: { props: { fullname: string } }[];
    writers?: { props: { fullname: string } }[];
    artists_songs?: { props: { SID: string; artist_name: string } }[];
    groups_of_words?: { props: { group_name: string } }[];
    songs?: {
      props: { SID: string; song_name: string; song_year: number; genre_name: string };
    }[];
    words?: {
      props: {
        WID: string;
        row_offset: number;
        section_row: number;
        section: number;
        SID: string;
        text_data: string;
      };
    }[];
    writers_songs?: { props: { SID: string; writer_name: string } }[];
    groups_words?: { props: { group_name: string; WordID: string } }[];
    phrases?: { props: { phrase: string } }[];
  };
};

export type insertTuples = {
  artists?: string;
  writers?: string;
  artists_songs?: string;
  groups_of_words?: string;
  songs?: string;
  words?: string;
  writers_songs?: string;
  groups_words?: string;
  phrases?: string;
};

export type tables =
  | "artists"
  | "writers"
  | "artists_songs"
  | "writers_songs"
  | "groups_of_words"
  | "songs"
  | "words"
  | "phrases"
  | "groups_words";
