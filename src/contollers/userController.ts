import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Session } from "../entity/Session";

const userRepository = AppDataSource.manager.getRepository(User);
const sessionRepository = AppDataSource.manager.getRepository(Session);

class userController {
  public static signUp = async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, username, email, password, role } = req.body;

      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      const existingUser = await userRepository.findOne({
        where: [{ username }, { email }],
      });

      if (existingUser) {
        if (existingUser.username == username)
          return res
            .status(400)
            .json({ error: "Oops‼️‼️ username already exist" });
        if (existingUser.email == email)
          return res
            .status(400)
            .json({ error: "Oops‼️‼️ email already exist" });
      }

      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return res.status(400).json({
          error:
            "Password is not strong enough. It should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepository.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        role
      });
      await userRepository.save(newUser);
      res.status(201).send({ user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public static logIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and Password are required" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      const user = await userRepository.findOne({ where: [{ email }] });
      if (!user) {
        return res.status(404).json({ msg: "User not found ❌" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(403).json({ msg: "Incorrect Password ❌" });
      }
      const token = jwt.sign({ email: user.email , role: user.role}, process.env.JWT_SECRET, {
        expiresIn: "2 days",
      });
      return res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  //update user details
  public static updateUser = async (req: any, res: Response) => {
    try {
      const { firstname, lastname, username, password } = req.body;
      const id = req.user.id;
      const user = await userRepository.findOneBy({ id });
      if (!user) {
        return res.status(404).json({ msg: "User not found ❌" });
      }
      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (username) user.username = username;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      await userRepository.save(user);
      res.status(200).json({ "Updated user": user });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  //deletes user and if user have any sessions delete user sessions
  public static deleteUser = async (req: any, res: Response) => {
    try {
      const id = req.user.id;
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        return res.status(404).json({ msg: "User not found ❌" });
      }
      await sessionRepository.delete({ user: id });
      await userRepository.delete({ id });
      res.status(200).json({ msg: "Account deleted succesfully ✅" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  //get all users (admin)
  public static allUsers = async (req: Request, res: Response) => {
    try {
      const users = await userRepository.find();
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}

export default userController;
