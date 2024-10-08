import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Newsletter = {
  campaignTitle: string
  blurb: string
}

type EditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newsletter: Newsletter | null;
  onSave: (updatedNewsletter: Newsletter) => void;
};

export default function EditDialog({ open, onOpenChange, newsletter, onSave }: EditDialogProps) {
  const [editedTitle, setEditedTitle] = useState(newsletter?.campaignTitle || '')
  const [editedBlurb, setEditedBlurb] = useState(newsletter?.blurb || '')

  const handleSave = () => {
    if (newsletter) {
      onSave({ ...newsletter, campaignTitle: editedTitle, blurb: editedBlurb })
    }
    onOpenChange(false)
  }

  const handleDiscard = () => {
    onOpenChange(false)
    setEditedTitle(newsletter?.campaignTitle || '')
    setEditedBlurb(newsletter?.blurb || '')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[40vh] text-foreground">
        <DialogHeader>
          <DialogTitle>Edit Newsletter</DialogTitle>
          <DialogDescription>
            Modify the title and content of the newsletter.
          </DialogDescription>
        </DialogHeader>
        <div className=" py-2">
          <div className="">
            <Label htmlFor="title" className="text-right font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="py-2">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              id="content"
              value={editedBlurb}
              onChange={(e) => setEditedBlurb(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleDiscard}>
            Discard Changes
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}