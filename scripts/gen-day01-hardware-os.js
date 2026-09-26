const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Cybersecurity Academy";
pres.title = "Day 1: Hardware & Operating System Fundamentals";

// Color Palette — Cybersecurity Theme
const C = {
  dark: "0F172A",      // Dark navy
  mid: "1E293B",       // Slate
  accent: "0EA5E9",    // Electric blue
  accent2: "22D3EE",   // Cyan
  text: "F8FAFC",      // Off-white
  muted: "94A3B8",     // Muted gray
  highlight: "F59E0B", // Amber
  danger: "EF4444",    // Red
  success: "22C55E",   // Green
};

// Helper: Add accent bar at top
function addTopBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: C.accent }
  });
}

// Helper: Add footer
function addFooter(slide, num, total) {
  slide.addText(`${num} / ${total}`, {
    x: 8.5, y: 5.2, w: 1, h: 0.3,
    fontSize: 9, color: C.muted, align: "right"
  });
}

const TOTAL = 25;

// ═══════════════════════════════════════════════════
// SLIDE 1: Title Slide
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  // Large accent shape
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: C.accent }
  });

  s.addText("DAY 1", {
    x: 0.8, y: 1.2, w: 8, h: 0.7,
    fontSize: 18, fontFace: "Arial", color: C.accent,
    charSpacing: 8, bold: true
  });

  s.addText("Hardware & Operating\nSystem Fundamentals", {
    x: 0.8, y: 1.9, w: 8, h: 2,
    fontSize: 40, fontFace: "Arial", color: C.text, bold: true,
    lineSpacingMultiple: 1.1
  });

  s.addText("Cybersecurity Beginner Course", {
    x: 0.8, y: 4.2, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Arial", color: C.muted
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.0, w: 2, h: 0.04,
    fill: { color: C.accent }
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 2: Agenda
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 2, TOTAL);

  s.addText("AGENDA", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "PART 1 — HARDWARE", options: { bold: true, color: C.accent2, fontSize: 14, breakLine: true } },
    { text: "CPU, RAM, Storage, BIOS/UEFI, Network Card", options: { color: C.muted, fontSize: 12, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "PART 2 — OPERATING SYSTEM", options: { bold: true, color: C.accent2, fontSize: 14, breakLine: true } },
    { text: "Kernel, Processes, Memory, File System, Services", options: { color: C.muted, fontSize: 12, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "PART 3 — SECURITY CONNECTION", options: { bold: true, color: C.accent2, fontSize: 14, breakLine: true } },
    { text: "How each layer is attacked and defended", options: { color: C.muted, fontSize: 12 } },
  ], { x: 0.8, y: 1.3, w: 8, h: 3.5 });
}

// ═══════════════════════════════════════════════════
// SLIDE 3: Section Divider — PART 1
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.mid };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.2, w: 10, h: 1.2,
    fill: { color: C.accent }
  });

  s.addText("PART 1", {
    x: 0.8, y: 1.2, w: 8, h: 0.6,
    fontSize: 16, fontFace: "Arial", color: C.muted, charSpacing: 6
  });

  s.addText("HARDWARE", {
    x: 0.8, y: 2.3, w: 8.4, h: 1,
    fontSize: 44, fontFace: "Arial", color: C.dark, bold: true
  });

  s.addText("The Physical Foundation", {
    x: 0.8, y: 3.7, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Arial", color: C.muted
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 4: What is Hardware
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 4, TOTAL);

  s.addText("WHAT IS HARDWARE?", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText("Any physical part of a computer you can touch.\nIt is the body; software is the brain.", {
    x: 0.8, y: 1.4, w: 8, h: 0.8,
    fontSize: 16, fontFace: "Arial", color: C.text
  });

  s.addText([
    { text: "CPU", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — The brain that executes instructions", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "RAM", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Fast, temporary working memory", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Storage", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Permanent data (SSD / HDD)", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "BIOS/UEFI", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — First firmware that runs on power on", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "NIC", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Network card connects you to the wire", options: { color: C.muted } },
  ], { x: 0.8, y: 2.4, w: 8, h: 3 });
}

// ═══════════════════════════════════════════════════
// SLIDE 5: CPU Deep Dive
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 5, TOTAL);

  s.addText("CPU — THE BRAIN", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText("Executes every instruction. Billions of cycles per second.", {
    x: 0.8, y: 1.3, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Arial", color: C.muted
  });

  s.addText([
    { text: "Registers", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Ultra-fast storage inside CPU", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "ALU", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Arithmetic Logic Unit does math", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Control Unit", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Directs traffic between components", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Cache", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Small fast memory (L1, L2, L3)", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Clock Speed", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Cycles per second (GHz)", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Cores", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Number of independent CPUs", options: { color: C.muted } },
  ], { x: 0.8, y: 2.0, w: 8, h: 3.2 });
}

