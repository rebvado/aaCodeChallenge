
import { createConnection, Repository } from "typeorm";
import { PreviousSearch } from "./entity/previousSearch";
import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'ap-southeast-2' });
const paramStore = new AWS.SSM()

export let repository: Repository<PreviousSearch> | undefined = undefined

const initDB = async () => {
  // DB pass stored in SSM parameter store
  let result = await paramStore.getParameter({ Name: 'rdsPassword' }).promise()
  const dbPass = result.Parameter?.Value
  createConnection({
    type: "postgres",
    host: "aacodechallenge.cqx27r0qevtb.ap-southeast-2.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: dbPass,
    database: "aacodechallenge",
    entities: [
      PreviousSearch
    ],
    synchronize: true,
    logging: false
  }).then(connection => {
    repository = connection.getRepository(PreviousSearch)
  }).catch(error => console.log(error));
}
initDB()