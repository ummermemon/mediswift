import * as React from "react";
import { Search, type LucideIcon } from "lucide-react";

export function PageHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>
        <h1 className="mt-1 text-[22px] font-semibold tracking-tight text-ink">{title}</h1>
        <p className="mt-1 text-[12px] text-ink-soft">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-card p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
          {subtitle && <p className="mt-0.5 text-[11px] text-ink-soft">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "approved" || status === "active"
      ? "bg-chart-2/15 text-chart-2"
      : status === "rejected" || status === "suspended"
        ? "bg-destructive/10 text-destructive"
        : "bg-chart-4/15 text-ink";

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold capitalize ${statusClass}`}
    >
      {status}
    </span>
  );
}

export function Toolbar({
  query,
  setQuery,
  placeholder,
  action,
}: {
  query: string;
  setQuery: (value: string) => void;
  placeholder: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2 focus-within:border-brand">
        <Search className="h-3.5 w-3.5 text-ink-soft" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-soft/70"
        />
      </div>
      {action}
    </div>
  );
}

export function ActionRow({
  Icon,
  title,
  detail,
  action,
  onClick,
}: {
  Icon: LucideIcon;
  title: string;
  detail: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-soft text-brand">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[11px] text-ink-soft">{detail}</p>
      </div>
      <button
        onClick={onClick}
        className="shrink-0 text-[11px] font-medium text-brand hover:text-brand-dark"
      >
        {action}
      </button>
    </div>
  );
}

export function ActivityLine({
  color,
  title,
  detail,
  time,
}: {
  color: string;
  title: string;
  detail: string;
  time: string;
}) {
  return (
    <div className="flex gap-3">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color}`} />
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[11px] text-ink-soft">{detail}</p>
      </div>
      <time className="shrink-0 text-[10px] text-ink-soft">{time}</time>
    </div>
  );
}