// ═══════════════════════════════════════════════════
// SLIDE 6: CPU Security
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 6, TOTAL);

  s.addText("CPU — SECURITY RELEVANCE", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.danger, bold: true
  });

  s.addText([
    { text: "Spectre & Meltdown", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Attack how CPU speculatively executes instructions", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Side-Channel Attacks", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Extract secrets by measuring CPU timing", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Privilege Escalation", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Attacker jumps from user-level to kernel-level", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Protection Rings", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Ring 0 = Kernel (full control) | Ring 3 = User (restricted)", options: { color: C.muted } },
  ], { x: 0.8, y: 1.4, w: 8.5, h: 3.5 });
}

// ═══════════════════════════════════════════════════
// SLIDE 7: RAM
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 7, TOTAL);

  s.addText("RAM — WORKING MEMORY", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText("Fast, temporary workspace for active programs.", {
    x: 0.8, y: 1.3, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Arial", color: C.muted
  });

  s.addText([
    { text: "Speed", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Very fast (nanoseconds)", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Volatile", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Data dies when power off", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Capacity", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — 8-64 GB typical", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Cost", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Expensive per GB", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Analogy", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Your desk. Active files go here.", options: { color: C.muted } },
  ], { x: 0.8, y: 2.0, w: 8, h: 3 });
}

// ═══════════════════════════════════════════════════
// SLIDE 8: RAM Security
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 8, TOTAL);

  s.addText("RAM — SECURITY RELEVANCE", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.danger, bold: true
  });

  s.addText([
    { text: "RAM Scraping Malware", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Steals credit cards, passwords from memory", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Cold Boot Attacks", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Freeze RAM, move to another machine, read keys", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Fileless Malware", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Lives only in RAM, no files on disk to scan", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Memory Forensics", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  RAM dumps reveal encryption keys and secrets", options: { color: C.muted } },
  ], { x: 0.8, y: 1.4, w: 8.5, h: 3.5 });
}

// ═══════════════════════════════════════════════════
// SLIDE 9: Storage
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 9, TOTAL);

  s.addText("STORAGE — PERMANENT MEMORY", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "HDD", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Mechanical, slower, cheaper, fragile", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "SSD", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — No moving parts, faster, durable, expensive", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Non-Volatile", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Keeps data without power", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Analogy", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Filing cabinet. Files stay until deleted.", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Why not run programs from storage?", options: { bold: true, color: C.accent2, breakLine: true } },
    { text: "  Storage is 1000x slower than RAM", options: { color: C.muted } },
  ], { x: 0.8, y: 1.4, w: 8.5, h: 3.5 });
}

// ═══════════════════════════════════════════════════
// SLIDE 10: Storage Security
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 10, TOTAL);

  s.addText("STORAGE — SECURITY RELEVANCE", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.danger, bold: true
  });

  s.addText([
    { text: "Malware Persistence", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Malware writes to disk to survive reboots", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Forensics", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Deleted files recoverable until overwritten", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Firmware Attacks", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Malware in BIOS/UEFI survives OS reinstall", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Disk Encryption", options: { bold: true, color: C.success, breakLine: true } },
    { text: "  BitLocker (Windows) / LUKS (Linux) protects data", options: { color: C.muted } },
  ], { x: 0.8, y: 1.4, w: 8.5, h: 3.5 });
}

// ═══════════════════════════════════════════════════
// SLIDE 11: BIOS/UEFI
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 11, TOTAL);

  s.addText("BIOS / UEFI — FIRMWARE", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText("The first software that runs when you power on.", {
    x: 0.8, y: 1.3, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Arial", color: C.muted
  });

  s.addText([
    { text: "BIOS", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Legacy firmware (Basic Input/Output System)", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "UEFI", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Modern replacement (faster, more secure)", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "POST", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Power-On Self-Test checks hardware", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Boot Order", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Which device to boot from first", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Boot Sequence:", options: { bold: true, color: C.accent2, breakLine: true } },
    { text: "  Power ON → BIOS/UEFI → POST → Find OS → Load OS", options: { color: C.muted } },
  ], { x: 0.8, y: 1.9, w: 8.5, h: 3.2 });
}

