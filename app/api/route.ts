import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForBiddenError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await dbConnect();

		const users = await Account.find();
		return NextResponse.json({ success: true, data: users }, { status: 200 });
	} catch (error) {
		return handleError(error, "api") as APIErrorResponse;
	}
}

export async function POST(request: Request) {
	try {
		await dbConnect();
		const body = await request.json();

		const validateData = AccountSchema.parse(body);

		const existingAccount = await Account.findOne({
      provider: validateData.provider,
      providerAccountId: validateData.providerAccountId
    });
		if (existingAccount) throw new ForBiddenError("An account with the same provider already exists");

    const newAccount = await Account.create(validateData);
    return NextResponse.json({sucess: true, data: newAccount}, {status: 201});
	} catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

