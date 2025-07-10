document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // biar nggak langsung ketutup waktu hamburger diklik
        navbar.classList.toggle('active');
    });

    // Tutup menu kalau klik di luar navbar atau hamburger
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
            navbar.classList.remove('active');
        }
    });

    // ===== MODAL LOGIC ===== //
    const modal = document.getElementById('detailModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTTL = document.getElementById('modalTTL');
    const modalJK = document.getElementById('modalJK');
    const modalAlamat = document.getElementById('modalAlamat');
    const modalMotivasi = document.getElementById('modalMotivasi');
    const modalSosmed = document.getElementById('modalSosmed');
    const modalContent = document.querySelector('.modal-content');

    document.querySelectorAll('.anggota-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const ttl = card.dataset.ttl || "-";
        const jk = card.dataset.gender || "-";
        const alamat = card.dataset.alamat || "-";
        const motivasi = card.dataset.motivasi || "-";
        const ig = card.dataset.ig || "#";
        const tiktok = card.dataset.tiktok || "#";

        modalImg.src = img;
        modalTitle.textContent = title;
        modalTTL.textContent = `Tempat, Tanggal Lahir : ${ttl}`;
        modalJK.textContent = `Jenis Kelamin : ${jk}`;
        modalAlamat.textContent = `Alamat : ${alamat}`;
        modalMotivasi.textContent = `Motivasi : ${motivasi}`;
        let sosmedHTML = "";
        if (ig.trim() !== "" && ig !== "#") {
          sosmedHTML += `<a href="${ig}" target="_blank"><ion-icon name="logo-instagram"></ion-icon></a>`;
        }
        modalSosmed.innerHTML = sosmedHTML;

        //cegah bug//
        modalSosmed.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => e.stopPropagation());
        });


        modal.classList.add('active');
        modalContent.style.animation = 'growFromCenter 0.5s ease forwards';
      });
    });

    // Tutup modal jika klik di mana pun dalam modal (luar/dalam)
    modal.addEventListener('click', (e) => {
      modalContent.style.animation = 'shrinkToCenter 0.4s ease forwards';
      setTimeout(() => {
        modal.classList.remove('active');
      }, 400);
    });
});


//Khusus Galeri//
document.addEventListener("DOMContentLoaded", () => {
  const galeriModal = document.getElementById("modal-galeri");
  const galeriImg = document.getElementById("modal-galeri-img");
  const galeriClose = galeriModal.querySelector(".galeri-close");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const allImages = Array.from(document.querySelectorAll(".foto-item img"));
  let currentIndex = 0;

  function showModal(index) {
    currentIndex = index;
    galeriImg.src = allImages[index].src;
    galeriModal.style.display = "flex";
  }

  allImages.forEach((img, i) => {
    img.addEventListener("click", () => {
      showModal(i);
    });
  });

  galeriClose.addEventListener("click", () => {
    galeriModal.style.display = "none";
  });

  galeriModal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-galeri-content")) {
      galeriModal.style.display = "none";
    }
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // cegah modal tertutup
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    galeriImg.src = allImages[currentIndex].src;
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % allImages.length;
    galeriImg.src = allImages[currentIndex].src;
  });
});


