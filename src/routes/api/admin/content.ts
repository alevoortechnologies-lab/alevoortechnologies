import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const Route = createFileRoute("/api/admin/content")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { code?: string; content?: unknown };
        try {
          body = (await request.json()) as { code?: string; content?: unknown };
        } catch {
          return json({ error: "Invalid request" }, 400);
        }

        const { ADMIN_ACCESS_CODE } = await import("@/lib/admin-access.server");
        if (!body.code || body.code !== ADMIN_ACCESS_CODE) {
          return json({ error: "Unauthorized" }, 401);
        }

        if (!body.content || typeof body.content !== "object") {
          return json({ error: "Invalid content" }, 400);
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const { error } = await supabaseAdmin
          .from("site_content")
          .upsert({
            id: "main",
            content: body.content as Record<string, unknown>,
            updated_at: new Date().toISOString(),
          });

        if (error) {
          console.error("[admin/content] save failed", error.message);
          return json({ error: "Failed to save content" }, 500);
        }

        return json({ ok: true });
      },
    },
  },
});
