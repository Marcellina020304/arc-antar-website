// ============================
// MOBILE MENU
// ============================
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});


// ============================
// TOGGLE FORM TESTIMONI
// ============================
function toggleForm() {
  const form = document.getElementById("formTestimoni");

  form.classList.toggle("opacity-0");
  form.classList.toggle("max-h-0");
  form.classList.toggle("opacity-100");
  form.classList.toggle("max-h-[500px]");
}


// ============================
// TESTIMONI (LOCAL STORAGE)
// ============================
document.addEventListener("DOMContentLoaded", () => {

  const testiForm = document.querySelector("#formTestimoni form");
  const testiContainer = document.getElementById("testimonialContainer");
  const anonCheck = document.getElementById("anonCheck");
  let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];

  function renderTestimonials() {
    testiContainer.innerHTML = "";

    [...testimonials].reverse().forEach(testi => {
      const card = document.createElement("div");
      card.className = "min-w-[250px] bg-white p-4 rounded-xl shadow";

      card.innerHTML = `
        <p class="text-sm text-gray-600">"${testi.message}"</p>
        <p class="text-xs text-gray-400 mt-2">
          ${testi.rating} - ${testi.name}
        </p>
      `;

      testiContainer.appendChild(card);
    });
  }

  if (testiForm) {
    testiForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const nameInput = testiForm.querySelector("input").value.trim();
        let name;
        if (anonCheck.checked) {
        name = "Pelanggan ARC Antar";
        } else {
        name = nameInput ? nameInput : "Anonim";
        }

        anonCheck.addEventListener("change", function() {
        const nameInput = testiForm.querySelector("input");

        if (this.checked) {
            nameInput.value = "";
            nameInput.disabled = true;
            nameInput.placeholder = "Disembunyikan (Anonim)";
        } else {
            nameInput.disabled = false;
            nameInput.placeholder = "Nama (boleh disamarkan)";
        }
        })

      const message = testiForm.querySelector("textarea").value;
      const rating = testiForm.querySelector("select").value;

      if (!message) {
    alert("Pesan tidak boleh kosong!");
    return;
  }

  if (rating === "Rating") {
    alert("Pilih rating dulu!");
    return;
  }

  const newTesti = {
    name: "Klien ARC Antar",
    message,
    rating
  };

      testimonials.push(newTesti);
      localStorage.setItem("testimonials", JSON.stringify(testimonials));

      renderTestimonials();
      testiForm.reset();
      toggleForm(); // auto close form
    });
  }

  renderTestimonials();
});


// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    const navHeight = document.querySelector("nav").offsetHeight;
    const offsetTop = target.offsetTop - navHeight + 5;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });

    menu.classList.add("hidden");
  });
});