import ROUTES from "@/constansts/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagCard from "../cards/TagCard";

const hotQuestions = [
	{
		_id: 1,
		title:
			"Would it be appropriate to point out an error in another paper during a referee report?",
	},
	{ _id: 2, title: "How can an airconditioning machine exist?" },
	{ _id: 3, title: "Interrogated every time crossing UK Border as citizen" },
	{ _id: 4, title: "Low digit addition generator" },
	{
		_id: 5,
		title: "What is an example of 3 numbers that do not make up a vector?",
	},
];

const popularTags = [
	{ _id: "1", name: "react", questionCount: 100 },
	{ _id: "2", name: "angular", questionCount: 75 },
	{ _id: "3", name: "vue", questionCount: 120 },
	{ _id: "4", name: "svelte", questionCount: 50 },
	{ _id: "5", name: "ember", questionCount: 90 },
	{ _id: "6", name: "solid", questionCount: 60 },
];

const RightSideBar = () => {
	return (
		<section className="fixed right-0 top-0 pt-[108px] w-[330] max-xl:hidden h-screen pl-3 background-light900_dark200 light-border flex flex-col gap-2 border-l shadow-light-300">
			<div>
				<h3 className="h3-bold text-dark200_light900">Hot network</h3>
				<div className="mt-7 flex w-full flex-col gap-3">
					{hotQuestions.map(({ _id, title }) => {
						return (
							<div key={_id}>
								<Link href={ROUTES.PROFILE(_id)} className="flex">
									<p>{title}</p>
									<Image
										src={"/icons/chevron-right.svg"}
										width={20}
										height={20}
										alt="Chevron"
										className="invert-colors"
									/>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
			<div className="mt-5">
				<h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-3 flex flex-col gap-4">
          {popularTags.map(({_id, name, questionCount}) => (
            <TagCard key={_id} _id={_id} name={name} questionsCount={questionCount} showCount compact />
          ))}
        </div>
			</div>
		</section>
	);
};

export default RightSideBar;
