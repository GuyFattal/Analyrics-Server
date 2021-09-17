import { tables } from "./types";

export const tablesNames: tables[] = [
  "songs",
  "artists",
  "artists_songs",
  "writers",
  "writers_songs",
  "groups_of_words",
  "words",
  "groups_words",
  "phrases",
];
export const tablesFieldsMapper: { [id in tables]: string[] } = {
  songs: ["SID", "song_name", "song_year", "genre_name"],
  artists: ["fullname"],
  artists_songs: ["SID", "artist_name"],
  groups_of_words: ["group_name"],
  groups_words: ["group_name", "WordID"],
  phrases: ["phrase"],
  words: ["WID", "text_data", "SID", "section", "section_row", "row_offset"],
  writers: ["fullname"],
  writers_songs: ["SID", "writer_name"],
};
