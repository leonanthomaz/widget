(function() {
  // Criar botão de abertura do chatbot
  const chatButton = document.createElement("div");
  chatButton.id = "chatbot-button";
  chatButton.innerHTML = "💬";
  document.body.appendChild(chatButton);

  // Criar container do chatbot
  const chatbotContainer = document.createElement("div");
  chatbotContainer.id = "chatbot-widget";
  chatbotContainer.style.display = "none";
  chatbotContainer.innerHTML = `
    <div id="chatbot-header">
      <img src="https://via.placeholder.com/30" alt="Logo" id="chatbot-avatar"/>
      <span>Nome da Empresa</span>
    </div>
    <div id="chatbot-body">
      <div id="chatbot-messages"></div>
      <div id="chatbot-typing-indicator" style="display: none;">...</div>
      <input type="text" id="chatbot-input" placeholder="Digite sua mensagem...">
      <button id="chatbot-send">Enviar</button>
    </div>
    <div id="chatbot-footer">2025 - Genius IA</div>
  `;
  document.body.appendChild(chatbotContainer);

  // Estilos do chatbot
  const style = document.createElement("style");
  style.innerHTML = `
    #chatbot-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #4A90E2, #357ABD);
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    #chatbot-widget {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 300px;
      height: 400px;
      background: #f1f5f9;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      font-family: 'Arial', sans-serif;
      display: flex;
      flex-direction: column;
      z-index: 9999;
    }
    #chatbot-header {
      background: linear-gradient(135deg, #4A90E2, #357ABD);
      color: #fff;
      padding: 10px;
      display: flex;
      align-items: center;
      font-size: 16px;
    }
    #chatbot-avatar {
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
      max-width: 75%;
      margin: 5px;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14px;
      display: inline-block;
    }
    .user-message {
      background: #007bff;
      color: white;
      align-self: flex-end;
    }
    .bot-message {
      background: #e9ecef;
      color: #333;
      align-self: flex-start;
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
    }
    #chatbot-typing-indicator {
      text-align: center;
      font-style: italic;
      color: #888;
      margin: 10px 0;
    }
  `;
  document.head.appendChild(style);

  // Toggle do chatbot
  chatButton.onclick = function() {
    chatbotContainer.style.display = chatbotContainer.style.display === "none" ? "flex" : "none";
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
