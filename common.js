import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, push, remove, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./config.js";

export const db = getDatabase(initializeApp(firebaseConfig));
export { ref, set, push, remove, onValue, runTransaction };

let r = new URLSearchParams(location.search).get("room") || localStorage.getItem("room");
if (!r) r = Math.random().toString(36).slice(2, 8);
localStorage.setItem("room", r);
export const room = r;
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
