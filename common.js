import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, get, ref, set, push, remove, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export { get, ref, set, push, remove, onValue, runTransaction, onAuthStateChanged, signInWithEmailAndPassword, signOut };

let r = new URLSearchParams(location.search).get("room") || localStorage.getItem("room");
if (!r) r = Math.random().toString(36).slice(2, 8);
localStorage.setItem("room", r);
export const room = r;
export const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const arr = x => Object.values(x || {});
export const norm = b => ({ ...b, name: b.name || "Untitled", categories: arr(b.categories).map(c => ({ ...c, clues: arr(c.clues).map(q => ({ ...q, items: arr(q.items) })) })) });
export const worth = (c, d) => c.type === "tier" && !c.all ? Math.round(c.value * Math.max(0.1, 1 - (d ?? 10) / 100 * ((c.shown || 1) - 1))) : c.value;
