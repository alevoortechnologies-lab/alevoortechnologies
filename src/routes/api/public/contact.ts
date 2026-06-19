import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  platform: z.string().trim().max(100).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid request" }, 400);
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return json({ error: "Please fill in a valid name and email." }, 400);
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const { error } = await supabaseAdmin
          .from("contact_submissions")
          .insert({
            name: parsed.data.name,
            email: parsed.data.email,
            platform: parsed.data.platform ?? null,
            message: parsed.data.message ?? null,
          });

        if (error) {
          console.error("[contact] insert failed", error.message);
          return json({ error: "Something went wrong. Please try again." }, 500);
        }

        return json({ ok: true });
      },
    },
  },
});
