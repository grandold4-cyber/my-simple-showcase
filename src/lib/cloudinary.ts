// Cloudinary unsigned upload — uses cloud name + unsigned upload preset.
// No secret key required client-side.
export const CLOUDINARY_CLOUD = "dsxaxpz4x";
export const CLOUDINARY_PRESET = "54global";

export type UploadResult = {
  url: string;
  secure_url: string;
  resource_type: "image" | "video" | "raw" | "auto";
  format?: string;
  bytes?: number;
};

export async function uploadToCloudinary(
  file: File,
  opts: { folder?: string; resourceType?: "image" | "video" | "auto" } = {},
): Promise<UploadResult> {
  const resourceType = opts.resourceType ?? (file.type.startsWith("video/") ? "video" : "image");
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/${resourceType}/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", CLOUDINARY_PRESET);
  if (opts.folder) fd.append("folder", opts.folder);
  const res = await fetch(url, { method: "POST", body: fd });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  return {
    url: json.url,
    secure_url: json.secure_url,
    resource_type: json.resource_type,
    format: json.format,
    bytes: json.bytes,
  };
}
