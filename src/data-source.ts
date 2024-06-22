import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Workout } from "./entity/Workout"
import { Session } from "./entity/Session"
import { Exercise } from "./entity/Exercise"
import { Comment } from "./entity/Comment"
import { PASSOWRD, USERNAME, HOST, DB_PORT, DATABASE, SYNCHRONIZE, LOGGING } from "./config"



export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST,
    port: Number(DB_PORT),
    username: USERNAME,
    password: PASSOWRD,
    database: DATABASE,
    synchronize: Boolean(SYNCHRONIZE),      
    logging: Boolean(LOGGING),
    entities: [User, Workout, Session, Exercise, Comment],
    migrations: [],
    subscribers: [],
})



