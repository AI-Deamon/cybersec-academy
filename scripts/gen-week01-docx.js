const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, PageNumber, TabStopType, TabStopPosition,
  LevelFormat } = require('docx');

const b = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const bs = { top: b, bottom: b, left: b, right: b };
const cm = { top: 80, bottom: 80, left: 120, right: 120 };
const PW = 12240, M = 1440, CW = PW - 2*M;

function hc(t, w) {
  return new TableCell({
    borders: bs, width: { size: w, type: WidthType.DXA },
    shading: { fill: '2E75B6', type: ShadingType.CLEAR }, margins: cm,
    children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, font: 'Arial', size: 20, color: 'FFFFFF' })] })]
  });
}

function c(t, w, o = {}) {
  return new TableCell({
    borders: bs, width: { size: w, type: WidthType.DXA },
    shading: o.s ? { fill: 'F2F7FB', type: ShadingType.CLEAR } : undefined, margins: cm,
    children: [new Paragraph({ children: [new TextRun({ text: t, font: 'Arial', size: 20, ...(o.b ? { bold: true } : {}) })] })]
  });
}

function al(n = 3) {
  const r = [];
  for (let i = 0; i < n; i++) {
    r.push(new Paragraph({
      spacing: { before: 60, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD', space: 4 } },
      children: [new TextRun({ text: ' ', font: 'Arial', size: 20 })]
    }));
  }
  return r;
}

function st(t) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 },
    children: [new TextRun({ text: t, font: 'Arial', size: 32, bold: true, color: '2E75B6' })]
  });
}

function ss(t) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 },
    children: [new TextRun({ text: t, font: 'Arial', size: 26, bold: true, color: '1E293B' })]
  });
}

function bt(t) {
  return new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: t, font: 'Arial', size: 20 })] });
}

function it(t) {
  return new Paragraph({
    spacing: { before: 60, after: 60 }, shading: { fill: 'FFF8E1', type: ShadingType.CLEAR },
    indent: { left: 200, right: 200 },
    children: [new TextRun({ text: t, font: 'Arial', size: 20, italics: true, color: '6D4C00' })]
  });
}

function qt(t) {
  return new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: t, font: 'Arial', size: 20, bold: true })] });
}

function cb(t) {
  return new Paragraph({
    spacing: { before: 40, after: 40 }, indent: { left: 360 },
    children: [new TextRun({ text: '\u2610  ', font: 'Arial', size: 24 }), new TextRun({ text: t, font: 'Arial', size: 20 })]
  });
}

function dv() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: '2E75B6', space: 4 } }, children: []
  });
}

function pb() {
  return new Paragraph({ children: [new PageBreak()] });
}

function code(t) {
  return new Paragraph({
    spacing: { before: 80, after: 80 }, shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
    indent: { left: 360 }, children: [new TextRun({ text: t, font: 'Consolas', size: 20 })]
  });
}

function makeTable(headers, rows, colWidths) {
  const headerRow = new TableRow({ children: headers.map((h, i) => hc(h, colWidths[i])) });
  const dataRows = rows.map((row, ri) => new TableRow({
    children: row.map((cell, i) => c(cell, colWidths[i], { s: ri % 2 === 0 }))
  }));
  return new Table({
    width: { size: colWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: colWidths, rows: [headerRow, ...dataRows]
  });
}

function banner(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 },
    shading: { fill: '2E75B6', type: ShadingType.CLEAR },
    children: [new TextRun({ text, font: 'Arial', size: 28, bold: true, color: 'FFFFFF' })]
  });
}

const children = [];

