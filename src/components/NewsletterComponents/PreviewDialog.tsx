import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import "../NewsletterComponents/MDXComponent.css";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface PreviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    content: string;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ open, onOpenChange, content }) => {
    const rawHTMLContent = DOMPurify.sanitize(marked(content));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>  
            <DialogContent className="text-foreground max-w-[80vw] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-bold font-bold text-5xl">Preview</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="prose bg-accent rounded-lg ">
                        {/* Render raw HTML without wrapping in pre/code tags */}
                        <div className="p-4" dangerouslySetInnerHTML={{ __html: rawHTMLContent }} />
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default PreviewDialog;
