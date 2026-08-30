import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo-horizontal.png.asset.json";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  HeartPulse,
  Mic,
  MicOff,
  Paperclip,
  Phone,
  PhoneOff,
  Pill,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Stethoscope,
  User,
  Video,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/doctor")({
  component: DoctorDashboard,
  head: () => ({
    meta: [
      { title: "Doctor Console — MediSwift Teleconsultation Dashboard" },
      {
        name: "description",
        content:
          "Consult patients over chat or call, review prescriptions and medical history, approve or reject prescriptions and add medicines to the patient's cart.",
      },
      { property: "og:title", content: "Doctor Console — MediSwift" },
      {
        property: "og:description",
        content:
          "Teleconsultation workspace for doctors: chat, calls, prescriptions and patient history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type RxStatus = "pending" | "approved" | "rejected";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  area: string;
  reason: string;
  waiting: string;
  unread: number;
  rxStatus: RxStatus;
  vitals: { bp: string; pulse: string; sugar: string; weight: string };
  conditions: string[];
  allergies: string[];
  history: { date: string; note: string; doctor: string }[];
  rx: { file: string; uploaded: string; medicines: string[] };
};

const patientsSeed: Patient[] = [
  {
    id: "P-1042",
    name: "Rhea Shah",
    age: 29,
    gender: "Female",
    area: "Thaltej, Ahmedabad",
    reason: "Fever & sore throat",
    waiting: "2 min",
    unread: 2,
    rxStatus: "pending",
    vitals: { bp: "118/78", pulse: "88 bpm", sugar: "96 mg/dL", weight: "58 kg" },
    conditions: ["Seasonal allergy"],
    allergies: ["Sulfa drugs"],
    history: [
      { date: "12 Jun 2026", note: "Acute pharyngitis — 5 day antibiotic course", doctor: "Dr. Mehta" },
      { date: "04 Mar 2026", note: "Routine CBC, all values normal", doctor: "Dr. Iyer" },
    ],
    rx: {
      file: "rhea-rx-aug17.pdf",
      uploaded: "Today, 10:42 AM",
      medicines: ["Azithral 500 — 1-0-0 × 3 days", "Dolo 650 — SOS", "Betadine Gargle — twice daily"],
    },
  },
  {
    id: "P-1039",
    name: "Kunal Patel",
    age: 41,
    gender: "Male",
    area: "Bodakdev, Ahmedabad",
    reason: "BP follow-up",
    waiting: "6 min",
    unread: 0,
    rxStatus: "pending",
    vitals: { bp: "146/94", pulse: "76 bpm", sugar: "112 mg/dL", weight: "82 kg" },
    conditions: ["Hypertension", "Hyperlipidemia"],
    allergies: ["None reported"],
    history: [
      { date: "20 Jul 2026", note: "Telmisartan 40 dose continued", doctor: "Dr. Rao" },
      { date: "18 Jan 2026", note: "Lipid profile — LDL slightly elevated", doctor: "Dr. Rao" },
    ],
    rx: {
      file: "kunal-rx-aug16.jpg",
      uploaded: "Yesterday, 7:15 PM",
      medicines: ["Telma 40 — 1-0-0 daily", "Ecosprin 75 — 0-1-0"],
    },
  },
  {
    id: "P-1035",
    name: "Meera Joshi",
    age: 63,
    gender: "Female",
    area: "Vastrapur, Ahmedabad",
    reason: "Knee pain review",
    waiting: "11 min",
    unread: 1,
    rxStatus: "approved",
    vitals: { bp: "128/82", pulse: "72 bpm", sugar: "134 mg/dL", weight: "68 kg" },
    conditions: ["Osteoarthritis", "Type 2 Diabetes"],
    allergies: ["Penicillin"],
    history: [
      { date: "02 Aug 2026", note: "Physiotherapy advised, 6 weeks", doctor: "Dr. Shah" },
      { date: "15 May 2026", note: "HbA1c 7.1 — metformin titrated", doctor: "Dr. Shah" },
    ],
    rx: {
      file: "meera-rx-aug10.pdf",
      uploaded: "10 Aug 2026",
      medicines: ["Shelcal 500 — 1-0-0", "Metformin 500 — 1-0-1"],
    },
  },
  {
    id: "P-1031",
    name: "Aditya Nair",
    age: 34,
    gender: "Male",
    area: "Makarba, Ahmedabad",
    reason: "Skin rash",
    waiting: "18 min",
    unread: 0,
    rxStatus: "rejected",
    vitals: { bp: "122/80", pulse: "80 bpm", sugar: "90 mg/dL", weight: "74 kg" },
    conditions: ["Eczema"],
    allergies: ["Dust"],
    history: [{ date: "28 Jul 2026", note: "Topical steroid, 10 days", doctor: "Dr. Bose" }],
    rx: { file: "aditya-rx-aug09.png", uploaded: "09 Aug 2026", medicines: ["Candid B cream"] },
  },
];

const catalogue = [
  { name: "Dolo 650 Tablet", pack: "Strip of 15", price: 32 },
  { name: "Azithral 500 Tablet", pack: "Strip of 5", price: 118 },
  { name: "Betadine Gargle", pack: "100 ml", price: 96 },
  { name: "Shelcal 500 Tablet", pack: "Strip of 15", price: 148 },
  { name: "Telma 40 Tablet", pack: "Strip of 15", price: 156 },
  { name: "Accu-Chek Test Strips", pack: "50 strips", price: 940 },
];

type Msg = { from: "doctor" | "patient"; text: string; time: string };

const chatSeed: Record<string, Msg[]> = {
  "P-1042": [
    { from: "patient", text: "Hello doctor, I have had fever since last night.", time: "10:40" },
    { from: "patient", text: "I've uploaded my prescription from last month.", time: "10:42" },
  ],
  "P-1039": [{ from: "patient", text: "Sharing my latest BP readings.", time: "09:12" }],
  "P-1035": [{ from: "patient", text: "Knee pain is better after physio.", time: "08:55" }],
  "P-1031": [],
};

function DoctorDashboard() {
  const [patients, setPatients] = React.useState(patientsSeed);
  const [activeId, setActiveId] = React.useState(patientsSeed[0].id);
  const [query, setQuery] = React.useState("");
  const [mode, setMode] = React.useState<"chat" | "call">("chat");
  const [muted, setMuted] = React.useState(false);
  const [chats, setChats] = React.useState(chatSeed);
  const [draft, setDraft] = React.useState("");
  const [cart, setCart] = React.useState<string[]>([]);
  const [panel, setPanel] = React.useState<"rx" | "history" | "products">("rx");

  const active = patients.find((p) => p.id === activeId)!;
  const messages = chats[activeId] ?? [];

  const filtered = patients.filter((p) =>
    (p.name + p.reason + p.id).toLowerCase().includes(query.toLowerCase()),
  );

  const setRx = (status: RxStatus) =>
    setPatients((prev) => prev.map((p) => (p.id === activeId ? { ...p, rxStatus: status } : p)));

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
    setChats((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), { from: "doctor", text, time }] }));
    setDraft("");
  };

  return (
    <div className="min-h-screen bg-page">
      {/* Slim top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1536px] items-center gap-3 px-4 py-2.5 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-[12px] text-ink-soft hover:text-brand">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Store</span>
          </Link>
          <img src={logo.url} alt="MediSwift" className="h-9 w-auto max-w-[150px] object-contain" />
          <span className="hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-ink-soft sm:flex">
            <Stethoscope className="h-3.5 w-3.5 text-brand" /> Doctor Console
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-[11px] font-medium text-ink-soft md:flex">
              <span className="h-2 w-2 rounded-full bg-chart-2" /> Available for consults
            </span>
            <div className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-[11px] font-semibold text-brand">
                DR
              </span>
              <div className="leading-tight">
                <p className="text-[11px] font-medium text-ink">Dr. Ananya Rao</p>
                <p className="text-[10px] text-ink-soft">General Physician</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1536px] gap-4 px-4 py-4 lg:grid-cols-[260px_minmax(0,1fr)_320px] lg:px-8">
        {/* Queue */}
        <aside className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-3">
            <p className="text-[12px] font-semibold text-ink">Patient Queue</p>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-ink-soft" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search patient"
                className="w-full bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-soft/70"
              />
            </div>
          </div>
          <ul className="max-h-[62vh] divide-y divide-border overflow-y-auto">
            {filtered.map((p) => {
              const isActive = p.id === activeId;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => setActiveId(p.id)}
                    className={`flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors ${
                      isActive ? "bg-brand-soft/70" : "hover:bg-brand-soft/40"
                    }`}
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-semibold text-brand">
                      {p.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[12px] font-medium text-ink">{p.name}</span>
                        <span className="text-[10px] text-ink-soft">{p.waiting}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-ink-soft">{p.reason}</span>
                      <span className="mt-1 flex items-center gap-1.5">
                        <RxBadge status={p.rxStatus} />
                        {p.unread > 0 && (
                          <span className="rounded-full bg-brand px-1.5 text-[10px] font-semibold text-brand-foreground">
                            {p.unread}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-[11px] text-ink-soft">No patients found.</li>
            )}
          </ul>
        </aside>

        {/* Consultation */}
        <section className="flex min-h-[70vh] flex-col rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-[12px] font-semibold text-brand">
              {active.name.split(" ").map((n) => n[0]).join("")}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-ink">{active.name}</p>
              <p className="text-[11px] text-ink-soft">
                {active.age} yrs · {active.gender} · {active.id}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1 rounded-full border border-border p-1">
              <button
                onClick={() => setMode("chat")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  mode === "chat" ? "gradient-brand text-brand-foreground" : "text-ink-soft hover:text-brand"
                }`}
              >
                <Send className="h-3.5 w-3.5" /> Chat
              </button>
              <button
                onClick={() => setMode("call")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  mode === "call" ? "gradient-brand text-brand-foreground" : "text-ink-soft hover:text-brand"
                }`}
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </button>
            </div>
          </div>

          {/* Vitals strip */}
          <div className="grid grid-cols-2 gap-2 border-b border-border px-4 py-3 sm:grid-cols-4">
            {[
              { label: "Blood Pressure", value: active.vitals.bp },
              { label: "Pulse", value: active.vitals.pulse },
              { label: "Blood Sugar", value: active.vitals.sugar },
              { label: "Weight", value: active.vitals.weight },
            ].map((v) => (
              <div key={v.label} className="rounded-lg bg-page px-3 py-2">
                <p className="text-[10px] uppercase tracking-wide text-ink-soft">{v.label}</p>
                <p className="mt-0.5 text-[13px] font-semibold text-ink">{v.value}</p>
              </div>
            ))}
          </div>

          {mode === "chat" ? (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.length === 0 && (
                  <p className="mt-8 text-center text-[11px] text-ink-soft">
                    No messages yet — start the consultation.
                  </p>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "doctor" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[12px] leading-relaxed ${
                        m.from === "doctor"
                          ? "gradient-brand text-brand-foreground"
                          : "bg-page text-ink"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p
                        className={`mt-1 text-[10px] ${
                          m.from === "doctor" ? "text-brand-foreground/70" : "text-ink-soft"
                        }`}
                      >
                        {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-4 py-3">
                <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
                  <button aria-label="Attach report" className="text-ink-soft hover:text-brand">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder={`Message ${active.name.split(" ")[0]}…`}
                    className="w-full bg-transparent py-1 text-[12px] text-ink outline-none placeholder:text-ink-soft/70"
                  />
                  <button
                    onClick={send}
                    aria-label="Send message"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full gradient-brand text-brand-foreground shadow-pill"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-10">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-brand-soft text-[20px] font-semibold text-brand">
                {active.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div className="text-center">
                <p className="text-[15px] font-semibold text-ink">Calling {active.name}…</p>
                <p className="mt-1 text-[11px] text-ink-soft">Secure voice consultation · 00:14</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink-soft hover:text-brand"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
                <button
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink-soft hover:text-brand"
                  aria-label="Switch to video"
                >
                  <Video className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setMode("chat")}
                  className="grid h-11 w-11 place-items-center rounded-full bg-destructive text-destructive-foreground"
                  aria-label="End call"
                >
                  <PhoneOff className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Right panel */}
        <aside className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center gap-1 border-b border-border p-1.5">
              {[
                { key: "rx" as const, label: "Prescription", Icon: FileText },
                { key: "history" as const, label: "History", Icon: ClipboardList },
                { key: "products" as const, label: "Products", Icon: Pill },
              ].map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setPanel(key)}
                  className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors ${
                    panel === key ? "bg-brand-soft text-brand" : "text-ink-soft hover:text-brand"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" /> {label}
                </button>
              ))}
            </div>

            <div className="p-3.5">
              {panel === "rx" && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 rounded-lg bg-page p-2.5">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-medium text-ink">{active.rx.file}</p>
                      <p className="text-[10px] text-ink-soft">Uploaded {active.rx.uploaded}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-ink">Prescribed medicines</p>
                    <ul className="mt-1.5 space-y-1.5">
                      {active.rx.medicines.map((m) => (
                        <li key={m} className="flex items-start gap-1.5 text-[11px] text-ink-soft">
                          <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-brand" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border px-2.5 py-2">
                    <span className="text-[11px] text-ink-soft">Status</span>
                    <RxBadge status={active.rxStatus} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRx("approved")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => setRx("rejected")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[12px] font-medium text-ink-soft hover:border-destructive hover:text-destructive"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                </div>
              )}

              {panel === "history" && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 rounded-lg bg-page p-2.5">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <div className="min-w-0 text-[11px] text-ink-soft">
                      <p className="text-[12px] font-medium text-ink">{active.name}</p>
                      <p>
                        {active.age} yrs · {active.gender}
                      </p>
                      <p className="truncate">{active.area}</p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <InfoRow label="Conditions" values={active.conditions} />
                    <InfoRow label="Allergies" values={active.allergies} />
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
                      <HeartPulse className="h-3.5 w-3.5 text-brand" /> Medical history
                    </p>
                    <ol className="mt-2 space-y-2.5 border-l border-border pl-3">
                      {active.history.map((h) => (
                        <li key={h.date} className="relative">
                          <span className="absolute -left-[17px] top-1.5 h-2 w-2 rounded-full bg-brand" />
                          <p className="text-[11px] font-medium text-ink">{h.note}</p>
                          <p className="text-[10px] text-ink-soft">
                            {h.date} · {h.doctor}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {panel === "products" && (
                <div className="space-y-3">
                  <p className="text-[11px] text-ink-soft">
                    Add recommended products to {active.name.split(" ")[0]}'s cart.
                  </p>
                  <ul className="space-y-2">
                    {catalogue.map((c) => {
                      const added = cart.includes(c.name);
                      return (
                        <li
                          key={c.name}
                          className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-2"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11.5px] font-medium text-ink">{c.name}</p>
                            <p className="text-[10px] text-ink-soft">
                              {c.pack} · ₹{c.price}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setCart((prev) =>
                                added ? prev.filter((n) => n !== c.name) : [...prev, c.name],
                              )
                            }
                            className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                              added
                                ? "bg-brand-soft text-brand"
                                : "gradient-brand text-brand-foreground shadow-pill"
                            }`}
                          >
                            {added ? <CheckCircle2 className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                            {added ? "Added" : "Add"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex items-center justify-between rounded-lg bg-page px-2.5 py-2 text-[11px]">
                    <span className="flex items-center gap-1.5 text-ink-soft">
                      <ShoppingBag className="h-3.5 w-3.5 text-brand" /> In patient cart
                    </span>
                    <span className="font-semibold text-ink">{cart.length} items</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="rounded-lg border border-border px-2.5 py-2">
      <p className="text-[10px] uppercase tracking-wide text-ink-soft">{label}</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {values.map((v) => (
          <span key={v} className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-medium text-brand">
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

function RxBadge({ status }: { status: RxStatus }) {
  const map = {
    pending: { label: "Rx pending", cls: "bg-chart-4/20 text-ink" },
    approved: { label: "Rx approved", cls: "bg-chart-2/20 text-ink" },
    rejected: { label: "Rx rejected", cls: "bg-destructive/15 text-destructive" },
  }[status];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${map.cls}`}>{map.label}</span>
  );
}
