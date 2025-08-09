"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./menubar";
import { TextAlign } from "@tiptap/extension-text-align";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextEditor = ({ field }: { field: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-64 p-4 focus:outline-none prose prose-sm dark:prose-invert",
        spellcheck: "false",
      },
    },

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: field.value ? JSON.parse(field.value) : "<p>Hello World!</p>",
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      {editor ? (
        <>
          <Menubar editor={editor} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <div className="text-sm p-4 text-red-300 flex items-center">
          <AlertCircleIcon className="size-4 mr-2" />
          Failed to load editor. Please contact&nbsp;
          <Link href="mailto:support@edukurve.com" className="underline">
            support
          </Link>
          .
        </div>
      )}
    </div>
  );
};

export default TextEditor;
