import fs from "fs";
import pg from "pg";

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = process.env;

const pool = new pg.Pool({
  host: PG_HOST,
  port: Number(PG_PORT),
  user: PG_USERNAME,
  password: String(PG_PASSWORD),
  database: PG_DATABASE,
});

//fills the main x_world table with data from map.sql
const readMap = () => {
  const fullFile = fs.readFileSync("./map.sql", "utf8");
  const convertedFile = fullFile.replaceAll("`", "");
  const allLines = convertedFile.split(/\r\n|\n/);

  allLines.forEach((line) => {
    executeQuery(line);
  });
};

//creates Tables
const createTables = () => {
  const createMapTable = `
  CREATE x_world (
    fieldID integer, 
    X smallint, 
    Y smallint, 
    tid smallint, 
    vid integer,
    villagename varchar(255), 
    PlayerID integer, 
    playername varchar(255), 
    AllianceID integer,
    Alliance varchar(255), 
    Population integer, 
    Region varchar(255), 
    Capital boolean, 
    City boolean, 
    Harbor boolean, 
    VictoryPoints integer
  );`;

  const createUserTable = `
  CREATE users (
    username varchar(255),
    passwordhash varchar(255)
  );`;

  const createTagsTable = `
  CREATE tags (
    fieldID integer,
    off boolean,
    def boolean,
    target boolean
  );`;

  executeQuery(createMapTable);
  executeQuery(createUserTable);
  executeQuery(createTagsTable);
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

export default { readMap, executeQuery, createTables };
