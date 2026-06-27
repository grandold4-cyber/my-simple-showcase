import jsPDF from "jspdf";

export type AdmissionData = {
  application_no?: string | null;
  academic_year?: string | null;
  // Section 1 — Choice of class
  choice_level?: string | null;          // "Lower Primary" | "Upper Primary"
  preferred_grade?: string | null;
  class_of_interest?: string | null;     // legacy
  // Section 2 — Learner
  child_name: string;
  child_dob?: string | null;
  learner_gender?: string | null;
  place_of_birth?: string | null;
  nationality?: string | null;
  religion?: string | null;
  home_language?: string | null;
  special_needs?: string | null;
  // Section 3 — Parent / Guardian
  parent_name: string;
  parent_relationship?: string | null;
  parent_id_no?: string | null;
  parent_phone: string;
  parent_email: string;
  parent_address?: string | null;
  // Section 4 — Academic background
  current_school?: string | null;        // "Previous School"
  last_grade?: string | null;
  kcpe_index?: string | null;
  other_remarks?: string | null;
  // Section 6 — Declaration / notes
  message?: string | null;
  created_at?: string;
};

const PINK: [number, number, number] = [232, 33, 109];   // #E8216D
const SAPPHIRE: [number, number, number] = [30, 64, 175]; // #1E40AF
const INK: [number, number, number] = [30, 30, 40];
const MUTED: [number, number, number] = [110, 110, 120];

