import ROUTES from "@/constansts/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { getDeviconClassName } from "@/lib/utils";

interface tagProps {
	_id: string;
	name: string;
	questionsCount?: number;
	showCount?: boolean;
	compact?: boolean;
}

const TagCard = ({
	_id,
	name,
	questionsCount,
	showCount,
	compact,
}: tagProps) => {
	const iconClass = getDeviconClassName(name);
	return (
		<Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
			<Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
				<div className="flex-center space-x-2">
					<i className={`${iconClass} text-sm`} />
					<span>{name}</span>
				</div>
				{showCount && (
					<p className="small-medium text-dark500_light700">{questionsCount}</p>
				)}
			</Badge>
		</Link>
	);
};

export default TagCard;
