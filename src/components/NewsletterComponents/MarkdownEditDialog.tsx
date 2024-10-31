import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "../NewsletterComponents/MDXComponent.css";
import MDXComponent from "./MDXComponent";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface MarkdownEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  onEdit: Dispatch<SetStateAction<string>>;
  onSave: () => void;
}

const MarkdownEditDialog: React.FC<MarkdownEditDialogProps> = ({
  open,
  onOpenChange,
  content,
  onEdit,
  onSave,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-foreground max-w-[80vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-bold font-bold text-5xl">
            Preview
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="prose bg-accent rounded-lg ">
            <MDXComponent content={content} setContent={onEdit} />
          </div>
        </DialogDescription>
        <div className="flex space-x-2 justify-end">
          <Button onClick={() => onOpenChange(false)} variant={"outline"}>
            Close
          </Button>
          <Button
            onClick={() => {
              onSave();
              onOpenChange(false);
            }}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkdownEditDialog;
