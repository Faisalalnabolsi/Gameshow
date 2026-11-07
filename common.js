import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, push, remove, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export { ref, set, push, remove, onValue, runTransaction, onAuthStateChanged, signInWithEmailAndPassword, signOut };

let r = new URLSearchParams(location.search).get("room") || localStorage.getItem("room");
if (!r) r = Math.random().toString(36).slice(2, 8);
localStorage.setItem("room", r);
export const room = r;
export const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const arr = x => Object.values(x || {});
export const norm = b => ({ ...b, name: b.name || "Untitled", categories: arr(b.categories).map(c => ({ ...c, clues: arr(c.clues) })) });
