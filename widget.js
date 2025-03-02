(function() {
  // Criar botão de abertura do chatbot
  const chatButton = document.createElement("div");
  chatButton.id = "chatbot-button";
  chatButton.innerHTML = '<i class="fas fa-comments"></i>'; // Ícone do botão
  document.body.appendChild(chatButton);

  // Criar container do chatbot
  const chatbotContainer = document.createElement("div");
  chatbotContainer.id = "chatbot-widget";
  chatbotContainer.style.display = "none";
  chatbotContainer.innerHTML = `
    <div id="chatbot-header">
      <img src="https://i.postimg.cc/tgY1RSFP/Blue-Minimalist-Artificial-Intelligence-Technology-Logo.png" alt="Logo" id="chatbot-avatar" aria-label="Logo da empresa"/>
      <span>Genius</span>
      <button id="chatbot-close" aria-label="Fechar Chatbot">×</button>
    </div>
    <div id="chatbot-body">
      <div id="chatbot-messages"></div>
      <div id="chatbot-typing-indicator" style="display: none;">...</div>
      <div id="chatbot-input-container">
        <input type="text" id="chatbot-input" placeholder="Digite sua mensagem..." aria-label="Digite sua mensagem"/>
      </div>
      <button id="chatbot-send" aria-label="Enviar mensagem">Enviar</button>
    </div>
    <div id="chatbot-footer">2025 - Genius IA</div>
  `;
  document.body.appendChild(chatbotContainer);

  // Estilos do chatbot
  const style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

    body {
      font-family: 'Roboto', sans-serif;
    }

    #chatbot-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, rgb(120, 165, 217), rgb(89, 140, 191));
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      transition: opacity 0.5s ease;
    }

    #chatbot-widget {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 300px;
      max-width: 90%;
      height: 400px;
      background: #f1f5f9;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    #chatbot-widget.show {
      opacity: 1;
    }

    #chatbot-header {
      background: linear-gradient(135deg, #4A90E2, #357ABD);
      color: #fff;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      border-radius: 12px 12px 0 0;
    }

    #chatbot-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }

    #chatbot-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px;
      overflow-y: auto;
    }

    #chatbot-messages {
      flex: 1;
      overflow-y: auto;
    }

    .message {
      max-width: 85%;
      margin: 5px;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14px;
      display: inline-block;
    }

    .user-message {
      background: #e1f5fe;
      color: #000;
      align-self: flex-end;
    }

    .bot-message {
      background: #f0f0f0;
      color: #333;
      align-self: flex-start;
    }

    #chatbot-input-container {
      display: flex;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    #chatbot-input {
      width: 100%;
      padding: 10px;
      border: none;
      border-top: 1px solid #ddd;
      outline: none;
      font-size: 14px;
    }

    #chatbot-send {
      padding: 10px;
      background: #4A90E2;
      color: white;
      border: none;
      cursor: pointer;
      width: 100%;
      font-size: 14px;
    }

    #chatbot-footer {
      text-align: center;
      padding: 5px;
      background: #f1f5f9;
      font-size: 12px;
      border-radius: 0 0 12px 12px;
    }

    #chatbot-typing-indicator {
      text-align: center;
      font-style: italic;
      color: #888;
      margin: 10px 0;
    }

    #chatbot-close {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }

    @media (max-width: 480px) {
      #chatbot-button {
        bottom: 10px;
        right: 10px;
      }

      #chatbot-widget {
        bottom: 60px;
        right: 10px;
        width: 90%;
      }
    }

    @media (min-width: 768px) {
      #chatbot-widget {
        width: 400px;
      }
    }
  `;
  document.head.appendChild(style);

  // Toggle do chatbot
  chatButton.onclick = function() {
    if (chatbotContainer.style.display === "none") {
      chatbotContainer.style.display = "flex";
      chatbotContainer.classList.add("show");
    } else {
      chatbotContainer.classList.remove("show");
      setTimeout(() => { chatbotContainer.style.display = "none"; }, 500);
    }
  };

  document.getElementById("chatbot-close").onclick = function() {
    chatbotContainer.classList.remove("show");
    setTimeout(() => { chatbotContainer.style.display = "none"; }, 500);
  };

  // Enviar mensagem
  document.getElementById("chatbot-send").onclick = async function() {
    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();
    if (!message) return;

    displayMessage(message, "user");
    input.value = "";

    showTypingIndicator(true);

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    displayMessage(data.response, "bot");

    showTypingIndicator(false);
  };

  function displayMessage(text, sender) {
    const msgContainer = document.getElementById("chatbot-messages");
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    msgDiv.innerText = text;
    msgContainer.appendChild(msgDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function showTypingIndicator(isTyping) {
    const typingIndicator = document.getElementById("chatbot-typing-indicator");
    typingIndicator.style.display = isTyping ? "block" : "none";
  }
})();