// ═══════════════════════════════════════════════════
// SLIDE 12: Network Card
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 12, TOTAL);

  s.addText("NETWORK INTERFACE CARD (NIC)", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "MAC Address", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Unique 48-bit hardware address burned into NIC", options: { color: C.muted, breakLine: true } },
    { text: "  Format: AA:BB:CC:DD:EE:FF", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Function", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Sends and receives data over network", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Security Relevance:", options: { bold: true, color: C.danger, breakLine: true } },
    { text: "  MAC Spoofing — attacker changes MAC to impersonate another device", options: { color: C.muted, breakLine: true } },
    { text: "  Network Sniffing — capturing traffic on the wire", options: { color: C.muted, breakLine: true } },
    { text: "  ARP Spoofing — redirect traffic by faking MAC-IP mappings", options: { color: C.muted } },
  ], { x: 0.8, y: 1.3, w: 8.5, h: 3.8 });
}

// ═══════════════════════════════════════════════════
// SLIDE 13: Section Divider — PART 2
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.mid };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.2, w: 10, h: 1.2,
    fill: { color: C.accent }
  });

  s.addText("PART 2", {
    x: 0.8, y: 1.2, w: 8, h: 0.6,
    fontSize: 16, fontFace: "Arial", color: C.muted, charSpacing: 6
  });

  s.addText("OPERATING SYSTEM", {
    x: 0.8, y: 2.3, w: 8.4, h: 1,
    fontSize: 44, fontFace: "Arial", color: C.dark, bold: true
  });

  s.addText("The Manager Between Hardware & Apps", {
    x: 0.8, y: 3.7, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Arial", color: C.muted
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 14: What is OS
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 14, TOTAL);

  s.addText("WHAT IS AN OPERATING SYSTEM?", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText("Software that manages all hardware resources\nand provides services for applications.", {
    x: 0.8, y: 1.3, w: 8, h: 0.8,
    fontSize: 16, fontFace: "Arial", color: C.text
  });

  s.addText([
    { text: "Process Management", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Decides which programs run and when", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Memory Management", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Allocates RAM to programs", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "File System", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Organizes files on storage", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Device Management", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Controls keyboards, screens, network", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "User Management", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Handles accounts and permissions", options: { color: C.muted } },
  ], { x: 0.8, y: 2.3, w: 8.5, h: 3 });
}

// ═══════════════════════════════════════════════════
// SLIDE 15: Kernel vs User Mode
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 15, TOTAL);

  s.addText("KERNEL MODE vs USER MODE", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText("THE MOST IMPORTANT CONCEPT FOR SECURITY", {
    x: 0.8, y: 1.1, w: 8, h: 0.4,
    fontSize: 12, fontFace: "Arial", color: C.highlight, bold: true, charSpacing: 4
  });

  // Kernel box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.7, w: 8.4, h: 1.4,
    fill: { color: C.danger, transparency: 20 }
  });
  s.addText([
    { text: "KERNEL MODE (Ring 0)", options: { bold: true, color: C.danger, fontSize: 16, breakLine: true } },
    { text: "Full access to ALL hardware | Can execute ANY instruction | OS kernel runs here", options: { color: C.text, fontSize: 12 } },
  ], { x: 1.0, y: 1.8, w: 8, h: 1.2 });

  // User box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.3, w: 8.4, h: 1.4,
    fill: { color: C.success, transparency: 20 }
  });
  s.addText([
    { text: "USER MODE (Ring 3)", options: { bold: true, color: C.success, fontSize: 16, breakLine: true } },
    { text: "Restricted access | Must use SYSTEM CALLS | Your apps run here", options: { color: C.text, fontSize: 12 } },
  ], { x: 1.0, y: 3.4, w: 8, h: 1.2 });

  // Attack arrow
  s.addText("ATTACKER GOAL: Break from User → Kernel", {
    x: 0.8, y: 4.9, w: 8.4, h: 0.4,
    fontSize: 12, fontFace: "Arial", color: C.highlight, bold: true, align: "center"
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 16: Processes
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 16, TOTAL);

  s.addText("PROCESSES", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText("A running instance of a program.", {
    x: 0.8, y: 1.3, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Arial", color: C.muted
  });

  s.addText([
    { text: "PID", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Unique process ID number", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Parent Process", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — What spawned it", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "User", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Which account owns it", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Memory Usage", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — How much RAM it's using", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "States", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Ready → Running → Waiting → Terminated", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Check it:  Windows = tasklist | Linux = ps aux / htop", options: { bold: true, color: C.accent2 } },
  ], { x: 0.8, y: 1.9, w: 8.5, h: 3.2 });
}

// ═══════════════════════════════════════════════════
// SLIDE 17: Process Security
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 17, TOTAL);

  s.addText("PROCESSES — SECURITY", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.danger, bold: true
  });

  s.addText([
    { text: "Process Injection", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Hide malware inside legitimate process", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Process Hollowing", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Replace a process's code with malicious code", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Red Flags to Watch:", options: { bold: true, color: C.accent2, breakLine: true } },
    { text: "  suspicious.exe running as SYSTEM", options: { color: C.muted, breakLine: true } },
    { text: "  chrome.exe spawning cmd.exe", options: { color: C.muted, breakLine: true } },
    { text: "  word.exe running powershell.exe", options: { color: C.muted, breakLine: true } },
    { text: "  unknown.exe using 100% CPU", options: { color: C.muted } },
  ], { x: 0.8, y: 1.3, w: 8.5, h: 3.8 });
}