// ── TITLE PAGE ──
children.push(new Paragraph({ spacing: { before: 600 }, children: [] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
  children: [new TextRun({ text: 'WEEK 1', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
  children: [new TextRun({ text: 'Supplementary Assignment', font: 'Arial', size: 40, bold: true, color: '1E293B' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
  children: [new TextRun({ text: 'Know Your Machine, Know the Rules', font: 'Arial', size: 28, color: '2E75B6', italics: true })] }));
children.push(dv());
children.push(new Paragraph({ spacing: { before: 200 }, children: [] }));
children.push(bt('Name: _________________________________    Date: _______________'));
children.push(bt('Instructor: _____________________________    Course Section: ________'));
children.push(new Paragraph({ spacing: { before: 200 }, children: [] }));
children.push(it('SCENARIO: Your team lead hands you a laptop on your first day and says: Before we trust you with anyone else systems, show me you understand the rules and the machine you are holding.'));
children.push(new Paragraph({ spacing: { before: 100 }, children: [] }));
children.push(bt('This assignment covers the full foundation of Week 1: security concepts (CIA, AAA), legal ethics, threat actors, hardware, operating systems, and live network investigation. Complete Part A (written) before Part B (hands-on).'));

// ── PART A ──
children.push(pb());
children.push(banner('PART A \u2014 FOUNDATIONS (concepts, ethics, and vocabulary)'));
children.push(it('Complete Part A before moving to the hands-on tasks. These concepts frame everything you will do in this course.'));

// Task 1
children.push(st('Task 1 \u2014 What Are You Protecting? (CIA Triad + AAA)'));
children.push(ss('CIA Triad'));
children.push(bt('Every security decision protects something. The CIA Triad defines what:'));
children.push(makeTable(['Pillar', 'Definition', 'Real-World Example'], [
  ['Confidentiality', 'Keeping data secret from unauthorized people', 'Password database encrypted so stolen files are useless'],
  ['Integrity', 'Making sure data has not been tampered with', 'Bank transfer shows the amount you actually sent'],
  ['Availability', 'Systems and data accessible when needed', 'Hospital records stay online during a ransomware attack'],
], [2200, 3580, 3580]));
children.push(new Paragraph({ spacing: { before: 160 }, children: [] }));
children.push(qt('Q: You visit http://neverssl.com and type a username and password. Which part of the CIA Triad is violated? Explain in 2-3 sentences.'));
children.push(...al(4));

children.push(ss('AAA Framework'));
children.push(bt('AAA defines how we protect assets:'));
children.push(makeTable(['Function', 'Definition', 'Real-World Example'], [
  ['Authentication', 'Proving you are who you claim to be', 'Logging in with password, fingerprint, or security key'],
  ['Authorization', 'What an authenticated user is allowed to do', 'Student can view grades but cannot change them'],
  ['Accounting', 'Recording what a user did and when', 'Server log shows who logged in, when, and from where'],
], [2200, 3580, 3580]));
children.push(new Paragraph({ spacing: { before: 160 }, children: [] }));
children.push(qt('Q: On the HTTP site above, an attacker captures your traffic. Which part of AAA breaks first and why?'));
children.push(...al(4));

children.push(ss('Assets \u2014 What You Are Protecting'));
children.push(makeTable(['Category', 'Examples', 'Why It Matters'], [
  ['People & Identities', 'Employees, students, customers, accounts, credentials', 'Stolen credentials are the #1 attack vector'],
  ['Data & Devices', 'Records, laptops, servers, phones, USB drives', 'Data is the target; devices are the containers'],
  ['Applications, Networks & Services', 'Portals, email, payment systems, Wi-Fi, DNS', 'Each is an entry point an attacker can target'],
  ['Business Operations, Trust & Reputation', 'Uptime, customer confidence, regulatory compliance', 'A breach costs more than data \u2014 it costs trust'],
], [2800, 3280, 3280]));
children.push(new Paragraph({ spacing: { before: 160 }, children: [] }));
children.push(qt('Q: Pick one asset from each category. For each, name one realistic attack and one defense.'));
children.push(...al(6));

// Task 2
children.push(pb());
children.push(st('Task 2 \u2014 The Threat Landscape (Vocabulary + Threat Actors)'));
children.push(ss('Core Vocabulary'));
children.push(makeTable(['Term', 'Definition', 'Example'], [
  ['Vulnerability', 'A weakness that could be exploited', 'Unpatched server, weak password, open port'],
  ['Threat Actor', 'Someone capable of causing harm', 'Hacker, disgruntled employee, government agency'],
  ['Exploit', 'A method that takes advantage of a vulnerability', 'Script that crashes a server with malformed input'],
  ['Incident', 'Harm that actually or potentially occurs', 'Data leaked, system taken offline, credentials stolen'],
  ['Risk', 'Likelihood and impact of a threat exploiting a vulnerability', 'High likelihood + high impact = critical risk'],
], [2000, 3680, 3680]));
children.push(new Paragraph({ spacing: { before: 160 }, children: [] }));
children.push(qt('Q: For each scenario, identify the vulnerability, threat actor, exploit, and incident:'));
children.push(bt('1. A student guesses a teacher\'s password and reads exam answers.'));
children.push(...al(3));
children.push(bt('2. A company\'s website goes down for 3 hours during a product launch.'));
children.push(...al(3));
children.push(bt('3. An employee plugs in an infected USB drive and malware spreads to the file server.'));
children.push(...al(3));

children.push(ss('Threat Actors \u2014 Who Is Attacking?'));
children.push(makeTable(['Actor', 'Motivation', 'Skill Level', 'Example'], [
  ['Script Kiddies', 'Curiosity, bragging rights', 'Low', 'Teenager running a DDoS tool from a tutorial'],
  ['Hacktivists', 'Social or political cause', 'Varies', 'Anonymous defacing a government website'],
  ['Insiders', 'Malicious, negligent, or compromised', 'Varies', 'Employee leaking customer data'],
  ['Cybercriminal Groups', 'Financial gain', 'High', 'Ransomware gangs encrypting hospital systems'],
  ['State-Linked Actors', 'Espionage, long-term access', 'Very high', 'APT groups stealing defense blueprints'],
], [2000, 2400, 1800, 3160]));
children.push(new Paragraph({ spacing: { before: 160 }, children: [] }));
children.push(qt('Q: Which threat actor type is the most dangerous to a typical company, and why? Which is hardest to defend against? (3-4 sentences)'));
children.push(...al(5));

// Task 3
children.push(pb());
children.push(st('Task 3 \u2014 Legal Ethics (The Rules of the Road)'));
children.push(bt('Cybersecurity has strict rules. Breaking them \u2014 even by accident \u2014 can mean criminal charges. These four rules are non-negotiable:'));

const rules = [
  { text: 'Rule 1: No Authorization, No Testing \u2014 Never access, scan, or test a system without written permission from the owner.', color: 'C62828', fill: 'FDECEA' },
  { text: 'Rule 2: Stay in Scope \u2014 Only work within what was explicitly authorized. If you test example.com, you do not touch example.org.', color: 'E65100', fill: 'FFF3E0' },
  { text: 'Rule 3: Protect Privacy \u2014 Access to a system does not mean unrestricted use of data. Do not copy, share, or retain personal records.', color: '2E7D32', fill: 'E8F5E9' },
  { text: 'Rule 4: Document Everything \u2014 Record every action you take and preserve evidence carefully. Your documentation is your protection.', color: '1565C0', fill: 'E3F2FD' },
];
rules.forEach(r => {
  children.push(new Paragraph({
    spacing: { before: 80, after: 80 }, shading: { fill: r.fill, type: ShadingType.CLEAR },
    indent: { left: 200, right: 200 },
    children: [new TextRun({ text: r.text, font: 'Arial', size: 20, bold: true, color: r.color })]
  }));
});

children.push(qt('Q: For each scenario, identify which rule is broken and the consequence:'));
children.push(bt('1. A friend asks you to quickly check their company\'s Wi-Fi security. You run a port scan without asking their IT department.'));
children.push(...al(3));
children.push(bt('2. During an authorized test, you discover a database of customer credit cards. You save a copy for reference.'));
children.push(...al(3));
children.push(bt('3. You are authorized to test a web app, but you also probe the company\'s email server just to see.'));
children.push(...al(3));
children.push(bt('4. You perform a security test but don\'t write anything down. Two weeks later, the company asks what you did.'));
children.push(...al(3));

// ── PART B ──
children.push(pb());
children.push(banner('PART B \u2014 HANDS-ON INVESTIGATION (hardware, OS, network)'));
children.push(it('Now that you understand the concepts and rules, investigate your own machine. Reference Part A concepts where relevant.'));

// Task 4
children.push(st('Task 4 \u2014 Set Up Your Lab Environment (WSL2)'));
children.push(bt('Before investigating Linux, set up WSL2 (Windows Subsystem for Linux):'));
children.push(qt('Step 1: Open PowerShell as Administrator and run:'));
children.push(code('wsl --install'));
children.push(bt('Restart your PC when prompted. Ubuntu will finish installing.'));
children.push(qt('Step 2: Open Ubuntu from the Start menu. Create a username and password. Then run:'));
children.push(code('wsl --list --verbose'));
children.push(qt('Step 3: Update and install tools:'));
children.push(code('sudo apt update && sudo apt upgrade -y'));
children.push(code('sudo apt install -y htop net-tools dnsutils curl wget'));
children.push(new Paragraph({ spacing: { before: 80 }, children: [] }));
children.push(cb('WSL2 installed and verified (screenshot of wsl --list --verbose)'));
children.push(cb('Ubuntu running with htop, net-tools, dnsutils installed'));
children.push(cb('Screenshot of uname -a output saved'));

// Task 5
children.push(pb());
children.push(st('Task 5 \u2014 What\'s Inside Your Machine? (Hardware)'));
children.push(bt('Every attack starts with hardware. Find the following on your own machine:'));
children.push(makeTable(['Component', 'What to Find', 'How to Check'], [
  ['CPU', 'Model, cores, clock speed', 'Task Manager > Performance > CPU | lscpu'],
  ['RAM', 'Total installed, currently in use', 'Task Manager > Memory | free -h'],
  ['Storage', 'SSD or HDD? Capacity, free space', 'Task Manager > Disk | lsblk + df -h'],
  ['NIC', 'Wi-Fi or Ethernet? MAC address?', 'ipconfig /all | ip a'],
], [1800, 3580, 3980]));
children.push(new Paragraph({ spacing: { before: 120 }, children: [] }));
children.push(qt('Your findings:'));
children.push(bt('CPU: _______________________________________________'));
children.push(bt('RAM: _______ total  |  _______ in use'));
children.push(bt('Storage: _______ (SSD / HDD)  |  _______ capacity  |  _______ free'));
children.push(bt('NIC: _______ (Wi-Fi / Ethernet)  |  MAC: _______________'));
children.push(new Paragraph({ spacing: { before: 160 }, children: [] }));
children.push(qt('Q1: Is your storage SSD or HDD? Why does this matter for security?'));
children.push(...al(4));
children.push(qt('Q2: What are the top 3 memory consumers on your machine right now?'));
children.push(...al(4));
children.push(qt('Q3: Spectre/Meltdown attack CPUs via speculative execution. What is the defense?'));
children.push(...al(3));
children.push(qt('Q4: Cold boot attacks freeze RAM to read encryption keys. What defense protects data?'));
children.push(...al(3));

// Task 6
children.push(pb());
children.push(st('Task 6 \u2014 The Operating System in Action'));
children.push(ss('Part A \u2014 Processes'));
children.push(it('Open Task Manager (Windows), htop (WSL2), or Activity Monitor (macOS).'));
children.push(qt('Find your browser process:'));
children.push(bt('Process name: __________________  PID: __________  Memory: __________'));
children.push(bt('Total processes running: __________'));
children.push(bt('Unrecognized process (name + is it legitimate?): _________________________________'));
children.push(new Paragraph({ spacing: { before: 80 }, children: [] }));
children.push(cb('Browser process found and recorded'));
children.push(cb('Unrecognized process investigated'));

children.push(ss('Part B \u2014 Kernel vs User Mode'));
children.push(new Table({
  width: { size: CW, type: WidthType.DXA }, columnWidths: [4680, 4680],
  rows: [new TableRow({ children: [
    new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 2, color: 'C62828' }, bottom: { style: BorderStyle.SINGLE, size: 2, color: 'C62828' }, left: { style: BorderStyle.SINGLE, size: 2, color: 'C62828' }, right: { style: BorderStyle.SINGLE, size: 2, color: 'C62828' } },
      width: { size: 4680, type: WidthType.DXA }, shading: { fill: 'FDECEA', type: ShadingType.CLEAR }, margins: cm,
      children: [new Paragraph({ children: [new TextRun({ text: 'KERNEL MODE (Ring 0)', font: 'Arial', size: 22, bold: true, color: 'C62828' })] }),
        new Paragraph({ children: [new TextRun({ text: 'Full access to ALL hardware | Can execute ANY instruction | OS kernel runs here', font: 'Arial', size: 18 })] })] }),
    new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 2, color: '2E7D32' }, bottom: { style: BorderStyle.SINGLE, size: 2, color: '2E7D32' }, left: { style: BorderStyle.SINGLE, size: 2, color: '2E7D32' }, right: { style: BorderStyle.SINGLE, size: 2, color: '2E7D32' } },
      width: { size: 4680, type: WidthType.DXA }, shading: { fill: 'E8F5E9', type: ShadingType.CLEAR }, margins: cm,
      children: [new Paragraph({ children: [new TextRun({ text: 'USER MODE (Ring 3)', font: 'Arial', size: 22, bold: true, color: '2E7D32' })] }),
        new Paragraph({ children: [new TextRun({ text: 'Restricted access | Must use SYSTEM CALLS | Your apps run here', font: 'Arial', size: 18 })] })] }),
  ]})]
}));
children.push(new Paragraph({ spacing: { before: 80, after: 40 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: 'ATTACKER GOAL: Break from User to Kernel', font: 'Arial', size: 16, bold: true, color: 'F59E0B' })] }));
children.push(qt('Q: Your browser runs in User Mode. When it sends a network request, it makes a system call. Why is this boundary important for security?'));
children.push(...al(4));

