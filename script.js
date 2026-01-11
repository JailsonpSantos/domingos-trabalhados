const calendar = document.getElementById("calendar");
const nomeInput = document.getElementById("nome");
const anoSelect = document.getElementById("ano");

const meses = [
"Janeiro","Fevereiro","Março","Abril","Maio","Junho",
"Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

const semana = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

let dados = JSON.parse(localStorage.getItem("escalaMultiAno")) || {};
nomeInput.value = localStorage.getItem("nomeEscala") || "";

nomeInput.addEventListener("input", () => {
localStorage.setItem("nomeEscala", nomeInput.value);
});

anoSelect.addEventListener("change", gerar);

function gerar() {
calendar.innerHTML = "";
let idx = 0;
const YEAR = parseInt(anoSelect.value);

for (let mes = 0; mes < 12; mes++) {
const m = document.createElement("div");
m.className = "month";

const h = document.createElement("h2");
h.textContent = meses[mes] + " / " + YEAR;
m.appendChild(h);

const w = document.createElement("div");
w.className = "weekdays";
semana.forEach(d => {
const s = document.createElement("div");
s.textContent = d;
w.appendChild(s);
});
m.appendChild(w);

const days = document.createElement("div");
days.className = "days";

const firstDay = new Date(YEAR, mes, 1).getDay();
for (let i = 0; i < firstDay; i++) {
const e = document.createElement("div");
e.className = "day empty";
days.appendChild(e);
}

const d = new Date(YEAR, mes, 1);
while (d.getMonth() === mes) {
const el = document.createElement("div");
el.className = "day";
el.textContent = d.getDate();

const key = d.toISOString().split("T")[0];

if (d.getDay() === 0 && !dados[key]) {
dados[key] = idx % 2 === 0 ? "work" : "off";
idx++;
}

if (dados[key]) el.classList.add(dados[key]);
if (d.getDay() === 0) el.classList.add("sunday");

el.onclick = () => {
if (!dados[key]) dados[key] = "extra";
else if (dados[key] === "work") dados[key] = "off";
else if (dados[key] === "off") dados[key] = "extra";
else dados[key] = "work";
salvar();
gerar();
};

days.appendChild(el);
d.setDate(d.getDate() + 1);
}

m.appendChild(days);
calendar.appendChild(m);
}
}

function salvar() {
localStorage.setItem("escalaMultiAno", JSON.stringify(dados));
}

gerar();
