import db from "../utils/connection";

export const query = (sql: string): Promise<{}[]> => {
  return new Promise((resolve, reject) => {
    db.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};