children.push(ss('Part C \u2014 File Permissions'));
children.push(bt('In WSL2/Linux, run: ls -la ~'));
children.push(qt('What permissions do your files have? What do the rwx letters mean?'));
children.push(...al(3));
children.push(qt('What does chmod 777 mean \u2014 and why is it dangerous?'));
children.push(...al(3));
children.push(qt('Find one file with overly broad permissions. What could go wrong?'));
children.push(...al(3));

children.push(ss('Part D \u2014 Services and Ports'));
children.push(bt('In WSL2/Linux run: ss -tlnp    |    On Windows run: netstat -an | findstr LISTENING'));
children.push(makeTable(['Service', 'Port Number', 'What You Think It Does'], [
  ['', '', ''], ['', '', ''], ['', '', ''],
], [3120, 3120, 3120]));
children.push(new Paragraph({ spacing: { before: 80 }, children: [] }));
children.push(makeTable(['Port', 'Service', 'Risk if Open'], [
  ['22', 'SSH', 'Brute-force login attempts'],
  ['53', 'DNS', 'DNS spoofing / redirection'],
  ['80', 'HTTP', 'Unencrypted traffic, eavesdropping'],
  ['443', 'HTTPS', 'Generally safe (encrypted)'],
  ['3389', 'RDP', 'Remote brute-force, lateral movement'],
], [1500, 2430, 5430]));
children.push(qt('Q: Did you find any ports that concern you? Why?'));
children.push(...al(3));

