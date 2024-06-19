import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Workout } from "./entity/Workout"
import { Session } from "./entity/Session"
import { Exercise } from "./entity/Exercise"
import { Comment } from "./entity/Comment"
import { PASSOWRD } from "./config"
import { USERNAME } from "./config"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: USERNAME,
    password: PASSOWRD,
    database: "workout-tracker",
    synchronize: true,      
    logging: false,
    entities: [User, Workout, Session, Exercise, Comment],
    migrations: [],
    subscribers: [],
})



