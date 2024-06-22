import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Session } from "../entity/Session";
import { User } from "../entity/User";
import { Workout } from "../entity/Workout";

const userRepository = AppDataSource.manager.getRepository(User);
const sessionRepository = AppDataSource.manager.getRepository(Session);
const workoutRepository = AppDataSource.manager.getRepository(Workout)

class sessionController {
  public static createSession = async (req: any, res: Response) => {
    try {
      const userId = req.user.id;
      const { name, starttime, endtime } = req.body;
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ msg: "User not found ❌" });
      }
      if (!name || !starttime || !endtime)
        res.status(400).send("Name of session, starttime and endtime required");
      const newSession = sessionRepository.create({
        name,
        starttime,
        endtime,
        user
      });
      await sessionRepository.save(newSession);
      return res
        .status(201)
        .json({ msg: "session created", session: newSession });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error ❌" });
    }
  };

  //get all sessions created by a user
  public static getSession = async (req: any, res: Response) => {
    try {
      const id = req.user.id;
      const user = await userRepository.findOne({
        where: { id },
        relations: ["sessions"],
      });
      if (!user) {
        return res.status(404).json({ msg: "User not found ❌" });
      }
      res.status(200).json(user.sessions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  //update session created by a user
  public static updateSession = async (req: any, res: Response) => {
    try {
      const id = req.params.id;
      const { name, starttime, endtime } = req.body;
      if (!name || !starttime || !endtime) {
        return res
          .status(400)
          .json({ msg: "name or starttime or end time are required" });
      }
      const session = await sessionRepository.findOneBy({ id });
      if (!session) {
        return res
          .status(400)
          .json({ msg: "couln't update session because session wasn't found" });
      }

      if (name) session.name = name;
      if (starttime) session.starttime = starttime;
      if (endtime) session.endtime = endtime

      await sessionRepository.save(session);
      res.status(200).json({ msg: "Session updated successfully.", session });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  //delete session
  public static deleteSession = async (req: any, res: Response) => {
    try {
      const id = req.params.id;
      const session = await sessionRepository.findOneBy({ id });
      if (!session) {
        return res
          .status(404)
          .json({
            msg: "Could not delete session because session was not found.",
          });
      }
      await workoutRepository.remove(session.workouts)
      await sessionRepository.remove(session);
      res.status(200).json({ msg: "Session deleted successfully." });
    } catch (error) {
      console.log(error)
      res.status(500).json({error})
    }
  };
}
export default sessionController;
