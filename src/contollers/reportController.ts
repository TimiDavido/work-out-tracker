import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Session } from "../entity/Session";

const sessionRepository = AppDataSource.manager.getRepository(Session);
class reportController {
  public static getReport = async (req: Request, res: Response) => {
    try {
      const sessionId = Number(req.params.id);
      const session = await sessionRepository.findOne({
        where: { id: sessionId },
        relations: ["workouts"],
      });

      if (!session) {
        return res.status(404).json({ msg: "Session not found ❌" });
      }

      const totalWorkouts = session.workouts.length;
      const completedWorkouts = session.workouts.filter(
        (workout) => workout.status === "completed"
      ).length;

      if (totalWorkouts === 0) {
        return res
          .status(200)
          .json({ percentage: 0, msg: "No workouts available" });
      }

      const completionPercentage = (completedWorkouts / totalWorkouts) * 100;
      res.status(200).json({ percentage: completionPercentage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}
export default reportController;
