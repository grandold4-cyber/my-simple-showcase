// Static fallback gallery — always shown alongside DB items so pictures render
// even if the gallery_items table is empty or unreachable.
import church1 from "@/assets/gallery/church/img-1.jpeg.asset.json";
import church2 from "@/assets/gallery/church/img-2.jpeg.asset.json";
import church3 from "@/assets/gallery/church/img-3.jpeg.asset.json";
import church4 from "@/assets/gallery/church/img-4.jpeg.asset.json";
import church5 from "@/assets/gallery/church/img-5.jpeg.asset.json";
import church6 from "@/assets/gallery/church/img-6.jpeg.asset.json";
import school1 from "@/assets/gallery/school/img-1.jpeg.asset.json";
import school2 from "@/assets/gallery/school/img-2.jpeg.asset.json";
import school3 from "@/assets/gallery/school/img-3.jpeg.asset.json";
import school4 from "@/assets/gallery/school/img-4.jpeg.asset.json";
import school5 from "@/assets/gallery/school/img-5.jpeg.asset.json";
import school6 from "@/assets/gallery/school/img-6.jpeg.asset.json";
import school7 from "@/assets/gallery/school/img-7.jpeg.asset.json";
import school8 from "@/assets/gallery/school/img-8.jpeg.asset.json";
import school9 from "@/assets/gallery/school/img-9.jpeg.asset.json";
import school10 from "@/assets/gallery/school/img-10.jpeg.asset.json";
import school11 from "@/assets/gallery/school/img-11.jpeg.asset.json";
import school12 from "@/assets/gallery/school/img-12.jpeg.asset.json";
import school13 from "@/assets/gallery/school/img-13.jpeg.asset.json";
import school14 from "@/assets/gallery/school/img-14.jpeg.asset.json";
import school15 from "@/assets/gallery/school/img-15.jpeg.asset.json";
import school16 from "@/assets/gallery/school/img-16.jpeg.asset.json";
import school17 from "@/assets/gallery/school/img-17.jpeg.asset.json";
import school18 from "@/assets/gallery/school/img-18.jpeg.asset.json";

export type StaticGalleryItem = {
  id: string;
  section: "school" | "church" | "company";
  kind: "image";
  url: string;
  title: string | null;
  caption: string | null;
  created_at: string;
};

const now = new Date(0).toISOString();
const mk = (
  section: StaticGalleryItem["section"],
  i: number,
  asset: { url: string },
  title: string,
): StaticGalleryItem => ({
  id: `static-${section}-${i}`,
  section,
  kind: "image",
  url: asset.url,
  title,
  caption: null,
  created_at: now,
});

export const staticGallery: StaticGalleryItem[] = [
  mk("church", 1, church1, "Praise Church"),
  mk("church", 2, church2, "Praise Church"),
  mk("church", 3, church3, "Praise Church"),
  mk("church", 4, church4, "Praise Church"),
  mk("church", 5, church5, "Praise Church"),
  mk("church", 6, church6, "Praise Church"),
  mk("school", 1, school1, "Halel School"),
  mk("school", 2, school2, "Halel School"),
  mk("school", 3, school3, "Halel School"),
  mk("school", 4, school4, "Halel School"),
  mk("school", 5, school5, "Halel School"),
  mk("school", 6, school6, "Halel School"),
  mk("school", 7, school7, "Halel School"),
  mk("school", 8, school8, "Halel School"),
  mk("school", 9, school9, "Halel School"),
  mk("school", 10, school10, "Halel School"),
  mk("school", 11, school11, "Halel School"),
  mk("school", 12, school12, "Halel School"),
  mk("school", 13, school13, "Halel School"),
  mk("school", 14, school14, "Halel School"),
  mk("school", 15, school15, "Halel School"),
  mk("school", 16, school16, "Halel School"),
  mk("school", 17, school17, "Halel School"),
  mk("school", 18, school18, "Halel School"),
];
