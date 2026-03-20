export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST") {
      try {
        const { email } = await request.json();
        
        let viperId = await env.EMAILS.get(email);
        let status = "RECOGNIZED"; 

        if (!viperId) {
          const hex = Math.random().toString(16).toUpperCase().substring(2, 6);
          viperId = `VP-47-${hex}`;
          await env.EMAILS.put(email, viperId);
          status = "ACCESS GRANTED";
          
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Viper Projects <dispatch@system.viperprojects47.com>",
              to: [email],
              subject: "Viperprojects47",
              text: `Request received. Your address is now queued for further updates.\n\n— Viper Projects\nhttps://viperprojects47.com`,
            }),
          });
        }

        return new Response(JSON.stringify({ id: viperId, status: status }), {
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          },
        });
      } catch (err) {
        return new Response("Error processing request", { status: 400 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};