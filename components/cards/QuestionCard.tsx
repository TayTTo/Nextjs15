import ROUTES from "@/constansts/routes";
import Link from "next/link";
import TagCard from "./TagCard";
import Metric from "../Metric";
import { getTimeStamp } from "@/lib/utils";

interface Props {
	question: Question;
}
const QuestionCard = ({
	question: { _id, title, tags, author, createdAt, upvotes, answer, views },
}: Props) => {
	return (
		<div className="card-wrapper rounded-[10] p-9 sm:px-11">
			<div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-5">
				<div>
					<div>
						<span className="subtle-regular text-dark200_light900 line-clamp-1 flex-1">
							{createdAt.toString()}
						</span>
						<Link href={ROUTES.QUESTION(_id)}>
							<h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
								{title}
							</h3>
						</Link>
					</div>
				</div>
			</div>
			<div className="mt-3.5 flex w-full flex-wrap gap-2">
				{tags.map((tag: Tag) => (
					<TagCard key={tag._id} name={tag.name} _id={tag._id} compact />
				))}
			</div>
			<div className="flex-between mt-6 w-full flex-wrap gap-3">
				<Metric
					imgUrl={author.image}
					alt={author.name}
					value={author.name}
					title={`asked ${getTimeStamp(createdAt)}`}
					href={ROUTES.QUESTION(author._id)}
					textStyles="body-medium text-dark400_light700"
					isAuthor
				/>

				<div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
					<Metric
						imgUrl="/icons/like.svg"
						alt="like"
						value={author.name}
						title=" votes "
						textStyles="small-medium text-dark400_light800"
					/>
					<Metric
						imgUrl="/icons/message.svg"
						alt="answers"
						value={answer}
						title="Answers"
						textStyles="small-medium text-dark400_light800"
					/>
          <Metric
            imgUrl="/icons/eye.svg"
            alt="views"
            value={views}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
