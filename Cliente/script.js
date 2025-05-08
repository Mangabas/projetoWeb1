const chatbotContainer = document.getElementById('chatbot-container');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotOptions = document.getElementById('chatbot-options');
const userInput = document.getElementById('user-input');

let userName = '';
let step = 0;

function toggleChat() {
  const isVisible = chatbotContainer.style.display === 'flex';
  chatbotContainer.style.display = isVisible ? 'none' : 'flex';
  chatbotToggle.textContent = isVisible ? 'Abrir Chat' : 'Fechar Chat';
}

function sendMessage(messageText = null) {
  const message = messageText || userInput.value.trim();
  if (message === '') return;

  appendMessage('user', message);
  if (!messageText) userInput.value = '';

  handleConversation(message);
}

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showOptions(options, callback) {
  chatbotOptions.innerHTML = '';
  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      appendMessage('user', option);
      chatbotOptions.innerHTML = '';
      callback(option);
    };
    chatbotOptions.appendChild(btn);
  });
}

function handleConversation(message) {
  switch (step) {
    case 0:
      userName = message;
      appendMessage('bot', `Prazer, ${userName}! Qual a data?`);
      const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
      showOptions(days, (day) => {
        appendMessage('bot', `Dia ${day} escolhido. Agora, escolha um horário:`);
        step = 2;
        handleConversation(); 
      });
      step = 1;
      break;

    case 2:
      const horarios = ["18h", "18:30h", "19h", "19:30h", "20h", "20:30h", "21h"];
      showOptions(horarios, (horario) => {
        appendMessage('bot', `Horário ${horario} escolhido. Agora, selecione o serviço:`);
        step = 3;
        handleConversation(); 
      });
      break;

    case 3:
      const servicos = [
        "Corte", "Sobrancelha", "Barba",
        "Corte + Sobrancelha",
        "Corte + Barba",
        "Corte + Sobrancelha + Barba"
      ];
      showOptions(servicos, (servico) => {
        appendMessage('bot', `Perfeito, ${userName}. Serviço "${servico}" agendado com sucesso!`);
        step = 4;
      });
      break;
  }
}


window.onload = () => {
  chatbotContainer.style.display = 'flex';
  appendMessage('bot', 'Qual é o seu nome?');
};
