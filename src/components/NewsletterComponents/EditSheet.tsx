import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Newsletter } from './Columns';

type EditSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newsletter: Newsletter | null;
  onSave: (updatedNewsletter: Newsletter) => void;
};

const EditSheet: React.FC<EditSheetProps> = ({ open, onOpenChange, newsletter, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(newsletter?.title || '');
  const [editedContent, setEditedContent] = useState(newsletter?.content || '');

  const handleSave = () => {
    if (newsletter) {
      onSave({ ...newsletter, title: editedTitle, content: editedContent });
    }
    onOpenChange(false);
  };

  const handleDiscard = () => {
    onOpenChange(false);
    setEditedTitle(newsletter?.title || '');
    setEditedContent(newsletter?.content || '');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[50%]">
        <SheetHeader>
          <SheetTitle className="font-normal">Edit Newsletter</SheetTitle>
          <SheetDescription>
            Modify the title and content of the newsletter.
          </SheetDescription>
        </SheetHeader>
        <div className="py-2 text-foreground">Title :</div>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
            className="p-2 border rounded"
          />
          <div className="pt-2 text-foreground">Content :</div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Content"
            className="p-2 border rounded"
            rows={20}
          />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="destructive" onClick={handleDiscard}>
            Discard Changes
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditSheet;
