import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { query } from "./../utils/query";
import { asyncify } from "./../utils/asyncify";
import fs from "fs";
import xml2js from "xml2js";
import { xmlBuilder } from "./../utils/xmlBuilder";
import { insertTuples, parsedXML, xmlFetch, tables } from "./../types";
import { QueryHelper } from "./../utils/QueryHelper";
import { tablesFieldsMapper } from "../constants";
import { tablesNames } from "./../constants";

const parser = new xml2js.Parser({ attrkey: "props" });

const getXMLBackup = asyncify(async (req: Request, res: Response) => {
  let backup = "<xml>";
  for (const [tableName, tableFields] of Object.entries(tablesFieldsMapper)) {
    let sql = xmlBuilder(tableFields, tableName);
    let queryResult = ((await query(sql))[1] as xmlFetch)[0].xml;
    backup += queryResult;
  }
  backup += "</xml>";

  await fs.writeFile("backup.xml", backup, async (err) => {
    if (err) throw err;
    res.download("backup.xml");
  });
});

const loadXML = asyncify(async (req: Request, res: Response) => {
  if (req.file?.mimetype !== "application/xml") {
    res.status(400);
    throw Error("file format not supported");
  }
  const xmlString = req.file?.buffer.toString() || "";
  let result: parsedXML = { xml: {} };
  parser.parseString(xmlString, function (error: Error, parsed: parsedXML) {
    if (error === null) {
      result = parsed;
    } else {
      throw Error("wrong xml format!");
    }
  });
  let tuples = xmlToTuples(result);
  await truncateTables();
  await insertDataToDB(tuples);
  res.status(200).json({ message: "data inserted" });
});

const insertDataToDB = async (tuples: insertTuples) => {
  for (const table of tablesNames) {
    await query(`insert into ${table} values ${tuples[table]}`);
  }
};

const xmlToTuples = (xml: parsedXML): insertTuples => {
  let res: insertTuples = {};
  const qHelper = new QueryHelper();
  const fields = tablesNames;
  fields.forEach((field) => {
    res[field] = qHelper.convertObjectListToTuples(
      xml.xml[field]?.map((element) => element.props) || []
    );
  });
  return res;
};

const truncateTables = async () => {
  let truncateTablesSQL = "SET FOREIGN_KEY_CHECKS = 0;";

  for (const tableName of tablesNames) {
    truncateTablesSQL += `TRUNCATE table ${tableName};`;
  }
  truncateTablesSQL += "SET FOREIGN_KEY_CHECKS = 1;";

  await query(truncateTablesSQL);
};

export { getXMLBackup, loadXML };
