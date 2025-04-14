import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constansts/routes";
import Link from "next/link";
import React from "react";

const Home = () => {
	return (
		<>
			<section className="flex flex-col-reverse  sm:flex-row justify-between w-full sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All questions</h1>
				<Button
					className="primary-gradient min-h-[46px] px-4 py-3 text-light-900"
					asChild
				>
					<Link href={ROUTES.QUESTION} >Ask a question</Link>
				</Button>
			</section>
      <section className="mt-11">
        <LocalSearch 
          route="/"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <div>
        <p>Question Card 1</p>
        <p>Question Card 2</p>
        <p>Question Card 3</p>
        <p>Question Card 4</p>
      </div>
		</>
	);
};

export default Home;
