/**
 * Outbound notification helper.
 *
 * If RESEND_API_KEY is configured, form submissions are delivered as email via
 * Resend's REST API (no SDK dependency). If it isn't, we log a minimal,
 * PII-light record and return `false` so callers can still acknowledge the user
 * — this keeps local/dev working while making production delivery a config-only
 * step. Swap in any provider by editing this single function.
 */
export async function deliverNotification(input: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM ?? "Dreamscape Systems <no-reply@dreamscapesystems.com>";

  if (!apiKey) {
    console.info("[notify] delivery skipped (RESEND_API_KEY not set):", input.subject);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: input.subject,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
