"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { ZodType, z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ROUTES from "@/constansts/routes"
import { useToast } from "@/hooks/use-toast"
import { ActionResponse } from "@/types/global"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface AuthFormProps<T extends FieldValues> {
  formType: "SIGN_IN" | "SIGN_UP"
  schema: ZodType<T>
  defaultValues: T
  onSubmit: (data: T) => Promise<ActionResponse>
}

const AuthForm = <T extends FieldValues>({
  formType,
  schema,
  defaultValues,
  onSubmit
}: AuthFormProps<T>) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      console.log("Redirecting...")
      router.push(ROUTES.HOME);
    }

    const buttonText = formType === "SIGN_IN" ? "Sign in" : "Sign up"
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2.5">
                  <FormLabel>
                    {field.name === "email"
                      ? "Email Address"
                      : field.name[0].toUpperCase() + field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={field.name}
                      {...field}
                      required
                      type={field.name === "password" ? "password" : "text"}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            disabled={form.formState.isSubmitting}
            className="primary-gradient paragraph-medium w-full rounded-2 px-2 py-3 min-h-12 font-inter text-light-900"
          >
            {form.formState.isSubmitting
              ? buttonText === "Sign in"
                ? "Signing in..."
                : "Signing up..."
              : buttonText}
          </Button>
          {formType === "SIGN_IN" ? (
            <p>
              Create account:{" "}
              <Link
                href={ROUTES.SIGN_UP}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have account:{" "}
              <Link
                href={ROUTES.SIGN_IN}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign in
              </Link>
            </p>
          )}
        </form>
      </Form>
    )
  }
}
export default AuthForm
