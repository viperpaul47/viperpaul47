export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/notify" && request.method === "POST") {
      const { email } = await request.json();
      // Saves the email with a timestamp as the value
      await env.EMAILS.put(email, new Date().toISOString());
      return new Response("Saved", { status: 200 });
    }

    // Otherwise, show the HTML page from the /static folder
    return await env.ASSETS.fetch(request);
  },
};