import { valueAndID, word } from "src/types";
import { v4 as uuidv4 } from "uuid";

export class QueryHelper {
  constructor() {}

  convertWordsToTuples(words: word[], SID: string): string {
    let tuples = "";
    words.forEach((word, index) => {
      let wordId = uuidv4();
      tuples += `("${wordId}","${word.text_data}","${SID}",${word.section},${word.section_row},${word.row_offset})`;
      if (index < words.length - 1) {
        tuples += ",";
      }
    });
    return tuples;
  }

  convertSongDataToTuple(
    SID: string,
    name: string,
    year: number,
    genreID: string
  ): string {
    return `("${SID}","${name}",${year},"${genreID}")`;
  }
  convertWritersOrArtistsDataToTuples(arr: valueAndID[]): string {
    let tuples = "";
    arr.forEach((element, index) => {
      tuples += `("${element.id}","${element.value}")`;
      if (index < arr.length - 1) {
        tuples += ",";
      }
    });
    return tuples;
  }

  getRelationTuple(SID: string, arr: valueAndID[]) {
    let tuples = "";
    arr.forEach((element, index) => {
      tuples += `("${SID}","${element.id}")`;
      if (index < arr.length - 1) {
        tuples += ",";
      }
    });
    return tuples;
  }
  generateIdToArray = (arr: string[]): valueAndID[] => {
    let IDarray: valueAndID[] = [];
    arr.forEach((value) => {
      IDarray.push({ id: uuidv4(), value });
    });
    return IDarray;
  };
}
