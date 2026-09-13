import html2canvas from "html2canvas-pro";
import { toCanvas as htmlToImageToCanvas } from "html-to-image";
import { jsPDF } from "jspdf";
import { ResumeData } from "../types";

/**
 * Triggers clean browser print dialog specifically styled for A4 page output
 */
export function printResume(): void {
  window.print();
}

/**
 * Robustly renders a DOM element into a canvas, supporting modern CSS color spaces (oklch, lab, etc.)
 */
async function renderElementToCanvas(target: HTMLElement): Promise<HTMLCanvasElement> {
  try {
    // Primary: html2canvas-pro natively supports oklch, lab, lch, and modern CSS
    return await html2canvas(target, {
      scale: 2, // 2x sharpness for crisp professional print
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 794,
    });
  } catch (err) {
    console.warn("html2canvas-pro capture encountered an issue, trying html-to-image fallback:", err);
    // Fallback: uses browser native SVG foreignObject which renders all modern CSS perfectly
    return await htmlToImageToCanvas(target, {
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      width: 794,
    });
  }
}

/**
 * Exports resume as an authentic high-resolution PDF document (.pdf file only)
 * Creates a standard A4 PDF (210mm x 297mm) using jsPDF
 */
export async function downloadResumePDF(resume: ResumeData): Promise<boolean> {
  // Find the target element for PDF generation
  let target =
    document.getElementById("download-modal-a4-pdf-target") ||
    document.getElementById("resume-a4-preview-content") ||
    (document.querySelector(".resume-a4-page") as HTMLElement | null);

  if (!target) {
    console.warn("Resume element not found in DOM, attempting retry...");
    // Short retry in case element is mounting
    await new Promise((res) => setTimeout(res, 300));
    target =
      document.getElementById("download-modal-a4-pdf-target") ||
      document.getElementById("resume-a4-preview-content") ||
      (document.querySelector(".resume-a4-page") as HTMLElement | null);
  }

  if (!target) {
    console.error("Resume preview element not found for PDF export");
    window.print();
    return false;
  }

  try {
    // Ensure all web fonts are loaded
    if (document.fonts) {
      await document.fonts.ready;
    }

    const canvas = await renderElementToCanvas(target);
    const imgData = canvas.toDataURL("image/jpeg", 0.98);

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

    let heightLeft = imgHeight;
    let position = 0;

    // Render first page
    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    // Multi-page handling if content extends beyond 1 A4 page
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfHeight;
    }

    // Safe sanitized filename ending strictly in .pdf
    const candidateName = (resume.personal?.fullName || "Resume").trim();
    const safeName = candidateName.replace(/[^a-zA-Z0-9_-]/g, "_") || "Resume";
    const filename = `${safeName}_Resume.pdf`;

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Error generating PDF with jsPDF:", error);
    // Fallback if canvas rendering fails
    window.print();
    return false;
  }
}

/**
 * Backward-compatibility alias
 */
export async function downloadResumeHTML(resume: ResumeData): Promise<void> {
  await downloadResumePDF(resume);
}

/**
 * Exports resume data as JSON for easy local backup & restore
 */
export function exportResumeJSON(resume: ResumeData): void {
  const jsonStr = JSON.stringify(resume, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(resume.personal.fullName || "Resume").replace(/\s+/g, "_")}_Data.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports all resumes as backup JSON
 */
export function exportAllDataJSON(resumes: ResumeData[]): void {
  const jsonStr = JSON.stringify(resumes, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ResumeMaker_Backup_${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Imports resumes from user backup JSON file
 */
export async function importAllDataJSON(file: File): Promise<ResumeData[] | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed)) {
          resolve(parsed);
        } else if (parsed && typeof parsed === "object") {
          resolve([parsed]);
        } else {
          resolve(null);
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}