export function buildAdmissionPdf(d: AdmissionData): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 36;
  const colW = (W - M * 2 - 16) / 2;
  const colL = M;
  const colR = M + colW + 16;

  // ===== Top brand band =====
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, 110, "F");
  doc.setTextColor(...PINK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.text("HALEL", M, 60);
  doc.text("SCHOOL", W - M, 60, { align: "right" });
  // Shield placeholder (centered)
  doc.setDrawColor(...SAPPHIRE);
  doc.setFillColor(...SAPPHIRE);
  doc.circle(W / 2, 50, 22, "FD");
  doc.setTextColor(255);
  doc.setFontSize(8);
  doc.text("SIFA", W / 2, 48, { align: "center" });
  doc.text("SCHOOLS", W / 2, 58, { align: "center" });
  // Tagline pill
  doc.setFillColor(...PINK);
  doc.roundedRect(M + 120, 78, W - M * 2 - 240, 22, 11, 11, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("GROWING FAITH · NURTURING FUTURES", W / 2, 93, { align: "center" });

  // ===== Title band =====
  let y = 122;
  doc.setFillColor(...SAPPHIRE);
  doc.rect(M, y, W - M * 2, 44, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("ONLINE ENROLLMENT FORM", M + 12, y + 19);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const ay = d.academic_year || `${new Date().getFullYear()} / ${new Date().getFullYear() + 1}`;
  doc.text(`ACADEMIC YEAR  ${ay}`, M + 12, y + 35);
  // Application No box
  const appNo = d.application_no || "—";
  const boxW = 200;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(W - M - boxW - 12, y + 6, boxW, 32, 4, 4, "F");
  doc.setTextColor(...PINK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("APPLICATION NO.", W - M - boxW, y + 18);
  doc.setTextColor(...INK);
  doc.setFontSize(12);
  doc.text(appNo, W - M - boxW, y + 32);

  y += 56;

  // Helper: pink section header
  const section = (xL: number, xY: number, n: number, label: string) => {
    doc.setFillColor(...PINK);
    doc.roundedRect(xL, xY, colW, 18, 3, 3, "F");
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${n}.  ${label}`, xL + 8, xY + 13);
  };
  const field = (xL: number, xY: number, label: string, value?: string | null) => {
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(label, xL + 4, xY);
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const v = value && String(value).trim() ? String(value) : "—";
    const wrapped = doc.splitTextToSize(v, colW - 8);
    doc.text(wrapped, xL + 4, xY + 12);
    return 12 + wrapped.length * 11 + 4;
  };
  const cardBg = (xL: number, xY: number, h: number) => {
    doc.setFillColor(252, 240, 246);
    doc.roundedRect(xL, xY, colW, h, 4, 4, "F");
  };

  // ===== Section 1 — Choice of class (left) =====
  const s1H = 130;
  cardBg(colL, y + 18, s1H);
  section(colL, y, 1, "CHOICE OF CLASS");
  let yy = y + 30;
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Class the learner is applying for:", colL + 6, yy); yy += 14;
  const lvl = (d.choice_level || d.class_of_interest || "").toLowerCase();
  const lowerSel = lvl.includes("lower") || /grade\s*[1-3]|pp|playgroup/i.test(lvl);
  const upperSel = lvl.includes("upper") || /grade\s*[4-6]/i.test(lvl);
  const check = (x: number, y2: number, on: boolean) => {
    doc.setDrawColor(...PINK); doc.setLineWidth(1);
    doc.rect(x, y2, 9, 9);
    if (on) { doc.setTextColor(...PINK); doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text("X", x + 2, y2 + 8); }
  };
  check(colL + 8, yy - 8, lowerSel);
  doc.setTextColor(...SAPPHIRE); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
  doc.text("Lower Primary  (Grades 1 – 3)", colL + 22, yy); yy += 16;
  check(colL + 8, yy - 8, upperSel);
  doc.text("Upper Primary  (Grades 4 – 6)", colL + 22, yy); yy += 20;
  field(colL, yy, "Preferred Grade / Unit", d.preferred_grade || d.class_of_interest);

  // ===== Section 2 — Learner (right) =====
  const s2H = 218;
  cardBg(colR, y + 18, s2H);
  section(colR, y, 2, "LEARNER'S PERSONAL DETAILS");
  yy = y + 32;
  yy += field(colR, yy, "Full Name (as per Birth Certificate)", d.child_name);
  yy += field(colR, yy, "Date of Birth (DD/MM/YYYY)", d.child_dob);
  yy += field(colR, yy, "Gender", d.learner_gender);
  yy += field(colR, yy, "Place of Birth", d.place_of_birth);
  yy += field(colR, yy, "Nationality", d.nationality);
  yy += field(colR, yy, "Religion", d.religion);
  yy += field(colR, yy, "Home Language", d.home_language);
  field(colR, yy, "Any Special Need / Medical Condition", d.special_needs);

  // advance y past the taller of the two
  y += 18 + Math.max(s1H, s2H) + 12;

  // ===== Section 3 — Parent (left) =====
  const s3H = 150;
  cardBg(colL, y + 18, s3H);
  section(colL, y, 3, "PARENT / GUARDIAN INFORMATION");
  yy = y + 32;
  yy += field(colL, yy, "Full Name", d.parent_name);
  yy += field(colL, yy, "Relationship to Learner", d.parent_relationship);
  yy += field(colL, yy, "ID / Passport No.", d.parent_id_no);
  yy += field(colL, yy, "Phone Number", d.parent_phone);
  yy += field(colL, yy, "Email Address", d.parent_email);
  field(colL, yy, "Physical Address", d.parent_address);

  // ===== Section 4 — Academic background (right) =====
  const s4H = 150;
  cardBg(colR, y + 18, s4H);
  section(colR, y, 4, "ACADEMIC BACKGROUND");
  yy = y + 32;
  yy += field(colR, yy, "Previous School (if any)", d.current_school);
  yy += field(colR, yy, "Last Grade Completed", d.last_grade);
  yy += field(colR, yy, "KCPE Index No. (if applicable)", d.kcpe_index);
  field(colR, yy, "Any Other Remarks", d.other_remarks);

  y += 18 + Math.max(s3H, s4H) + 12;

  // ===== Section 5 — Declaration (full width) =====
  doc.setFillColor(...PINK);
  doc.roundedRect(M, y, W - M * 2, 18, 3, 3, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("5.  DECLARATION", M + 8, y + 13);
  y += 22;
  cardBg(M, y, 70); (doc as any).internal; // just bg
  doc.setFillColor(252, 240, 246);
  doc.roundedRect(M, y, W - M * 2, 70, 4, 4, "F");
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const dec = "I hereby declare that the information provided in this form is true and accurate to the best of my knowledge. I understand that any false information may lead to disqualification.";
  doc.text(doc.splitTextToSize(dec, W - M * 2 - 16), M + 8, y + 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`Name of Parent / Guardian:  ${d.parent_name || "—"}`, M + 8, y + 50);
  doc.text(`Date:  ${d.created_at ? new Date(d.created_at).toLocaleDateString() : new Date().toLocaleDateString()}`, M + 8, y + 64);
  y += 80;

  if (d.message) {
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Notes from parent", M, y); y += 12;
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(d.message, W - M * 2);
    doc.text(lines, M, y);
    y += lines.length * 11 + 8;
  }

  // ===== Bottom band =====
  doc.setFillColor(...SAPPHIRE);
  doc.rect(0, H - 50, W, 50, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Second Avenue, Buruburu Farm, Nairobi", M, H - 30);
  doc.text("+254 715 297 696", W / 2, H - 30, { align: "center" });
  doc.text("Monday – Saturday", W - M, H - 30, { align: "right" });
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(255, 220, 235);
  doc.text("Educate a child today, empower a generation tomorrow.", W / 2, H - 12, { align: "center" });

  return doc;
}

export function downloadAdmissionPdf(d: AdmissionData) {
  const doc = buildAdmissionPdf(d);
  const safe = (d.child_name || "applicant").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const no = (d.application_no || "").replace(/[^A-Za-z0-9-]/g, "");
  doc.save(`halel-enrollment-${no || safe}.pdf`);
}
