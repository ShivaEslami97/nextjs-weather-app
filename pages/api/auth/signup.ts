import { hashPassword } from "@/lib/auth-services";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/customTypes";
import type { NextApiRequest, NextApiResponse } from "next";

interface MyApiRequest<T> extends NextApiRequest {
  body: T;
}

const handler = async (req: MyApiRequest<User>, res: NextApiResponse) => {
  if (req.method === "POST") {
    //a POST request
    try {
      const data = req.body;
      const { enteredEmail, enteredPassword } = data;

      if (
        !enteredEmail ||
        !enteredEmail.includes("@") ||
        !enteredPassword ||
        enteredPassword.trim().length < 5
      ) {
        res.status(422).json({
          message: "Invalid input (password should be at least 5 characters)",
        });
        return;
      }
      const client = await connectToDatabase();
      const db = client.db("users");
      const emailExisting = await db
        .collection("users")
        .findOne({ enteredEmail });

      if (emailExisting) {
        res.status(409).json({ message: "user already exists!" });

        return;
      }

      const hashedPassword = await hashPassword(enteredPassword);

      const usersCollection = db.collection("users");
      const result = await usersCollection.insertOne({
        enteredEmail,
        hashedPassword,
      });
      console.log(result);
      res.status(201).json({ message: "user is created!" });
      client.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return;
  }
};

export default handler;