// ═══════════════════════════════════════════════════
// SLIDE 18: File Systems & Permissions
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 18, TOTAL);

  s.addText("FILE SYSTEMS & PERMISSIONS", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "File Systems by OS:", options: { bold: true, color: C.accent2, breakLine: true } },
    { text: "  Windows: NTFS, FAT32", options: { color: C.muted, breakLine: true } },
    { text: "  Linux: ext4, XFS", options: { color: C.muted, breakLine: true } },
    { text: "  macOS: APFS, HFS+", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Permissions:", options: { bold: true, color: C.accent2, breakLine: true } },
    { text: "  Read (r) — View file contents", options: { color: C.muted, breakLine: true } },
    { text: "  Write (w) — Modify file contents", options: { color: C.muted, breakLine: true } },
    { text: "  Execute (x) — Run as program", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Dangerous:", options: { bold: true, color: C.danger, breakLine: true } },
    { text: "  chmod 777 = everyone has full access", options: { color: C.muted, breakLine: true } },
    { text: '  "Everyone: Full Control" in Windows', options: { color: C.muted } },
  ], { x: 0.8, y: 1.3, w: 8.5, h: 4 });
}

// ═══════════════════════════════════════════════════
// SLIDE 19: Services & Ports
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 19, TOTAL);

  s.addText("SERVICES & PORTS", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "Service/Daemon", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Background process without user interaction", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Port", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Number identifying a specific service", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Listening", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Waiting for incoming network connections", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Common Ports:", options: { bold: true, color: C.accent2, breakLine: true } },
    { text: "  22 = SSH | 53 = DNS | 80 = HTTP", options: { color: C.muted, breakLine: true } },
    { text: "  443 = HTTPS | 3389 = RDP | 3306 = MySQL", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Open ports = attack surface", options: { bold: true, color: C.danger } },
  ], { x: 0.8, y: 1.3, w: 8.5, h: 4 });
}

