import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronRight as Caret,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import certificates from "../data/certificates.json";
import credential from "../data/credential_data.json";

export default function Dashboard() {
  const [tab, setTab] = useState("ifc"); // "ifc" | "verified"
  const [certPage, setCertPage] = useState(1);

  const certPages = 6;

  const buildingTree = useMemo(
    () => [
      { label: "Walls", count: 204, open: false, children: [] },
      { label: "Windows", count: 124, open: false, children: [] },
      {
        label: "Roofs",
        count: 0,
        open: true,
        children: [
          { label: "Rafters", count: 36 },
          { label: "Ridge boards", count: 2 },
          { label: "Roof slabs", count: 4 },
        ],
      },
    ],
    []
  );

  return (
    <div className="h-screen w-screen bg-slate-100 overflow-hidden">
      <div className="flex h-full">
        <Sidebar active="Dashboard" />

        <div className="flex-1 flex flex-col min-w-0">
          <Header userName="JOHN SMITH" initials="JS" />

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-[1400px] mx-auto">
              {/* Project selector */}
              <div className="flex items-center justify-between mb-4">
                <ProjectSelector />
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">
                    HOSPITAL REAL, GRANADA
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <Tabs tab={tab} setTab={setTab} />

              {/* Content */}
              {tab === "ifc" ? (
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 mt-5">
                  <Card className="p-0 overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                      <div className="text-xs font-semibold tracking-wide text-slate-500">
                        IFC MODEL
                      </div>
                    </div>
                    <div className="p-6">
                      <ModelPlaceholder />
                    </div>
                  </Card>

                  <div className="space-y-6">
                    <Card className="p-5">
                      <div className="text-sm font-semibold text-slate-700 mb-3">
                        BUILDING COMPONENTS
                      </div>
                      <div className="space-y-2">
                        {buildingTree.map((node) => (
                          <TreeNode key={node.label} node={node} />
                        ))}
                      </div>
                    </Card>

                    <Card className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-semibold text-slate-700">
                          BUILDING CERTIFICATES
                        </div>
                        <div className="text-xs text-slate-400">1–5 of 10</div>
                      </div>

                      <div className="space-y-4 text-sm">
                        <SectionTitle title="Energy and Sustainability" />
                        <div className="space-y-1 text-slate-600">
                          <div>Energy Performance certificate (EPC)</div>
                          <div>LEED Certification</div>
                        </div>

                        <SectionTitle title="Safety" />
                        <div className="space-y-1 text-slate-600">
                          <div>Fire Safety Certificate</div>
                          <div>Seismic Safety Certificate</div>
                          <div>Electrical Safety Certificate</div>
                        </div>

                        <SectionTitle title="Environment" />
                        <div className="space-y-1 text-slate-600">
                          <div>Indoor Air Quality Certificate</div>
                          <div>Noise/Acoustic certificate</div>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-center gap-2">
                        <IconBtn
                          ariaLabel="prev page"
                          onClick={() => setCertPage((p) => Math.max(1, p - 1))}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </IconBtn>

                        {Array.from({ length: certPages }).map((_, i) => {
                          const n = i + 1;
                          const active = n === certPage;
                          return (
                            <button
                              key={n}
                              onClick={() => setCertPage(n)}
                              className={[
                                "h-8 w-8 rounded-md text-sm border transition",
                                active
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
                              ].join(" ")}
                            >
                              {n}
                            </button>
                          );
                        })}

                        <IconBtn
                          ariaLabel="next page"
                          onClick={() =>
                            setCertPage((p) => Math.min(certPages, p + 1))
                          }
                        >
                          <ChevronRight className="h-4 w-4" />
                        </IconBtn>
                      </div>
                    </Card>

                    <Card className="p-5">
                      <div className="text-sm font-semibold text-slate-700 mb-4">
                        BIM MODEL
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <PrimaryPill>BIM MODEL</PrimaryPill>
                        <PrimaryPill>TRACK PROGRESS</PrimaryPill>
                        <PrimaryPill>MANAGE IFC FILE</PrimaryPill>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 mt-5">
                  {/* Credential */}
                  <Card className="p-5">
                    <div className="text-sm font-semibold text-slate-700 mb-4">
                      VERIFIABLE CREDENTIAL
                    </div>

                    <div className="space-y-4 text-sm text-slate-600">
                      <div className="space-y-1">
                        <Row label="Building" value={credential.building} />
                        <Row label="Type" value={credential.type} />
                        <Row label="Location" value={credential.location} />
                        <Row
                          label="Construction year"
                          value={String(credential.constructionYear)}
                        />
                        <Row
                          label="Renovation year"
                          value={String(credential.renovationYear)}
                        />
                        <Row label="Storeys" value={String(credential.storeys)} />
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <Row
                          label="Stage of Assessment"
                          value={credential.stageOfAssessment}
                        />
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <div className="font-semibold text-slate-700 mb-2">
                          DIDs
                        </div>
                        <Row label="Issuer" value={credential.dids.issuer} />
                        <Row label="Subject" value={credential.dids.subject} />
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <div className="font-semibold text-slate-700 mb-2">
                          BREEAM Rating
                        </div>
                        <Row
                          label="Rating achieved"
                          value={credential.breeam.ratingAchieved}
                        />
                        <Row label="Final score" value={credential.breeam.finalScore} />
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <MiniTable rows={credential.breeam.categories} />
                      </div>

                      <div className="pt-4 flex items-center justify-end gap-3">
                        <ActionBtn variant="success">RESOLVE</ActionBtn>
                        <ActionBtn variant="success">UPDATE</ActionBtn>
                        <ActionBtn variant="danger">REVOKE</ActionBtn>
                      </div>
                    </div>
                  </Card>

                  {/* Certificates */}
                  <Card className="p-0 overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                      <div className="text-sm font-semibold text-slate-700">
                        BUILDING CERTIFICATES
                      </div>
                    </div>

                    <div className="max-h-[720px] overflow-auto p-5 space-y-4 text-sm">
                      {certificates.map((c) => (
                        <CertItem
                          key={c.title}
                          title={c.title}
                          status={c.status}
                          issuedBy={c.issuedBy}
                          expiry={c.expiry}
                          highlighted={!!c.highlighted}
                        />
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Small components ----------------------------- */

function ProjectSelector() {
  return (
    <button className="flex items-center gap-2 text-sm font-medium text-emerald-700">
      <span>HOSPITAL REAL, GRANADA</span>
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

function Tabs({ tab, setTab }) {
  return (
    <div className="flex items-end gap-8 border-b border-slate-200">
      <TabButton active={tab === "ifc"} onClick={() => setTab("ifc")}>
        IFC MODEL
      </TabButton>
      <TabButton active={tab === "verified"} onClick={() => setTab("verified")}>
        VERIFIED DOCUMENTS
      </TabButton>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        "py-3 text-xs tracking-[0.18em] font-semibold transition",
        active ? "text-indigo-700 border-b-2 border-indigo-700" : "text-slate-400",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Card({ className = "", children }) {
  return (
    <section
      className={["bg-white rounded-2xl shadow-sm border border-slate-200", className].join(" ")}
    >
      {children}
    </section>
  );
}

function ModelPlaceholder() {
  return (
    <div className="h-[520px] rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
      <div className="text-slate-400 text-sm">3D Model Viewer Placeholder</div>
    </div>
  );
}

function SectionTitle({ title }) {
  return <div className="text-emerald-700 font-semibold">{title}</div>;
}

function IconBtn({ children, onClick, ariaLabel }) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="h-8 w-8 rounded-md bg-white border border-slate-200 grid place-items-center hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

function PrimaryPill({ children }) {
  return (
    <button className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-sm hover:brightness-95 transition">
      {children}
    </button>
  );
}

function TreeNode({ node }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-emerald-700">
        <Caret className={["h-4 w-4", node.open ? "opacity-40" : "opacity-60"].join(" ")} />
        <span className="font-medium">{node.label} :</span>
        {!!node.count && <span className="text-emerald-700/80">{node.count} items</span>}
      </div>

      {hasChildren && node.open && (
        <div className="ml-6 mt-2 space-y-2">
          {node.children.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-sm text-emerald-700/90">
              <Caret className="h-4 w-4 opacity-50" />
              <span>{c.label} :</span>
              <span className="opacity-80">{c.count} items</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      <span className="font-semibold text-slate-700">{label}:</span>
      <span className="break-all">{value}</span>
    </div>
  );
}

function MiniTable({ rows }) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-[1fr_140px] bg-slate-50 text-xs font-semibold text-slate-500 px-4 py-3">
        <div>BREEAM CATEGORY</div>
        <div className="text-right">SCORE (%)</div>
      </div>

      <div className="divide-y divide-slate-200">
        {rows.map((r) => (
          <div key={r.category} className="grid grid-cols-[1fr_140px] px-4 py-3 text-sm">
            <div className="text-emerald-700 font-medium">{r.category}</div>
            <div className="text-right text-slate-600">{r.score}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 px-4 py-2 text-xs text-slate-500 bg-white">
        <span>Rows per page:</span>
        <span className="font-medium">5</span>
        <span className="mx-2">·</span>
        <span>1–5 of 10</span>
        <button className="ml-2 p-1 rounded hover:bg-slate-50">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="p-1 rounded hover:bg-slate-50">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ActionBtn({ variant, children }) {
  const cls =
    variant === "success" ? "bg-emerald-600 hover:brightness-95" : "bg-red-600 hover:brightness-95";
  return (
    <button className={["px-6 py-3 rounded-xl text-white font-semibold shadow-sm transition", cls].join(" ")}>
      {children}
    </button>
  );
}

function CertItem({ title, status, issuedBy, expiry, highlighted }) {
  return (
    <div className={["rounded-xl border border-slate-200 p-4", highlighted ? "bg-slate-50" : "bg-white"].join(" ")}>
      <div className="font-semibold text-slate-800">{title}</div>
      <div className="mt-2 space-y-1 text-slate-600">
        <div>
          <span className="font-semibold text-slate-700">Status:</span> {status}
        </div>
        <div>
          <span className="font-semibold text-slate-700">Issued By:</span> {issuedBy}
        </div>
        <div>
          <span className="font-semibold text-slate-700">Expiry:</span> {expiry}
        </div>
      </div>
    </div>
  );
}
