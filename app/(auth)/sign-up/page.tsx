"use client"
import AuthForm from "@/components/forms/AuthForm"
import { signUpSchema } from "@/lib/validation"

const signUp = () => {
  return (
    <div>
      <AuthForm
        formType="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{ email: "",  password: "", username: "" , name: ""}}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />
    </div>
  )
}

export default signUp
