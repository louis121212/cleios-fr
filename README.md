# Site web Cleios Consulting

Ce dépôt contient le code source du site web Cleios Consulting (https://cleios.fr), un site professionnel et moderne pour un cabinet de conseil en conformité et ESG/CSRD. Il est construit avec HTML, CSS et JavaScript vanilla et peut être déployé gratuitement via GitHub Pages avec un domaine personnalisé.

## Fonctionnalités

- Design responsive avec section hero, services (conformité, ESG/CSRD, e‑facturation et automatisation IA), section à propos et formulaire de contact.
- Widget d'assistant IA qui engage les visiteurs pour répondre à leurs questions et les aider à comprendre vos offres.
- Messages de conformité basés sur des réglementations à jour, incluant les exigences d'évaluation des risques NIS2, la mise en œuvre progressive CSRD et le mandat e‑Factură de la Roumanie.
- Structure optimisée pour le SEO avec balises meta, OpenGraph et sitemap.
- Intégration Formspree pour la capture de leads (remplacez `your_form_id` par votre ID de formulaire réel).
- Script Cloudflare Worker prêt à l'emploi pour faire proxy des requêtes de chat vers OpenAI (garde votre clé API privée).

## Déploiement

1. Dans ce dépôt, allez dans **Paramètres → Pages** et définissez la source sur la branche `main` avec `/` (racine).  
2. Connectez votre domaine personnalisé (par ex., `cleios.fr`) dans les mêmes **Pages** paramètres. GitHub affichera les enregistrements DNS que vous devez ajouter chez votre bureau d'enregistrement de domaine (Amen).  
3. Mettez à jour vos enregistrements DNS chez Amen aux valeurs fournies par GitHub. Les changements DNS peuvent prendre un certain temps pour se propager.  
4. Après la propagation, votre site sera en ligne sur votre domaine.

## Assistant IA

L'assistant IA apparaît sur chaque page et permet aux visiteurs de discuter de vos services. Il est implémenté dans `ai-widget.js`. Pour l'utiliser :

1. Déployez le Cloudflare Worker dans `cloudflare/worker.js` sur votre compte Cloudflare.  
2. Définissez une variable d'environnement `OPENAI_API_KEY` dans le Worker avec votre clé API OpenAI.  
3. Notez l'URL du Worker déployé (par exemple `https://cleios-assistant.workers.dev`) et définissez l'attribut `data-endpoint` sur l'élément `.chat-button` dans `index.html` sur cette URL.  
4. L'assistant relaya désormais les questions des visiteurs vers votre Worker et retournera des réponses alimentées par OpenAI.

## Formulaire de contact

Le formulaire de contact envoie les soumissions à Formspree. Créez un formulaire sur https://formspree.io, obtenez votre ID de formulaire et remplacez `your_form_id` dans l'attribut `<form action="https://formspree.io/f/your_form_id" ...>` dans `index.html`.

## Développement

Si vous souhaitez apporter des modifications :

1. Forkez ou clonez ce dépôt.  
2. Modifiez les fichiers HTML, CSS ou JS selon vos besoins.  
3. Commitez et poussez vos modifications vers GitHub. Pages reconstruira automatiquement.

## Licence

Ce projet est fourni à des fins éducatives et de démonstration.
