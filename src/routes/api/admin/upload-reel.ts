import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export const Route = createFileRoute("/api/admin/upload-reel")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json({ error: "Invalid form data" }, 400);
        }

        const code = String(form.get("code") || "");
        const { ADMIN_ACCESS_CODE } = await import("@/lib/admin-access.server");
        if (!code || code !== ADMIN_ACCESS_CODE) {
          return json({ error: "Unauthorized" }, 401);
        }

        const file = form.get("file");
        if (!(file instanceof File)) {
          return json({ error: "No file provided" }, 400);
        }
        if (file.size > 50 * 1024 * 1024) {
          return json({ error: "File too large (max 50MB)" }, 413);
        }
        if (!/^video\//.test(file.type)) {
          return json({ error: "Only video files allowed" }, 400);
        }

        const ext = (file.name.split(".").pop() || "mp4").toLowerCase().slice(0, 6);
        const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const bytes = new Uint8Array(await file.arrayBuffer());
        const { error: upErr } = await supabaseAdmin.storage
          .from("reels")
          .upload(key, bytes, { contentType: file.type, upsert: false });
        if (upErr) {
          console.error("[upload-reel] upload failed", upErr.message);
          return json({ error: "Upload failed" }, 500);
        }

        const { data: signed, error: signErr } = await supabaseAdmin.storage
          .from("reels")
          .createSignedUrl(key, TEN_YEARS);
        if (signErr || !signed?.signedUrl) {
          return json({ error: "Failed to sign URL" }, 500);
        }

        return json({ url: signed.signedUrl, key });
      },
    },
  },
});
