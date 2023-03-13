import { Password, User } from "@/models/customTypes";
import { compare, hash } from "bcrypt";

export const hashPassword = async (password: string) => {
  const hashedPassword = hash(password, 10);
  return hashedPassword;
};

export const checkPassword = async ({
  enteredPassword,
  userPassword,
}: Password) => {
  const passowrdIsValid = await compare(enteredPassword, userPassword);
  return passowrdIsValid;
};
