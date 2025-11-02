/*
 * Cleios Consulting – Application principale
 *
 * Ce script initialise le widget de chat après le chargement du DOM et
 * implémente des améliorations mineures (ex. défilement fluide pour les liens d'ancrage).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialiser le widget de chat IA
  if (typeof window.initChatWidget === 'function') {
    window.initChatWidget('ai-chat-widget');
  }
  // Défilement fluide pour les liens d'ancrage dans la page
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
