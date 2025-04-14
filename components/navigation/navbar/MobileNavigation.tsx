import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ROUTES from "@/constansts/routes"
import NavLinks from "./NavLinks"

const MobileNavigation = () => {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            className="invert-colors"
            src={"/icons/hamburger.svg"}
            height={23}
            width={23}
            alt=""
          />
        </SheetTrigger>
        <SheetContent side="left" className="flex-col px-4 py-4">
          <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
          <SheetClose asChild>
            <Link href={"/"} className="flex items-center gap-1">
              <Image
                src={"/images/site-logo.svg"}
                width={23}
                height={23}
                alt="site-logo"
              />
              <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
                Dev<span className="text-primary-500">Flow</span>
              </p>
            </Link>

          </SheetClose>

          <div className="flex flex-col justify-between h-[calc(100vh-80px)] overflow-y-auto">
            <div className="h-full">
              <NavLinks isMobileNav />
            </div>
            <div className="flex flex-col gap-1.5">
              <Link href={ROUTES.SIGN_IN}>
                <Button className="w-full small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log in</span>
                </Button>
              </Link>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="w-full small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border px-4 py-3 shadow-none">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNavigation 
