"use client"
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import ROUTES from '@/constansts/routes'

const SocialAuthForm = () => {
  const buttonClass = "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3 flex-wrap  mt-1.5"
  const handleSignin = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      })
    } catch (error) {
      console.log(error)
      toast("Some error that I don't know", {
        description:
          error instanceof Error
            ? error.message
            : "Some weird error",
        action: "Undo"
      })
    }
  }
  return (
    <div className='flex mt-10 flex-wrap gap-2.5'>
      <Button className={buttonClass} onClick={() => handleSignin("github")}>
        <Image src={"/icons/github.svg"} alt='github logo' width={20} height={20} className='invert-colors mr-2.5 object-contain' />
        <span>Login with Github</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignin("google")}>
        <Image src={"/icons/google.svg"} alt='github logo' width={20} height={20} className='mr-2.5 object-contain' />
        <span>Login with Google</span>
      </Button>
    </div>
  )
}

export default SocialAuthForm
