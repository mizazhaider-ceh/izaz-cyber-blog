import {
  AlertCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  Scale,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

type CalloutType =
  | "NOTE"
  | "TIP"
  | "WARNING"
  | "IMPORTANT"
  | "SECURITY FINDING"
  | "MITIGATION"
  | "ETHICAL CONSIDERATION";

interface CalloutStyle {
  icon: LucideIcon;
  borderClass: string;
  textClass: string;
  label: string;
}

const STYLES: Record<CalloutType, CalloutStyle> = {
  NOTE: { icon: Info, borderClass: "border-secondary", textClass: "text-secondary", label: "Note" },
  TIP: { icon: Lightbulb, borderClass: "border-success", textClass: "text-success", label: "Tip" },
  WARNING: { icon: AlertTriangle, borderClass: "border-warning", textClass: "text-warning", label: "Warning" },
  IMPORTANT: { icon: AlertCircle, borderClass: "border-primary", textClass: "text-primary", label: "Important" },
  "SECURITY FINDING": { icon: ShieldAlert, borderClass: "border-research", textClass: "text-research", label: "Security finding" },
  MITIGATION: { icon: ShieldCheck, borderClass: "border-success", textClass: "text-success", label: "Mitigation" },
  "ETHICAL CONSIDERATION": { icon: Scale, borderClass: "border-secondary", textClass: "text-secondary", label: "Ethical consideration" },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "NOTE", title, children }: CalloutProps) {
  const style = STYLES[type];
  const Icon = style.icon;
  return (
    <aside
      className={`my-8 rounded-lg border border-border border-l-4 ${style.borderClass} bg-surface px-6 py-4`}
    >
      <p className={`flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest ${style.textClass}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
        {title ?? style.label}
      </p>
      <div className="mt-2 text-base leading-7 text-text-secondary">{children}</div>
    </aside>
  );
}
