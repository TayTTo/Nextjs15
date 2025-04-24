import tickets from "@/app/database";
import { NextResponse } from "next/server";

export async function GET() {
	const prettyJson = JSON.stringify(tickets, null, 2); // Indent with 2 spaces
	return new NextResponse(prettyJson, {
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export async function POST(request: Request) {
  const {name, status, type } = await request.json();

  const newTicket = {
    id: tickets.length + 1,
    name,
    status,
    type,
  };
  tickets.push(newTicket);
  return NextResponse.json(newTicket)
}