// Task 7
children.push(pb());
children.push(st('Task 7 \u2014 Your Machine\'s Network Identity'));
children.push(bt('Use your OS built-in tools to find:'));
children.push(bt('IPv4 address: _______________  |  Subnet mask: _______________'));
children.push(bt('Default gateway: _______________  |  DNS server(s): _______________'));
children.push(bt('MAC address: _______________  |  Connection type: _______ (Wi-Fi / Ethernet)'));
children.push(qt('Q: Why does the DNS server choice matter? If your ISP DNS is slow or untrustworthy, what could you do?'));
children.push(...al(3));

// Task 8
children.push(st('Task 8 \u2014 Capture and Analyze Live Traffic'));
children.push(bt('Open Wireshark and capture on your active network interface. Visit one HTTP and one HTTPS site.'));
children.push(makeTable(['Question', 'HTTP Site', 'HTTPS Site'], [
  ['Website visited', '', ''], ['IP address connected to', '', ''], ['Destination port (80 or 443?)', '', ''],
  ['DNS queries before connection', '', ''], ['Could you read the request content?', '', ''], ['What was hidden / encrypted?', '', ''],
], [3120, 3120, 3120]));
children.push(new Paragraph({ spacing: { before: 80 }, children: [] }));
children.push(cb('Screenshot of HTTP traffic saved'));
children.push(cb('Screenshot of HTTPS traffic saved'));
children.push(qt('Q: On the HTTP site, if you typed a password, which part of the CIA Triad is violated?'));
children.push(...al(3));
children.push(qt('Q: Which AAA function would be exposed in the clear text?'));
children.push(...al(3));

