'use client'
import AuthForm from '@/components/forms/AuthForm'
import { signInSchema } from '@/lib/validation'

const SignIn = () => {
  return (
    <div>
      <AuthForm 
        formType="SIGN_IN"
        schema={signInSchema}
        defaultValues={{email: "", password: ""}}
        onSubmit={(data) => Promise.resolve({success: true, data})}
      />
    </div>
  )
}

export default SignIn
