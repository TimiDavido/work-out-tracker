import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
import { PORT } from "./config";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import sessionRoute from "./routes/sessionRouters";
import exerciseRoute from "./routes/exerciseRoute"
import workoutRoute from "./routes/workoutRoute"
import commentRoute from "./routes/commentRoute"
import reportRoute from "./routes/reportRoute"


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req: Request,res: Response) => {
  res.status(200).send("your app is runniny oh you mean my app, yeah")
})
app.use(userRoute);
app.use(sessionRoute)
app.use(exerciseRoute)
app.use(workoutRoute)
app.use(commentRoute)
app.use(reportRoute)

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database successfully ✅");

    app.listen(PORT, () => {
      console.log(`Now running on port ${PORT}`);
    });

    module.exports = { AppDataSource };
    
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to db");
  }
};
main();

