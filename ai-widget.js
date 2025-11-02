/*
 * Cleios Consulting – Widget de chat IA
 *
 * Ce script génère une interface de chat simple et la connecte à un
 * endpoint API serverless (tel qu'un Cloudflare Worker) qui fait proxy
 * des requêtes vers un service IA (ex. OpenAI). L'endpoint doit accepter
 * un payload JSON `{ message: string }` et retourner `{ reply: string }`.
 *
 * Le widget ne stocke pas les messages de manière permanente et n'expose pas
 * la clé API au client ; la clé doit rester côté serveur.
 */

(function () {
  /**
   * Initialise le widget de chat dans l'élément avec l'ID donné.
   * @param {string} containerId
   */
  function initChatWidget(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    // Effacer le contenu existant
    container.innerHTML = '';
    // Créer les éléments de l'interface de chat
    const chatBox = document.createElement('div');
    chatBox.className = 'chat-box';
    const messagesList = document.createElement('div');
    messagesList.className = 'messages';
    const form = document.createElement('form');
    form.className = 'chat-form';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Écrivez votre message…';
    input.required = true;
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Envoyer';
    submit.className = 'btn btn‑primary';
    form.appendChild(input);
    form.appendChild(submit);
    chatBox.appendChild(messagesList);
    chatBox.appendChild(form);
    container.appendChild(chatBox);

    // Appliquer les styles de base
    const style = document.createElement('style');
    style.textContent = `
      .chat-box {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .messages {
        flex: 1;
        overflow-y: auto;
        padding: 0.5rem;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        margin-bottom: 1rem;
        max-height: 300px;
      }
      .message {
        margin-bottom: 0.75rem;
        line-height: 1.4;
      }
      .message.user {
        text-align: right;
        color: var(--colour-primary);
      }
      .message.ai {
        text-align: left;
        color: var(--colour-dark);
      }
      .chat-form {
        display: flex;
        gap: 0.5rem;
      }
      .chat-form input[type="text"] {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `;
    document.head.appendChild(style);

    // Ajouter l'écouteur d'événement
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      appendMessage(messagesList, text, 'user');
      input.value = '';
      try {
        appendMessage(messagesList, '…', 'ai', true);
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        });
        if (!res.ok) {
          throw new Error('Erreur de réponse du serveur');
        }
        const data = await res.json();
        // Retirer le message de chargement
        const loading = messagesList.querySelector('.message.ai.loading');
        if (loading) loading.remove();
        appendMessage(messagesList, data.reply || 'Pas de réponse', 'ai');
      } catch (err) {
        const loading = messagesList.querySelector('.message.ai.loading');
        if (loading) loading.remove();
        appendMessage(messagesList, 'Une erreur est survenue. Veuillez réessayer plus tard.', 'ai');
      }
    });
  }

  /**
   * Ajouter un message à la liste des messages.
   * @param {HTMLElement} list
   * @param {string} text
   * @param {'user'|'ai'} type
   * @param {boolean} loading
   */
  function appendMessage(list, text, type, loading = false) {
    const item = document.createElement('div');
    item.className = `message ${type}`;
    if (loading) item.classList.add('loading');
    item.textContent = text;
    list.appendChild(item);
    list.scrollTop = list.scrollHeight;
  }

  // Exposer init globalement pour app.js
  window.initChatWidget = initChatWidget;
})();
