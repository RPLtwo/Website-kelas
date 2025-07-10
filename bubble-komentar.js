// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4_Z2C3Ett321KHAVv8qn7iSDeMzRIMrE",
  authDomain: "rpl2komentar.firebaseapp.com",
  databaseURL: "https://rpl2komentar-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rpl2komentar",
  storageBucket: "rpl2komentar.appspot.com",
  messagingSenderId: "868653512652",
  appId: "1:868653512652:web:e60497696a04d0c784cf69"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const chatRef = ref(database, "komentar");

// Toggle tampilan bubble chat
const toggleBtn = document.getElementById("toggle-chat");
const chatBox = document.getElementById("chat-box");
toggleBtn.addEventListener("click", () => {
  chatBox.classList.toggle("active");
});



// Fungsi mengubah timestamp ke format waktu
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Tampilkan pesan ke HTML
function tampilkanPesan(data) {
  const pesan = data.val();
  const pesanEl = document.createElement("div");
  pesanEl.classList.add("chat-bubble");

  pesanEl.innerHTML = `
    <div class="chat-header">
      <span class="chat-name">${pesan.nama} <span class="user-tag">(user)</span></span>
      <span class="chat-time">${formatTime(pesan.waktu)}</span>
    </div>
    <div class="chat-text">${pesan.komentar}</div>
  `;

  document.getElementById("chat-messages").appendChild(pesanEl);
  document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
}

// Kirim komentar
document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("chat-name").value.trim();
  const komentar = document.getElementById("chat-input").value.trim();
  if (nama && komentar) {
    push(chatRef, {
      nama,
      komentar,
      waktu: Date.now()
    });
    document.getElementById("chat-input").value = "";
  }
});

// Ambil komentar real-time
onChildAdded(chatRef, tampilkanPesan);

// === Fitur klik di luar chatBox untuk menutup chat ===
document.addEventListener("click", function (e) {
  const isClickInside = chatBox.contains(e.target);
  const isButton = toggleBtn.contains(e.target);

  if (!isClickInside && !isButton) {
    chatBox.classList.remove("active");
    toggleBtn.style.display = "block";
  }
});

// Saat toggle diklik → munculkan chat dan sembunyikan tombol
toggleBtn.addEventListener("click", () => {
  chatBox.classList.add("active");
  toggleBtn.style.display = "none";
});

