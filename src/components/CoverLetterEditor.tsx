import { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';

interface CoverLetterEditorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  coverLetter: string;
  jobTitle: string;
  company: string;
}

const CoverLetterEditor = ({
  isOpen,
  onOpenChange,
  coverLetter,
  jobTitle,
  company,
}: CoverLetterEditorProps) => {
  const [editedLetter, setEditedLetter] = useState(coverLetter);
  const [copied, setCopied] = useState(false);

  // Sync editedLetter when coverLetter prop changes
  if (coverLetter !== editedLetter && coverLetter && !editedLetter) {
    setEditedLetter(coverLetter);
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedLetter);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Cover letter copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <SheetTitle>Cover Letter Draft</SheetTitle>
          </div>
          <SheetDescription>
            AI-generated cover letter for {jobTitle} at {company}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <Textarea
            value={editedLetter}
            onChange={(e) => setEditedLetter(e.target.value)}
            placeholder="Your cover letter will appear here..."
            className="min-h-[400px] font-mono text-sm bg-secondary/50 resize-none"
          />

          <Button
            onClick={handleCopy}
            className="w-full btn-hunting"
            size="lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CoverLetterEditor;
