import * as React from "react";
import { FileText, ShieldCheck, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PrescriptionModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-[15px] font-semibold text-ink">
            Upload Prescription
          </DialogTitle>
          <DialogDescription className="text-[12px] text-ink-soft">
            Our pharmacist will verify it and call you back within 10 minutes.
          </DialogDescription>
        </DialogHeader>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-page px-4 py-7 transition-colors hover:border-brand"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft">
            <Upload className="h-4 w-4 text-brand" />
          </span>
          <span className="text-[13px] font-medium text-ink">Choose files to upload</span>
          <span className="text-[11px] text-ink-soft">JPG, PNG or PDF · up to 5 MB each</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
        />

        {files.length > 0 && (
          <ul className="space-y-1.5">
            {files.map((f) => (
              <li
                key={f.name}
                className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-[12px] text-ink"
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-brand" />
                <span className="min-w-0 flex-1 truncate">{f.name}</span>
                <button
                  aria-label={`Remove ${f.name}`}
                  onClick={() => setFiles((prev) => prev.filter((p) => p.name !== f.name))}
                  className="text-ink-soft hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="flex items-center gap-1.5 text-[11px] text-ink-soft">
          <ShieldCheck className="h-3.5 w-3.5 text-chart-2" /> Your prescription stays private and
          encrypted.
        </p>

        <button
          disabled={files.length === 0}
          onClick={() => {
            setFiles([]);
            onOpenChange(false);
          }}
          className="w-full rounded-lg gradient-brand px-4 py-2.5 text-[13px] font-medium text-brand-foreground shadow-pill disabled:opacity-50"
        >
          Submit Prescription
        </button>
      </DialogContent>
    </Dialog>
  );
}
