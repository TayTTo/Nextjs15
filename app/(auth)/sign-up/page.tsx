"use client"
import AuthForm from "@/components/forms/AuthForm"
import { signUpWithCredentials } from "@/lib/action/auth.action"
import { signUpSchema } from "@/lib/validation"

const signUp = () => {
  return (
    <div>
      <AuthForm
        formType="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{ email: "",  password: "", username: "" , name: ""}}
        onSubmit={signUpWithCredentials}
      />
    </div>
  )
}

export default signUp
