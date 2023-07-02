import jwt, { Secret } from "jsonwebtoken";

const genToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
    expiresIn: "1h",
  });
  console.log("token generated");
  return token;
};

export { genToken };
