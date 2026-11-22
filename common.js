import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, get, ref, set, push, remove, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export { get, ref, set, push, remove, onValue, runTransaction, onAuthStateChanged, signInWithEmailAndPassword, signOut };

export const cleanRoom = x => String(x || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 20);
// Everyone lands in the same room: the code in the link, else the last one used, else "main".
const r = cleanRoom(new URLSearchParams(location.search).get("room") || localStorage.getItem("room")) || "main";
localStorage.setItem("room", r);
export const room = r;
export const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const arr = x => Object.values(x || {});
export const norm = b => ({ ...b, name: b.name || "Untitled", categories: arr(b.categories).map(c => ({ ...c, clues: arr(c.clues).map(q => ({ ...q, items: arr(q.items) })) })) });
export const worth = (c, d) => c.type === "tier" && !c.all ? Math.round(c.value * Math.max(0.1, 1 - (d ?? 10) / 100 * ((c.shown || 1) - 1))) : c.value;

export const audioHtml = (src, sm) => `<div class="aud${sm ? " sm" : ""}"><button class="pl" aria-label="Play"><svg viewBox="0 0 24 24"><path class="ip" d="M8 5v14l11-7z"/><path class="ia" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button><audio src="${esc(src)}" preload="auto"></audio></div>`;
export function bindAudio(root) {
  root.addEventListener("click", e => {
    const b = e.target.closest(".pl"); if (!b) return;
    const a = b.parentElement.querySelector("audio");
    if (a.paused) { root.querySelectorAll("audio").forEach(x => x !== a && x.pause()); a.play().catch(() => {}); } else a.pause();
  });
  const mark = (e, on) => e.target.closest?.(".aud")?.classList.toggle("playing", on);
  root.addEventListener("play", e => mark(e, true), true);
  root.addEventListener("pause", e => mark(e, false), true);
  root.addEventListener("ended", e => mark(e, false), true);
}
export const namesOn = b => b.levelNames ?? b.categories.some(c => c.clues.some(q => q.name));
export function tierHtml(b, used, host, lock) {
  const cols = Math.max(1, ...b.categories.map(c => c.clues.length)), cap = namesOn(b);
  return `<div class="ladder${cap ? " caps" : ""}${cols > 12 ? " dense" : ""}">` + b.categories.map((c, i) => {
    const pts = c.points ?? c.clues[0]?.value ?? 0;
    return `<div class="rung"><div class="rt"><b>${esc(c.name)}</b><span><i class="gp">+${pts}</i> / <i class="rp">−${c.penalty ?? pts}</i></span></div><div class="rn">`
      + c.clues.map((q, r) => { const k = i + "-" + r, u = used[k], t = host ? "button" : "div", lab = cap && q.name ? esc(q.name) : r + 1; return `<${t} class="node${cap ? " cap" : ""}${u ? " used" : ""}" ${host ? `data-k="${k}" ${u || lock ? "disabled" : ""}` : ""}>${u && !cap ? "✓" : lab}</${t}>`; }).join("")
      + `</div></div>`;
  }).join("") + `</div>`;
}

export const TEAM_COLORS = ["#22d3ee", "#f472b6", "#fbbf24", "#4ade80", "#a78bfa", "#fb923c", "#f87171", "#60a5fa"];
export const dot = (teams, p) => { const t = teams?.[p?.team]; return t ? `<i class="dot" style="background:${esc(t.color)}"></i>` : ""; };
