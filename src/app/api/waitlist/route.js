async function readJsonResponse(response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(payload?.email || "").trim().toLowerCase();
  const source = String(payload?.source || "waitlist").trim();
  const company = String(payload?.company || "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (company) {
    return Response.json({ ok: true });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const lead = {
    email,
    source,
    createdAt: new Date().toISOString(),
  };

  if (process.env.WEB3FORMS_ACCESS_KEY) {
    const formData = new FormData();
    formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY);
    formData.append("email", email);
    formData.append("source", source);
    formData.append("subject", `IKAG waitlist request from ${source}`);
    formData.append("from_name", "IKAG Website");
    formData.append("message", `${email} requested IKAG early access from the ${source} form.`);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const result = await readJsonResponse(response);

    if (!response.ok || !result?.success) {
      return Response.json({ error: result?.message || "Waitlist service unavailable." }, { status: 502 });
    }
  } else if (process.env.WAITLIST_WEBHOOK_URL) {
    const response = await fetch(process.env.WAITLIST_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return Response.json({ error: "Waitlist service unavailable." }, { status: 502 });
    }
  } else {
    console.info("IKAG waitlist lead", lead);
  }

  return Response.json({ ok: true });
}
