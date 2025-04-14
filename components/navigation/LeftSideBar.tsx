import React from "react";
import NavLinks from "./navbar/NavLinks";
import Link from "next/link";
import ROUTES from "@/constansts/routes";
import { Button } from "../ui/button";
import Image from "next/image";

const LeftSideBar = () => {
	return (
		<div className="w-[266px] max-lg:w-fit max-lg:items-center  border absolute top-0 left-0 pt-[108px] h-screen background-light900_dark200 light-border shadow-light-300 dark:shadow-none max-sm:hidden flex flex-col justify-between px-1 pb-2">
			<NavLinks />
			<div className="flex flex-col gap-1.5">
				<Button className="w-full small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border py-3 shadow-none ">
					<Link href={ROUTES.SIGN_IN}>
						<Image
							src={"/icons/account.svg"}
							alt="Account"
							width={20}
							height={20}
							className="invert-colors min-lg:hidden"
						/>
						<span className="primary-text-gradient max-lg:hidden">Log in</span>
					</Link>
				</Button>
        <Button className="w-full small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border py-3 shadow-none ">
					<Link href={ROUTES.SIGN_UP}>
						<Image
							src={"/icons/sign-up.svg"}
							alt="Signup"
							width={20}
							height={20}
							className="invert-colors min-lg:hidden"
						/>
						<span className="max-lg:hidden">Sign in</span>
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default LeftSideBar;
