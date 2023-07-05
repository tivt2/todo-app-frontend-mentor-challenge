import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  console.count("Trying to auth token");
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    console.log("token not found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    console.log("reading token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as {
      userId: string;
    };
    req.body.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("token problem");
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { authToken };
