"use client";
import "@mdxeditor/editor/style.css";
import type { ForwardedRef } from "react";
import {
	headingsPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	markdownShortcutPlugin,
	MDXEditor,
	type MDXEditorMethods,
	type MDXEditorProps,
	toolbarPlugin,
	ChangeCodeMirrorLanguage,
	ConditionalContents,
	UndoRedo,
	Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";

interface Props {
	value: string;
	fieldChange: (value: string) => void;
	editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({
	value,
	editorRef,
	fieldChange,
	...props
}: Props & MDXEditorProps) => {
	return (
		<MDXEditor
			markdown={value}
			className="background-light800_dark200 light-border-2 markdown-editor w-full border dark-editor"
			onChange={fieldChange}
			plugins={[
				// Example Plugin Usage
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({defaultCodeBlockLanguage: ""}),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: "css",
            txt: "txt",
            sql: "sql",
            html: "html",
            saas: "saas",
            scss: "scss",
            bash: "bash",
            json: "json",
            js: "javascript",
            ts: "typescript",
            "": "unspecified",
            tsx: "TypeScript (React)",
            jsx: "JavaScript (React)",
          },
          autoLoadLanguageSupport: true,
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown:""}),
				toolbarPlugin({
					toolbarContents: () => {
						return (
							<ConditionalContents
								options={[
									{
										when: (editor) => editor?.editorType === "codeblock",
										contents: () => <ChangeCodeMirrorLanguage />,
									},
									{
										fallback() {
											return (
												<>
													<UndoRedo />
													<Separator />

                          <BoldItalicUnderlineToggles />
                          <Separator />

                          <ListsToggle />
                          <Separator />

                          <CreateLink />
                          <InsertImage />
                          <Separator />

                          <InsertTable />
                          <InsertThematicBreak />

                          <InsertCodeBlock />
												</>
											);
										},
									},
								]}
							/>
						);
					},
				}),
			]}
			{...props}
			ref={editorRef}
		/>
	);
};

export default Editor;
