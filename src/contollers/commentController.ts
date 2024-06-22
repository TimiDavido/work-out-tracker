import { Comment, CommentType } from "../entity/Comment";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { Workout } from "../entity/Workout";
import { Session } from "../entity/Session";

const commentRepository = AppDataSource.manager.getRepository(Comment);
const userRepository = AppDataSource.manager.getRepository(User);
const workoutRepository = AppDataSource.manager.getRepository(Workout);
const sessionRepository = AppDataSource.manager.getRepository(Session);

class commentController {
  public static createComment = async (req: any, res: Response) => {
    try {
      const { comment, type } = req.body;
      const userId = req.user.id;
      const entityId = req.params.id;
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ msg: "No user found" });
      }
      if (!Object.values(CommentType).includes(type as CommentType)) {
        return res
          .status(40)
          .json({
            message:
              "Invalid comment type, you can only comment on wither workout or session",
          });
      }
      if (type === CommentType.WORKOUT) {
        const workout = await workoutRepository.findOneBy({ id: entityId });
        if (!workout) {
          return res.status(404).json({ msg: "No workout found" });
        }
        const newComment = commentRepository.create({
          comment,
          user,
          workout,
          type,
        });
        commentRepository.save(newComment);
        res.status(201).json({ newComment });
      } else if (type === CommentType.SESSION) {
        const session = await sessionRepository.findOneBy({ id: entityId });
        if (!session) {
          return res.status(404).json({ msg: "No session found" });
        }
        const newComment = commentRepository.create({
          comment,
          user,
          session,
          type,
        });
        commentRepository.save(newComment);
        res.status(201).json({ newComment });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  public static deleteComment = async (req: any, res: Response) => {
    try {
      const id = req.params.id;
      const comment = await commentRepository.findOneBy({ id });
      if (!comment) {
        res.status(404).json({ msg: "Comment not found" });
      }
      await commentRepository.remove(comment);
      return res.status(200).json({ msg: "comment deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  public static updateComment = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { comment } = req.body;
      const foundComment = await commentRepository.findOneBy({ id });
      if (!foundComment) {
        return res.status(500).json({ msg: "commet doesn't exist" });
      }
      if (comment) foundComment.comment = comment;
      await commentRepository.save(foundComment);
      res.status(200).json(foundComment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}

export default commentController;
