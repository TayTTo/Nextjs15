import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constansts/routes";
import Link from "next/link";
import React from "react";

const questions = [
	{
		_id: "1",
		title: "How to learn React?",
		description: "I want to learn React, can anyone help me?",
		tags: [
			{
				_id: "1",
				name: "React",
			},
			{
				_id: "2",
				name: "Javascript",
			},
		],
		author: {
			_id: "1",
			name: "Duy Anh",
      image:"https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
		},
		upvotes: 10,
		answer: 5,
		views: 1000,
		createdAt: new Date(),
	},
	{
		_id: "2",
		title: "Best practices for Node.js error handling?",
		description:
			"What are some recommended ways to handle errors effectively in a Node.js application?",
		tags: [
			{
				_id: "3",
				name: "C++",
			},
			{
				_id: "4",
				name: "C",
			},
			{
				_id: "5",
				name: "Node",
			},
		],
		author: {
			_id: "2",
			name: "Linh Chi",
      image:"https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
		},
		upvotes: 10,
		answer: 5,
		views: 1000,
		createdAt: new Date(),
	},
];

interface SearchParams {
	searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
	const { query = "", filter = "" } = await searchParams;
	const filteredQuestions = questions.filter((question) => {
		const matchedQuery = question.title
			.toLowerCase()
			.includes(query.toLowerCase());
		const matchedFilter = question.tags[0].name
			.toLowerCase()
			.includes(filter.toLowerCase());
		return matchedQuery && matchedFilter;
	});
	console.log(filteredQuestions);
	return (
		<>
			<section className="flex flex-col-reverse sm:flex-row justify-between w-full sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All questions</h1>
				<Button
					className="primary-gradient min-h-[46px] px-4 py-3 text-light-900"
					asChild
				>
					<Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
				</Button>
			</section>
			<section className="mt-11">
				<LocalSearch
					route="/"
					placeholder="Search questions..."
					otherClasses="flex-1"
				/>
				<HomeFilter />
			</section>
			<div className="mt-10 flex flex-col">
				{filteredQuestions.map((question) => {
					return <QuestionCard key={question._id} question={question} />;
				})}
			</div>
		</>
	);
};

export default Home;
