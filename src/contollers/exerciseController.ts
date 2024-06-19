import { Exercise } from "../entity/Exercise";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

const exerciseRepository = AppDataSource.manager.getRepository(Exercise);

class excerciseController {
  public static createExercise = async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      if (!name) {
        res.status(500).json({ msg: "Name and description are required" });
      }
      const newExercise = exerciseRepository.create({
        name,
        description,
      });
      await exerciseRepository.save(newExercise);
      res.status(201).json({ exercise: newExercise });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  public static updateExercise = async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const id = Number(req.params.id);
      const exercise = await exerciseRepository.findOneBy({ id });
      if (!exercise) {
        res.status(404).json({ msg: "Exercise not found" });
      }

      if (name) exercise.name = name;
      if (description) exercise.description= description;

      await exerciseRepository.save(exercise);
      res.status(200).json({ msg: "Exercise updated successfully.", exercise });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  public static deleteExercise = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const exercise = await exerciseRepository.findOneBy({ id });
      if (!exercise) {
        res.status(404).json({ msg: "Exercise not found" });
      }
      await exerciseRepository.delete({ id });
      res.status(200).json({ msg: "Exercise deleted successfully" });
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  };

  public static getAllExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await exerciseRepository.find()
        res.status(200).json({exercises : exercise})
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    }
  }
}

export default excerciseController;
