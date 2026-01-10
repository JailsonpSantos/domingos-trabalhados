const calendarDiv = document.getElementById("calendar");
const nomeInput = document.getElementById("nome");

const YEAR = 2026;

let domingos = JSON.parse(localStorage.getItem("domingos2026")) || {};
nomeInput.value = localStorage.getItem("nome2026") || "";

nomeInput.addEventListener("input", () => {
  localStorage.setItem("nome2026", nomeInput.value);
});

const meses = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

function gerarCalendario() {
  calendarDiv.innerHTML = "";
  let indiceDomingo = 0;

  for (let mes = 0; mes < 12; mes++) {
    const monthDiv = document.createElement("div");
    monthDiv.classList.add("month");

    const title = document.createElement("h2");
    title.textContent = meses[mes];
    monthDiv.appendChild(title);

    const daysDiv = document.createElement("div");
    daysDiv.classList.add("days");

    const date = new Date(YEAR, mes, 1);

    while (date.getMonth() === mes) {
      const day = document.createElement("div");
      day.classList.add("day");
      day.textContent = date.getDate();

      if (date.getDay() === 0) {
        day.classList.add("sunday");
        const key = date.toISOString().split("T")[0];

        if (!domingos[key]) {
          domingos[key] = indiceDomingo % 2 === 0 ? "work" : "off";
        }

        day.classList.add(domingos[key]);

        day.onclick = () => {
          domingos[key] = domingos[key] === "work" ? "off" : "work";
          salvar();
          gerarCalendario();
        };

        indiceDomingo++;
      }

      daysDiv.appendChild(day);
      date.setDate(date.getDate() + 1);
    }

    monthDiv.appendChild(daysDiv);
    calendarDiv.appendChild(monthDiv);
  }

  salvar();
}

function salvar() {
  localStorage.setItem("domingos2026", JSON.stringify(domingos));
}

gerarCalendario();
