export interface Topic {
  label: string;
  keywords: string[];
}

export const TOPICS: Topic[] = [
  { label: "Offensive Security", keywords: ["pentrix", "web security", "ctf", "exploit"] },
  { label: "Web Security", keywords: ["web security", "pentrix"] },
  { label: "AI Security", keywords: ["agentarsenal", "ai tooling", "agents"] },
  { label: "Network Security", keywords: ["network", "networking", "wireshark", "nmap"] },
  { label: "Linux", keywords: ["linux", "bandit", "bash"] },
  { label: "Reverse Engineering", keywords: ["reverse", "apk", "android", "axml", "decompile"] },
  { label: "Malware Analysis", keywords: ["malware", "apk", "android", "frida"] },
  { label: "DevSecOps", keywords: ["devsecops", "pipeline", "ci"] },
  { label: "Software Engineering", keywords: ["powershell", "typescript", "nextjs", "engineering", "renderer"] },
  { label: "Automation", keywords: ["automation", "scripts", "manifest", "installer"] },
  { label: "CTFs", keywords: ["ctf", "pentrix", "flags", "picoctf"] },
  { label: "Technology", keywords: [] },
];

export function topicMatchesTopicParam(
  topicLabel: string,
  haystack: string,
): boolean {
  const topic = TOPICS.find((entry) => entry.label === topicLabel);
  if (!topic) {
    return false;
  }
  if (topic.keywords.length === 0) {
    return true;
  }
  const lower = haystack.toLowerCase();
  return topic.keywords.some((keyword) => lower.includes(keyword));
}
