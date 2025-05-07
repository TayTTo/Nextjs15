'use client'
import AuthForm from '@/components/forms/AuthForm'
import { signInWithCredentials } from '@/lib/action/auth.action'
import { signInSchema } from '@/lib/validation'

const SignIn = () => {
  return (
    <div>
      <AuthForm 
        formType="SIGN_IN"
        schema={signInSchema}
        defaultValues={{email: "", password: ""}}
        onSubmit={signInWithCredentials}
      />
    </div>
  )
}

export default SignIn
