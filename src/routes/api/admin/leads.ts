import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const Route = createFileRoute("/api/admin/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { code?: string };
        try {
          body = (await request.json()) as { code?: string };
        } catch {
          return json({ error: "Invalid request" }, 400);
        }

        const { ADMIN_ACCESS_CODE } = await import("@/lib/admin-access.server");
        if (!body.code || body.code !== ADMIN_ACCESS_CODE) {
          return json({ error: "Unauthorized" }, 401);
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const { data, error } = await supabaseAdmin
          .from("contact_submissions")
          .select("id,name,email,platform,message,created_at")
          .order("created_at", { ascending: false })
          .limit(500);

        if (error) {
          console.error("[leads] fetch failed", error.message);
          return json({ error: "Failed to load leads" }, 500);
        }

        return json({ ok: true, leads: data ?? [] });
      },
    },
  },
});
