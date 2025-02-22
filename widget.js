(function() {
  // Criar container do chatbot
  const chatbotContainer = document.createElement("div");
  chatbotContainer.id = "chatbot-widget";
  chatbotContainer.innerHTML = `
    <div id="chatbot-header">💬 Chatbot</div>
    <div id="chatbot-body">
      <div id="chatbot-messages"></div>
      <div id="chatbot-typing-indicator" style="display: none;">💬 Digitando...</div>
      <input type="text" id="chatbot-input" placeholder="Digite sua mensagem...">
      <button id="chatbot-send">Enviar</button>
    </div>
  `;
  document.body.appendChild(chatbotContainer);

  // Estilos do chatbot (injetados diretamente no <head>)
  const style = document.createElement("style");
  style.innerHTML = `
    #chatbot-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 320px;
      height: 450px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      font-family: 'Arial', sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      z-index: 9999;
    }
    #chatbot-header {
      background: #4CAF50;
      color: #fff;
      padding: 15px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
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
      word-wrap: break-word;
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
      background: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      width: 100%;
      font-size: 14px;
    }
    #chatbot-send:hover {
      background: #45a049;
    }
    #chatbot-typing-indicator {
      text-align: center;
      font-style: italic;
      color: #888;
      margin: 10px 0;
    }
  `;
  document.head.appendChild(style);

  // Lógica de abrir e fechar
  document.getElementById("chatbot-header").onclick = function() {
    const body = document.getElementById("chatbot-body");
    body.style.display = body.style.display === "none" ? "flex" : "none";
  };

  // Enviar mensagem
  document.getElementById("chatbot-send").onclick = async function() {
    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();
    if (!message) return;

    displayMessage(message, "user");
    input.value = "";

    showTypingIndicator(true); // Mostrar o "Digitando..." quando o bot estiver respondendo

    const response = await fetch("https://sua-api-chatbot.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    displayMessage(data.response, "bot");

    showTypingIndicator(false); // Esconder o "Digitando..." após o bot responder
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
