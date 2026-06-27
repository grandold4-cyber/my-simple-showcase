import { useRef, useState } from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
  resourceType?: "image" | "video" | "auto";
};

export function CloudinaryUpload({
  value, onChange, folder, accept = "image/*", label = "Upload image", resourceType,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(file: File) {
    setError(null);
    setBusy(true);
    try {
      const r = await uploadToCloudinary(file, { folder, resourceType });
      onChange(r.secure_url);
    } catch (e: any) {
      setError(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  const isVideo = value && /\.(mp4|webm|mov)$/i.test(value);

  return (
    <div className="space-y-2">
      <input
        ref={ref} type="file" accept={accept} className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }}
      />
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border">
          {isVideo ? (
            <video src={value} controls className="w-full max-h-60 bg-black" />
          ) : (
            <img src={value} alt="" className="w-full max-h-60 object-cover" />
          )}
          <button type="button" onClick={() => onChange("")} className="absolute top-2 right-2 rounded-full bg-black/70 text-white p-1.5">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button" onClick={() => ref.current?.click()} disabled={busy}
          className="w-full rounded-xl border border-dashed border-border bg-input px-4 py-6 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
          <span>{busy ? "Uploading…" : label}</span>
        </button>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