// ═══════════════════════════════════════════════════
// SLIDE 20: Memory Protection
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 20, TOTAL);

  s.addText("MEMORY PROTECTION", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "Virtual Memory", options: { bold: true, color: C.highlight, breakLine: true } },
    { text: "  Each process thinks it has its own private memory space", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "ASLR", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Randomizes memory addresses", options: { color: C.muted, breakLine: true } },
    { text: "  Makes buffer overflow exploits harder", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "DEP / NX", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Marks memory as non-executable", options: { color: C.muted, breakLine: true } },
    { text: "  Prevents shellcode injection", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Stack Canaries", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Detects buffer overflow before return", options: { color: C.muted, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Memory Isolation", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " — Process A cannot read Process B's memory", options: { color: C.muted } },
  ], { x: 0.8, y: 1.3, w: 8.5, h: 4 });
}

// ═══════════════════════════════════════════════════
// SLIDE 21: Boot Process
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 21, TOTAL);

  s.addText("BOOT PROCESS", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "1.", options: { bold: true, color: C.accent2, breakLine: false } },
    { text: " Power ON", options: { color: C.text, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "2.", options: { bold: true, color: C.accent2, breakLine: false } },
    { text: " BIOS/UEFI loads from chip", options: { color: C.text, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "3.", options: { bold: true, color: C.accent2, breakLine: false } },
    { text: " POST — checks hardware", options: { color: C.text, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "4.", options: { bold: true, color: C.accent2, breakLine: false } },
    { text: " Find boot device (SSD, USB, network)", options: { color: C.text, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "5.", options: { bold: true, color: C.accent2, breakLine: false } },
    { text: " Load bootloader (GRUB, Windows Boot Manager)", options: { color: C.text, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "6.", options: { bold: true, color: C.accent2, breakLine: false } },
    { text: " Load OS kernel into RAM", options: { color: C.text, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "7.", options: { bold: true, color: C.accent2, breakLine: false } },
    { text: " Kernel initializes (drivers, memory, services)", options: { color: C.text, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "8.", options: { bold: true, color: C.accent2, breakLine: false } },
    { text: " User login screen appears", options: { color: C.text } },
  ], { x: 0.8, y: 1.3, w: 8.5, h: 4 });
}

// ═══════════════════════════════════════════════════
// SLIDE 22: Section Divider — PART 3
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.mid };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.2, w: 10, h: 1.2,
    fill: { color: C.highlight }
  });

  s.addText("PART 3", {
    x: 0.8, y: 1.2, w: 8, h: 0.6,
    fontSize: 16, fontFace: "Arial", color: C.muted, charSpacing: 6
  });

  s.addText("SECURITY SUMMARY", {
    x: 0.8, y: 2.3, w: 8.4, h: 1,
    fontSize: 44, fontFace: "Arial", color: C.dark, bold: true
  });

  s.addText("Attack & Defense at Every Layer", {
    x: 0.8, y: 3.7, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Arial", color: C.muted
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 23: Hardware Security Summary
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 23, TOTAL);

  s.addText("HARDWARE — ATTACK vs DEFENSE", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "CPU", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " → Spectre/Meltdown attacks", options: { color: C.danger, breakLine: false } },
    { text: " | Patch updates", options: { color: C.success, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "RAM", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " → Cold boot, RAM scraping", options: { color: C.danger, breakLine: false } },
    { text: " | Disk encryption, secure boot", options: { color: C.success, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Storage", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " → Malware persistence", options: { color: C.danger, breakLine: false } },
    { text: " | Antivirus, encryption", options: { color: C.success, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "BIOS", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " → Bootkits", options: { color: C.danger, breakLine: false } },
    { text: "      | Secure Boot, BIOS password", options: { color: C.success, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "NIC", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: "   → MAC spoofing, sniffing", options: { color: C.danger, breakLine: false } },
    { text: "   | Network monitoring", options: { color: C.success } },
  ], { x: 0.8, y: 1.3, w: 9, h: 4 });
}

// ═══════════════════════════════════════════════════
// SLIDE 24: OS Security Summary
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };
  addTopBar(s);
  addFooter(s, 24, TOTAL);

  s.addText("OS — ATTACK vs DEFENSE", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Arial", color: C.accent, bold: true
  });

  s.addText([
    { text: "Kernel/User Mode", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: " → Privilege escalation", options: { color: C.danger, breakLine: false } },
    { text: " | Patch updates, least privilege", options: { color: C.success, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Processes", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: "        → Injection, hollowing", options: { color: C.danger, breakLine: false } },
    { text: "       | Monitor with Task Manager", options: { color: C.success, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Permissions", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: "       → Weak configs", options: { color: C.danger, breakLine: false } },
    { text: "        | Least privilege principle", options: { color: C.success, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Services", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: "            → Exploitation", options: { color: C.danger, breakLine: false } },
    { text: "          | Disable unnecessary services", options: { color: C.success, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "Memory", options: { bold: true, color: C.highlight, breakLine: false } },
    { text: "             → Buffer overflow", options: { color: C.danger, breakLine: false } },
    { text: "           | ASLR, DEP, canaries", options: { color: C.success } },
  ], { x: 0.8, y: 1.3, w: 9, h: 4 });
}

// ═══════════════════════════════════════════════════
// SLIDE 25: Key Takeaway
// ═══════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: C.accent }
  });

  s.addText("KEY TAKEAWAY", {
    x: 0.8, y: 1.0, w: 8, h: 0.6,
    fontSize: 16, fontFace: "Arial", color: C.accent, charSpacing: 6, bold: true
  });

  s.addText("If you own the OS,\nyou own the machine.", {
    x: 0.8, y: 1.8, w: 8, h: 1.8,
    fontSize: 40, fontFace: "Arial", color: C.text, bold: true,
    lineSpacingMultiple: 1.2
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.8, w: 2, h: 0.04,
    fill: { color: C.accent }
  });

  s.addText("Hardware = what attackers exploit or protect\nOS = the gatekeeper\nKernel Mode = the ultimate target", {
    x: 0.8, y: 4.1, w: 8, h: 1,
    fontSize: 14, fontFace: "Arial", color: C.muted,
    lineSpacingMultiple: 1.4
  });
}

// ═══════════════════════════════════════════════════
// WRITE FILE
// ═══════════════════════════════════════════════════
(async () => {
  try {
    await pres.writeFile({ fileName: "D:\\Pen\\cybersec-academy\\decks\\day01-hardware-os.pptx" });
    console.log("DONE: day01-hardware-os.pptx created successfully");
    process.exit(0);
  } catch (err) {
    console.error("ERROR:", err);
    process.exit(1);
  }
})();
