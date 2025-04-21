"use client";
import { AskQuestionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { forwardRef, useRef } from "react"
import { type MDXEditorMethods, type MDXEditorProps} from '@mdxeditor/editor'
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/editor'), {
  // Make sure we turn SSR off
  ssr: false
})

const QuestionForm = () => {
	const form = useForm({
		resolver: zodResolver(AskQuestionSchema),
		defaultValues: {
			title: "",
			content: "",
			tags: [],
		},
	});
	const handleCreateQuestion = () => {};
  const editorRef = useRef<MDXEditorMethods>(null)
	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-10"
				onSubmit={form.handleSubmit(handleCreateQuestion)}
			>
				<FormField
					name="title"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col ">
							<FormLabel>
								<p className="paragraph-semibold text-dark400_light800">
									Question Title <span className="text-primary-500">*</span>
								</p>
							</FormLabel>
							<FormControl>
								<Input className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border" />
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Be specific and imagine you're asking2 a question to another
								person.
							</FormDescription>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="content"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col ">
							<FormLabel>
								<p className="paragraph-semibold text-dark400_light800">
									Detailed explaination of your problem{" "}
									<span className="text-primary-500">*</span>
								</p>
							</FormLabel>
							<FormControl>
                <Editor value={field.value} editorRef={editorRef} fieldChange={field.onChange}/>
              </FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Introduce the problem and expand on what you've put in the
								title.
							</FormDescription>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="tags"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col ">
							<FormLabel>
								<p className="paragraph-semibold text-dark400_light800">
									Tags<span className="text-primary-500">*</span>
								</p>
							</FormLabel>
							<FormControl>
								<div>
									<Input
										className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
										placeholder="Add tags..."
									/>
									Tags
								</div>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
							</FormDescription>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
        <div className="mt-16 flex justify-end">
          <Button type="submit" className="primary-gradient w-fit text-light-900">
            Ask a question
          </Button>
        </div>
			</form>
		</Form>
	);
};

export default QuestionForm;
