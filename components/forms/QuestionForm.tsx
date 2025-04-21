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

import { forwardRef, useRef } from "react";
import { type MDXEditorMethods, type MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import TagCard from "../cards/TagCard";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const handleCreateQuestion = () => { };
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: {value: string []}) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);
    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      })
    }
  }

  const editorRef = useRef<MDXEditorMethods>(null);
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
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
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
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field.value.map((tag: string) => <TagCard key={tag} _id={tag} name={tag} compact remove isButton handleRemove={() => handleTagRemove(tag, field)} />)}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit text-light-900"
          >
            Ask a question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
