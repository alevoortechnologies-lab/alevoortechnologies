import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

export const Route = createFileRoute("/api/public/site-content")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const { data, error } = await supabaseAdmin
          .from("site_content")
          .select("content")
          .eq("id", "main")
          .maybeSingle();

        if (error) {
          console.error("[site-content] fetch failed", error.message);
          return json({ content: null }, 200);
        }

        const content = data?.content ?? null;
        const hasContent =
          content && typeof content === "object" && Object.keys(content).length > 0;

        return json({ content: hasContent ? content : null });
      },
    },
  },
});
