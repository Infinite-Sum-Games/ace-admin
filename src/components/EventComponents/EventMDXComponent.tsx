import { EventmarkdownState } from "@/atoms/EventMarkDown";
import { useMarkdownStore } from "@/stores/EventMarkdownStore";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
//   imagePlugin,
//   InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import { Separator } from "@radix-ui/react-separator";
import { useRecoilState } from "recoil";
import "./EventMDXComponent.css"

function MDXComponent() {
 

  const content = useMarkdownStore((state) => state.markdown);
const setContent = useMarkdownStore((state) => state.setMarkdown);

  return (
    <div>
      <MDXEditor
        className="dark dark-editor"
        markdown={content}
        onChange={setContent}
        contentEditableClassName="prose dark:prose-dark"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          listsPlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),

          tablePlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {" "}
                <UndoRedo />
                <Separator orientation="vertical" />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <Separator orientation="vertical" />
                <ListsToggle />
                <Separator orientation="vertical" />
                <CreateLink />

                <InsertTable />
                <InsertThematicBreak />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}

export default MDXComponent;
