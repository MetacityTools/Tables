import "reflect-metadata";
import { DataSource } from "typeorm";
import { Config } from "../config";
import { Model } from "./entities/model";
import { ModelMetadata } from "./entities/modelMetadata";
import { Project } from "./entities/project";
import { User } from "./entities/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Config.db.host,
  port: Config.db.port,
  username: Config.db.username,
  password: Config.db.password,
  database: Config.db.database,
  synchronize: true,
  logging: ["error"],
  entities: [Project, User, Model, ModelMetadata],
  subscribers: [],
  migrations: [],
});
