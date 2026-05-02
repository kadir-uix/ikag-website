export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(payload?.email || "").trim().toLowerCase();
  const source = String(payload?.source || "waitlist").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const lead = {
    email,
    source,
    createdAt: new Date().toISOString(),
  };

  if (process.env.WAITLIST_WEBHOOK_URL) {
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
