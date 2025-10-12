export default {
  async fetch(request, env) {
    const { OPENAI_API_KEY } = env;
    const url = "https://api.openai.com/v1/chat/completions";
    const body = await request.json();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: body.messages,
        temperature: body.temperature || 0.7,
        max_tokens: body.max_tokens || 800,
        stream: false
      })
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      }
    });
  }
};
