import fs, { read } from "fs";
import pg from "pg";


const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = process.env;

const pool = new pg.Pool({
  host: PG_HOST,
  port: Number(PG_PORT),
  user: PG_USERNAME,
  password: String(PG_PASSWORD),
  database: PG_DATABASE,
});


const readMap = () => {

  const fullFile = fs.readFileSync("./map.sql","utf8");
  const convertedFile = fullFile.replaceAll("`", "");
  const allLines = convertedFile.split(/\r\n|\n/);

  allLines.forEach((line) => {executeQuery(line);})

};

const executeQuery = async (query: string, parameters?: Array<any>) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, parameters);
    return result;
  } catch (error: any) {
    console.error(error.stack);
    error.name = "dbError";
    throw error;
  } finally {
    client.release();
  }
};

export default { readMap, executeQuery };