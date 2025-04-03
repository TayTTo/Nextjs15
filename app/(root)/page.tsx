/* eslint-disable react/react-in-jsx-scope */
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import ROUTES from "@/constansts/routes"

const Home = async () => {
  const session = await auth()
  console.log(session)
  return (
    <div className="">
      <div className="h1-bold">Header by inter font</div>
      <h1 className="h1-bold font-inter">Header by inter font</h1>
      <h1 className="h1-bold font-space-grotesk">Header by gotesk font</h1>
      <form className="px-10 pt-[100]" action={async () => {
        "use server";
        await signOut({ redirectTo: ROUTES.SIGN_IN })
      }}>
        <Button type="submit">Log out</Button>
      </form>
    </div>
  )
}

export default Home
