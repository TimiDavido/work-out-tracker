import { Workout } from "../entity/Workout";
import { Session } from "../entity/Session";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";

const workoutRepository = AppDataSource.manager.getRepository(Workout);
const sessionRepository = AppDataSource.getRepository(Session);
const commentRepository = AppDataSource.getRepository(Comment);

class workoutController {
  //create workout for a session with session ID
  public static createWorkout = async (req: Request, res: Response) => {
    try {
      const { reps, sets, status, exercises, size } = req.body;
      const sessionId = Number(req.params.id);
      const session = await sessionRepository.findOneBy({ id: sessionId });
      if (!reps || !sets || !exercises) {
        return res
          .status(400)
          .json({ mgs: "Reps, sets and exercise are required" });
      }
      if (!session) {
        return res.status(404).json({ msg: "Session not found" });
      }

      const newWorkout = workoutRepository.create({
        reps,
        sets,
        status,
        exercises,
        size,
        session,
      });
      await workoutRepository.save(newWorkout);
      res.status(200).json({ msg: newWorkout });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  //get all workout for a session
  public static allWorkout = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const session = await sessionRepository.findOne({
        where: { id },
        relations: ["workouts", "workouts.exercises"],
      });
      if (!session) {
        return res.status(404).json({ msg: "Session not found ❌" });
      }
      res.status(200).json(session.workouts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  public static deleteWorkout = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const workout = await workoutRepository.findOneBy({ id });
      if (!workout) {
        res.status(404).json({ msg: "Workout not found" });
      }
      await commentRepository.delete({ workout: { id } });
      await workoutRepository.delete(workout);
      res.status(200).json("Workout deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}
export default workoutController;
