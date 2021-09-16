import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import mysqldump from "mysqldump";
import { query } from "./../utils/query";
import { asyncify } from "./../utils/asyncify";
import fs from "fs";
import xml2js from "xml2js";
import { xmlBuilder } from "./../utils/xmlBuilder";
import { xmlFetch } from "src/types";
const parser = new xml2js.Parser({ attrkey: "props" });

const getBackup = asyncify(async (req: Request, res: Response) => {
  await mysqldump({
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER || "",
      password: process.env.DB_PASS || "",
      database: process.env.DB_HOST || "",
    },
    dumpToFile: "./backup.sql",
  });
  res.download("./backup.sql");
});

const getXMLBackup = asyncify(async (req: Request, res: Response) => {
  let backup = "";
  const getArtistsSQL = xmlBuilder(["fullname"], "artists");
  const getArtistsSongsSQL = xmlBuilder(["SID", "artist_name"], "artists_songs");
  const getWritersSQL = xmlBuilder(["fullname"], "writers");
  const getGroupsSQL = xmlBuilder(["group_name"], "groups_of_words");
  const getGroupsWordsSQL = xmlBuilder(["group_name", "WordID"], "groups_words");
  const getPhrasesSQL = xmlBuilder(["phrase"], "phrases");
  const getSongsSQL = xmlBuilder(
    ["SID", "song_name", "song_year", "genre_name"],
    "songs"
  );
  const getWordsSQL = xmlBuilder(
    ["row_offset", "section_row", "section", "SID", "text_data", "WID"],
    "words"
  );
  const getWritersSongsSQL = xmlBuilder(["SID", "writer_name"], "writers_songs");
  const artistsResult = ((await query(getArtistsSQL))[1] as xmlFetch)[0].xml;
  const artistsSongsResult = ((await query(getArtistsSongsSQL))[1] as xmlFetch)[0].xml;
  const writersResult = ((await query(getWritersSQL))[1] as xmlFetch)[0].xml;
  const groupsResult = ((await query(getGroupsSQL))[1] as xmlFetch)[0].xml;
  const GroupsWordsResult = ((await query(getGroupsWordsSQL))[1] as xmlFetch)[0].xml;
  const phraseResult = ((await query(getPhrasesSQL))[1] as xmlFetch)[0].xml;
  const songResult = ((await query(getSongsSQL))[1] as xmlFetch)[0].xml;
  const wordsResult = ((await query(getWordsSQL))[1] as xmlFetch)[0].xml;
  const writersSongsResult = ((await query(getWritersSongsSQL))[1] as xmlFetch)[0].xml;
  backup =
    "<xml>" +
    artistsResult +
    writersResult +
    artistsSongsResult +
    groupsResult +
    GroupsWordsResult +
    phraseResult +
    songResult +
    wordsResult +
    writersSongsResult +
    "</xml>";
  await fs.writeFile("backup.xml", backup, async (err) => {
    if (err) throw err;
    // res.type("application/xml");
    let xml_string = await fs.readFileSync("backup.xml", "utf8");
    parser.parseString(xml_string, function (error: Error, result: any) {
      if (error === null) {
        // console.log(result.xml);
      } else {
        // console.log(error);
      }
    });
    res.download("backup.xml");
  });
  // res.status(200).json({ result: result[0].xml });
});

const loadFromFile = asyncify(async (req: Request, res: Response) => {
  if (req.file?.mimetype !== "application/x-sql") {
    res.status(400);
    throw Error("file format not supported");
  }
  const dropTablesSQL = `
  drop table if exists artists_songs;
  drop table if exists artists;
  drop table if exists writers_songs;
  drop table if exists writers;
  drop table if exists groups_words;
  drop table if exists groups_of_words;
  drop table if exists words;
  drop table if exists songs;
  drop table if exists genres;
  drop table if exists phrases;`;
  const fileSQLCommands = req.file?.buffer.toString() || "";
  await query(dropTablesSQL);
  const result = query(fileSQLCommands);
  res.status(200).json({ result });
});

export { getBackup, loadFromFile, getXMLBackup };
