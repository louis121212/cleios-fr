# Cleios Consulting Website

This repository contains the source code for the Cleios Consulting website (https://cleios.fr), a professional and modern site for a compliance and ESG/CSRD consulting firm. It is built with HTML, CSS and vanilla JavaScript and can be deployed for free via GitHub Pages with a custom domain.

## Features

- Responsive design with hero section, services (compliance, ESG/CSRD, e facturation and AI automation), about section, and contact form.
- AI assistant widget that engages visitors to answer questions and help them understand your offerings.
- Compliance messaging based on up‑to‑date regulations, including NIS2 risk assessment requirements【576106472859696†L141-L160】, CSRD phased implementation【855830170978761†L598-L612】 and Romania's e‑Factură mandate【169194903531349†L144-L172】.
- SEO‑optimized structure with meta tags, OpenGraph and sitemap.
- Formspree integration for lead capture (replace `your_form_id` with your actual form ID).
- Ready-to-use Cloudflare Worker script for proxying chat requests to OpenAI (keeps your API key private).

## Deployment

1. In this repository, go to **Settings → Pages** and set the source to the `main` branch with `/` (root).  
2. Connect your custom domain (e.g., `cleios.fr`) in the same **Pages** settings. GitHub will show the DNS records you need to add at your domain registrar (Amen).  
3. Update your DNS records at Amen to the values provided by GitHub. DNS changes can take some time to propagate.  
4. After propagation, your site will be live at your domain.

## AI Assistant

The AI assistant appears on each page and allows visitors to chat about your services. It is implemented in `ai-widget.js`. To use it:

1. Deploy the Cloudflare Worker in `cloudflare/worker.js` to your Cloudflare account.  
2. Set an environment variable `OPENAI_API_KEY` in the Worker with your OpenAI API key.  
3. Note the deployed Worker URL (for example `https://cleios-assistant.workers.dev`) and set the `data-endpoint` attribute on the `.chat-button` element in `index.html` to this URL.  
4. The assistant will now relay questions from visitors to your Worker and return answers powered by OpenAI.

## Contact Form

The contact form sends submissions to Formspree. Create a form at https://formspree.io, get your form ID, and replace `your_form_id` in the `<form action="https://formspree.io/f/your_form_id" ...>` attribute in `index.html`.

## Development

If you'd like to make changes:

1. Fork or clone this repository.  
2. Edit the HTML, CSS, or JS files as needed.  
3. Commit and push your changes to GitHub. Pages will automatically rebuild.

## License

This project is provided for educational and demonstration purposes.
