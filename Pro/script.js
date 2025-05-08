lucide.createIcons();

const nomes = ["João", "Ana", "Carlos", "Marina", "Pedro", "Bianca", "Lucas", "Juliana", "Rafael", "Carla"];
const servicos = [
  "corte",
  "barba",
  "sobrancelha",
  "corte + barba",
  "corte + sobrancelha",
  "corte + sobrancelha + barba"
];

const horarios = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const datas = [];
for (let i = 1; i <= 29; i++) {
  datas.push((i < 10 ? "0" + i : i) + "/05");
}

function getEspaco(qtd) {
  return " ".repeat(qtd);
}

const agenda = document.getElementById("agenda");

for (let i = 0; i < 50; i++) {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const data = datas[Math.floor(Math.random() * datas.length)];
  const horario = horarios[Math.floor(Math.random() * horarios.length)];
  const servico = servicos[Math.floor(Math.random() * servicos.length)];

  const linha = document.createElement("div");
  linha.className = "entry";
  linha.textContent =
    nome + getEspaco(20 - nome.length) +
    data + getEspaco(8) +
    horario + getEspaco(6) +
    servico;

  agenda.appendChild(linha);
}
