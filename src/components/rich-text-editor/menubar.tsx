import React from "react";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UndoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MenubarProps {
  editor: Editor;
}

const Menubar = ({ editor }: MenubarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrike: ctx.editor.isActive("strike"),
      isHeading1: ctx.editor.isActive("heading", { level: 1 }),
      isHeading2: ctx.editor.isActive("heading", { level: 2 }),
      isHeading3: ctx.editor.isActive("heading", { level: 3 }),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isTextAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
      isTextAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
      isTextAlignRight: ctx.editor.isActive({ textAlign: "right" }),
    }),
  });

  const toolTipContent = [
    {
      icon: BoldIcon,
      label: "Bold",
      isActive: editorState.isBold,
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: ItalicIcon,
      label: "Italic",
      isActive: editorState.isItalic,
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: StrikethroughIcon,
      label: "Strike",
      isActive: editorState.isStrike,
      action: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: Heading1Icon,
      label: "Heading 1",
      isActive: editorState.isHeading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: Heading2Icon,
      label: "Heading 2",
      isActive: editorState.isHeading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: Heading3Icon,
      label: "Heading 3",
      isActive: editorState.isHeading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: ListIcon,
      label: "Bullet List",
      isActive: editorState.isBulletList,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: ListOrderedIcon,
      label: "Ordered List",
      isActive: editorState.isOrderedList,
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
  ];

  const textAlignContent = [
    {
      icon: AlignLeftIcon,
      label: "Align Left",
      isActive: editorState.isTextAlignLeft,
      action: () => editor.chain().focus().toggleTextAlign("left").run(),
    },
    {
      icon: AlignCenterIcon,
      label: "Align Center",
      isActive: editorState.isTextAlignCenter,
      action: () => editor.chain().focus().toggleTextAlign("center").run(),
    },
    {
      icon: AlignRightIcon,
      label: "Align Right",
      isActive: editorState.isTextAlignRight,
      action: () => editor.chain().focus().toggleTextAlign("right").run(),
    },
  ];

  return (
    <div className="border border-input rounded-t-lg p-2 bg-card flex flex-wrap gap-1 text-center border-t-0 border-x-0">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          {toolTipContent.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={item.isActive}
                  onPressedChange={() => item.action()}
                  className={cn(
                    item.isActive && "bg-muted text-muted-foreground"
                  )}
                >
                  <item.icon />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2 my-1" />

        <div className="flex flex-wrap gap-1">
          {textAlignContent.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={item.isActive}
                  onPressedChange={() => item.action()}
                  className={cn(
                    item.isActive && "bg-muted text-muted-foreground"
                  )}
                >
                  <item.icon />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2 my-1" />

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <UndoIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <RedoIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
