import mongoose from "mongoose";
import dbConnect from "@/lib/mongoose";
import handleError from "@/lib/handlers/error";
import { SignInWithOAuthSchema } from "@/lib/validation";
import { ValidationError } from "@/lib/http-errors";
import slugify from "slugify";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import { NextResponse } from "next/server";
import { APIErrorResponse } from "@/types/global";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();
  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();
  console.log("startTransaction");

  try {
    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });
    console.log("Check route....");
    console.log(validatedData);
    console.log(user);
    console.log("==========");

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const { name, username, email, image } = user;
    console.log("Name: ",name)
    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });
    console.log("Slugified name: ", slugifiedUsername)
    console.log("email: ", email)
    let existingUser = await User.findOne({ email }).session(session);
    const testabit = await User.findOne({ email }).session(session);
    console.log("existingUser: ", testabit);
    if (!existingUser) {
      [existingUser] = await User.create(
        [{ name, username: slugifiedUsername, email, image }],
        { session },
      );
      console.log("Creating user")
    } else {
      console.log("modify user's info: ")
      const updatedData: { name?: string; image?: string } = {};

      if (existingUser.name !== name) updatedData.name = name;
      if (existingUser.image !== image) updatedData.image = image;

      if (Object.keys(updatedData).length > 0) {
        await User.updateOne(
          { _id: existingUser._id },
          { $set: updatedData },
        ).session(session);
      }
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);
    console.log("UderIdabcd: ", existingAccount);
    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session },
      );
    }
    console.log("Go here so what is fucking happen");
    await session.commitTransaction();

    console.log("Go here so what is fucking happen again");
    await session.commitTransaction();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return handleError(error, "api") as APIErrorResponse;
  } finally {
    session.endSession();
  }
}