// ── PART C ──
children.push(pb());
children.push(banner('PART C \u2014 SYNTHESIS'));

// Task 9
children.push(st('Task 9 \u2014 Security at Every Layer'));
children.push(bt('For each layer, name one realistic attack and one defense:'));
children.push(makeTable(['Layer', 'Attack', 'Defense'], [
  ['CPU', '', ''], ['RAM', '', ''], ['Storage', '', ''], ['BIOS/UEFI', '', ''],
  ['OS (Kernel)', '', ''], ['Processes', '', ''], ['Permissions', '', ''],
  ['Services/Ports', '', ''], ['Network', '', ''],
], [2400, 3480, 3480]));
children.push(qt('Q: Which layer is easiest to attack on a typical home machine? Which is hardest to defend? (2-3 sentences)'));
children.push(...al(4));

// Task 10
children.push(st('Task 10 \u2014 The Full Picture'));
children.push(bt('In 5-7 sentences, trace what happens from pressing the power button to loading a website. Narrate from what you actually saw on your own machine.'));
children.push(...al(8));

// Task 11
children.push(st('Task 11 \u2014 Reflection'));
children.push(qt('1. What surprised you most about what is actually running on your own machine?'));
children.push(...al(4));
children.push(qt('2. Which view gave deeper understanding: the Website Story (portfolio) or this investigation? Why?'));
children.push(...al(4));
children.push(qt('3. If you were a security analyst auditing this machine, what are the top 3 things you would fix first?'));
children.push(...al(5));
children.push(qt('4. How did the ethics rules (Task 3) shape what you chose to test? Which risk from Task 9 worries you most in real life?'));
children.push(...al(5));

// ── BUILD DOCUMENT ──
const doc = new Document({
  styles: { default: { document: { run: { font: 'Arial', size: 20 } } } },
  sections: [{
    properties: { page: { size: { width: PW, height: 15840 }, margin: { top: M, right: M, bottom: M, left: M } } },
    headers: { default: new Header({ children: [new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '2E75B6', space: 4 } },
      children: [new TextRun({ text: 'Week 1 Supplementary Assignment', font: 'Arial', size: 18, color: '2E75B6', bold: true }),
        new TextRun({ text: '\tPractical Cyber Security: From First Principles', font: 'Arial', size: 18, color: '888888' })],
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }]
    })] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: '2E75B6', space: 4 } },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Page ', font: 'Arial', size: 16, color: '888888' }),
        new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: '888888' })]
    })] }) },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('D:\\Pen\\cybersec-academy\\assessments\\week01-investigation-worksheet.docx', buf);
  console.log('SUCCESS: week01-investigation-worksheet.docx created (' + buf.length + ' bytes)');
});
