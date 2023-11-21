export const insert = `
  INSERT INTO x_world (fieldID, X, Y, tid, vid,villageName, uid, player, aid, alliance, population, region, capital, city, harbor, victoryPoints)
  VALUES ($1, $2);
  `;

export const update = `
    UPDATE x_world
    SET X = $2, Y= $3, tid= $4, vid= $5, villageName= $6, uid= $7, player= $8, aid= $9, alliance= $10, population= $11, region= $12, capital= $13, city= $14, harbor= $15, victoryPoints= $16
    WHERE fieldID = $1;`;

export const findAll = `SELECT * FROM x_world;`;

export const findOne = `
  SELECT * FROM x_world
    WHERE "fieldID" = $1;`;

export const findPlayer = `
  SELECT * FROM x_world
    WHERE "Playername" = $1;`;

export const findAlliance = `
  SELECT DISTINCT "Playername","PlayerID" FROM x_world
    WHERE "Alliance" = $1`;

export const getAllAlliances = `
  SELECT DISTINCT "Alliance", "AllianceID" FROM x_world
    WHERE "AllianceID" != 0
    ORDER BY "Alliance";
`;

export const deleteById = `
  DELETE FROM x_world
    WHERE "fieldID" = $1;`;

