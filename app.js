/*
 * Cleios Consulting – Main application
 *
 * This script initialises the chat widget after the DOM has loaded and
 * implements minor enhancements (e.g. smooth scroll for anchor links).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialise the AI chat widget
  if (typeof window.initChatWidget === 'function') {
    window.initChatWidget('ai-chat-widget');
  }
  // Smooth scroll for anchor links within the page
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
