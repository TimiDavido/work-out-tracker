import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { Response, Request, NextFunction } from "express";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.manager.getRepository(User);

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Access denied. No token provided.");
    }
    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res
          .status(404)
          .json({ message: "Invalid or expired token, or some error occurred" });
      }
      const user = await userRepository.findOneBy({ email: decoded.email });
      if (!user) {
        return res.status(404).json({ msg: "User not found ❌" });
      }
  
      if(decoded.role !== 'admin'){
        res.status(401).json({msg : "Only admins can access this route"})
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  