import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const defaultWebhookUrl =
  process.env.NODE_ENV === "production"
    ? process.env.N8N_WEBHOOK_URL_PROD ?? "https://n8n.cadre.cl/webhook/cadre"
    : process.env.N8N_WEBHOOK_URL_TEST ?? "https://n8n.cadre.cl/webhook-test/cadre";

const webhookUrl = process.env.N8N_WEBHOOK_URL ?? defaultWebhookUrl;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (!body.name || !body.company || !body.email) {
      return NextResponse.json(
        { ok: false, error: "Completa nombre, empresa y correo electrónico." },
        { status: 400 }
      );
    }

    const payload = {
      ...body,
      source: "cadre-landing",
      submittedAt: new Date().toISOString(),
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "No pudimos enviar tu solicitud en este momento. Inténtalo nuevamente." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
