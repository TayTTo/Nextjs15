"use client";
import React from "react";
import { sideBarLinks } from "@/constansts";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
	const pathname = usePathname();
	return (
		<div className="flex flex-col gap-4">
			{sideBarLinks.map((item) => {
				const itemKey = sideBarLinks.indexOf(item);
				const isActive =
					(pathname.includes(item.route) && item.route.length > 1) ||
					pathname === item.route;
				const LinkComponent = (
					<Link
						key={itemKey}
						href={item.route}
						className={cn(
							isActive
								? "primary-gradient rounded-lg text-light-900"
								: "text-dark300_light900",
							"flex items-center justify-start gap-4 bg-transparent p-4",
						)}
					>
						<Image
							src={item.imgUrl}
							width={16}
							height={16}
							alt={item.label}
							className={cn({ "invert-colors": !isActive })}
						/>
						<p
							className={cn(
								isActive ? "base-bold" : "base-medium",
								!isMobileNav && "max-lg:hidden",
							)}
						>
							{item.label}
						</p>
					</Link>
				);

				return isMobileNav ? (
					<SheetClose asChild key={itemKey}>
						{LinkComponent}
					</SheetClose>
				) : (
					<React.Fragment key={itemKey}>{LinkComponent}</React.Fragment>
				);
			})}
		</div>
	);
};

export default NavLinks;
