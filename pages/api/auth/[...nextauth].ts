import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import { connectToDatabase } from "@/lib/db";
import { checkPassword } from "@/lib/auth-services";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

type Credentials = {
  enteredEmail: string;
  enteredPassword: string;
};

const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { enteredEmail, enteredPassword } = credentials as Credentials;
        const client = await connectToDatabase();
        const db = client.db("users");
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({
          enteredEmail: enteredEmail,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const userPassword: string = user.hashedPassword;
        const userEmail: string = user.enteredEmail;
        const id: string = user._id.toString();

        const passwordIsCorrect = await checkPassword({
          enteredPassword,
          userPassword,
        });

        if (!passwordIsCorrect) {
          throw new Error("Password doesnt match");
        }
        client.close();
        return { id: id, email: userEmail };
      },
    }),
  ],
};
export default NextAuth(authOptions);
