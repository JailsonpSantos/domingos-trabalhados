const calendar = document.getElementById("calendar");
const nomeInput = document.getElementById("nome");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

let domingos = JSON.parse(localStorage.getItem("domingos")) || {};
nomeInput.value = localStorage.getItem("nome") || "";

nomeInput.addEventListener("input", () => {
  localStorage.setItem("nome", nomeInput.value);
});

function gerarCalendario() {
  calendar.innerHTML = "";
  let data = new Date(year, month, 1);
  let indiceDomingo = 0;

  while (data.getMonth() === month) {
    const div = document.createElement("div");
    div.classList.add("day");
    div.textContent = data.getDate();

    if (data.getDay() === 0) {
      div.classList.add("sunday");
      const chave = data.toISOString().split("T")[0];

      if (!domingos[chave]) {
        domingos[chave] = indiceDomingo % 2 === 0 ? "work" : "off";
      }

      div.classList.add(domingos[chave]);

      div.onclick = () => {
        domingos[chave] = domingos[chave] === "work" ? "off" : "work";
        salvar();
        gerarCalendario();
      };

      indiceDomingo++;
    }

    calendar.appendChild(div);
    data.setDate(data.getDate() + 1);
  }
  salvar();
}

function salvar() {
  localStorage.setItem("domingos", JSON.stringify(domingos));
}

gerarCalendario();
