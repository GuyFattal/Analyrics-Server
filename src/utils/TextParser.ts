import { type } from "os";
import { stringify } from "querystring";
import { word } from "src/types";

type song = {
  song_name: string;
  song_year: number;
  song_lyrics: string;
  genre: string;
  sid: string;
  artist: { aid: string; first_name: string; last_name: string };
};

const SONG_NAME = "Song_name";
const SONG_NAME_ROW = 0;
const ARTISTS = "Artists";
const ARTISTS_ROW = 1;
const WRITERS = "Writers";
const WRITERS_ROW = 2;
const GENRE = "Genre";
const Genre_ROW = 3;
const YEAR = "Year";
const YEAR_ROW = 4;
const LYRICS = "Lyrics";
const LYRICS_ROW = 6;

export class TextParser {
  text: string[];
  songName = "";
  artists: string[] = [];
  writers: string[] = [];
  songYear = 0;
  songGenre = "";
  lyrics: string[] = [];
  words: word[] = [];
  wrongType = false;

  constructor(text: string[]) {
    this.text = text;
  }

  parseTxt() {
    this.setSongName();
    this.setArtits();
    this.setWriters();
    this.setGenre();
    this.setYear();
    this.setLyrics();
    this.setWords();
  }

  private setSongName() {
    const [field, value] = this.text[SONG_NAME_ROW].split(":");
    if (field !== SONG_NAME) {
      this.wrongType = true;
    } else {
      this.songName = this.trimFirstLetter(value);
    }
  }

  private setArtits() {
    const [field, value] = this.text[ARTISTS_ROW].split(":");
    if (field !== ARTISTS) {
      this.wrongType = true;
    } else {
      value
        .split(",")
        .forEach((artist) => this.artists.push(this.trimFirstLetter(artist)));
    }
  }
  private setWriters() {
    const [field, value] = this.text[WRITERS_ROW].split(":");
    if (field !== WRITERS) {
      this.wrongType = true;
    } else {
      value
        .split(",")
        .forEach((writer) => this.writers.push(this.trimFirstLetter(writer)));
    }
  }

  private setGenre() {
    const [field, value] = this.text[Genre_ROW].split(":");
    if (field !== GENRE) {
      this.wrongType = true;
    } else {
      this.songGenre = this.trimFirstLetter(value);
    }
  }

  private setYear() {
    const [field, value] = this.text[YEAR_ROW].split(":");
    if (field !== YEAR) {
      this.wrongType = true;
    } else {
      this.songYear = parseInt(this.trimFirstLetter(value));
    }
  }

  private setLyrics() {
    const [field, _] = this.text[LYRICS_ROW].split(":");
    if (field !== LYRICS) {
      this.wrongType = true;
    } else {
      const lyrics: string[] = this.text.filter(
        (_, index) => index > LYRICS_ROW
      );
      this.lyrics = lyrics;
    }
  }

  private setWords() {
    let section = 0,
      section_row = 0,
      row_offset = 0;
    this.lyrics.forEach((line, lineIndex) => {
      if (line === "") {
        section++;
        section_row = 0;
        row_offset = 0;
      } else {
        line.split(" ").forEach((text_data, row_offset) => {
          this.words.push({
            text_data: this.trimComma(text_data).toLowerCase(),
            section,
            section_row,
            row_offset,
          });
        });
        section_row++;
      }
    });
  }

  private trimFirstLetter(value: string): string {
    if (value[0] === " ") {
      return value.slice(1);
    }
    return value;
  }

  private trimComma(value: string): string {
    if (value.charAt(value.length - 1) === ",") {
      return value.slice(0, value.length - 1);
    }
    return value;
  }
}
