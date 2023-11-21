import executeQuery from "./db.js";
import * as queries from "./queries.js";
const findAll = async () => {
    const result = await executeQuery.executeQuery(queries.findAll);
    console.log(`Found ${result.rows.length} results`);
    return result;
};
const findOne = async (id) => {
    const result = await executeQuery.executeQuery(queries.findOne, [id]);
    console.log(`Found ${id}`);
    return result;
};
export default { findAll, findOne };
