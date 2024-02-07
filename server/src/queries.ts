export const insert = `
  INSERT INTO x_world (fieldID, X, Y, tid, vid,villageName, uid, player, aid, alliance, population, region, capital, city, harbor, victoryPoints)
  VALUES ($1, $2);`;

// export const update = `
//     UPDATE x_world
//     SET X = $2, Y= $3, tid= $4, vid= $5, villageName= $6, PlayerID= $7, Playername= $8, AllianceID= $9, Alliance= $10, Population= $11, Region= $12, Capital= $13, City= $14, Harbor= $15, VictoryPoints= $16
//     WHERE "fieldID" = $1;`;

export const findAll = `
  SELECT * FROM x_world;`;

export const findOne = `
  SELECT * FROM x_world
    WHERE "fieldID" = $1;`;

export const findPlayer = `
  SELECT *
    FROM tags
    LEFT OUTER JOIN x_world
    ON tags."fieldID" = x_world."fieldID"
    WHERE "Playername" = $1;`;

export const findAlliance = `
  SELECT DISTINCT "Playername","PlayerID" FROM x_world
    WHERE "Alliance" = $1;`;

export const getAllAlliances = `
  SELECT DISTINCT "Alliance", "AllianceID" FROM x_world
    WHERE "AllianceID" != 0
    ORDER BY "Alliance";`;

export const deleteById = `
  DELETE FROM x_world
    WHERE "fieldID" = $1;`;

//users
export const registerUser = `
  INSERT INTO users values ($1, $2);`;

export const getUser = `
  SELECT * FROM users
    WHERE "username" = $1;`;

export const updateUser = `
  UPDATE users
    SET passwordhash = $2
    WHERE "username" = $1`;

//tags
export const findTags = `
  SELECT * FROM tags
    WHERE "fieldID" = $1;`;

export const findAllTags = `
  SELECT *
    FROM tags
    LEFT OUTER JOIN x_world
    ON tags."fieldID" = x_world."fieldID"
    WHERE "target" IS true OR "off" IS true OR "def" IS true;`;

export const setNewTags = `
  INSERT INTO tags VALUES ($1, $2, $3, $4);`;

export const updateTag = `
  UPDATE tags
    SET off = $2, def = $3, target = $4
    WHERE "fieldID" = $1;`;

export const deleteTag = `
  DELETE FROM tags
    WHERE "fieldID" = $1;`;

export const getTargets = `
  SELECT *
    FROM tags
    LEFT OUTER JOIN x_world
    ON tags."fieldID" = x_world."fieldID"
    WHERE "target" IS true;`;

export const getOffs = `
  SELECT *
    FROM tags
    LEFT OUTER JOIN x_world
    ON tags."fieldID" = x_world."fieldID"
    WHERE "off" IS true;`;

export const getDefs = `
SELECT *
  FROM tags
  LEFT OUTER JOIN x_world
  ON tags."fieldID" = x_world."fieldID"
  WHERE "def" IS true;`;
