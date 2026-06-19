import { createFileRoute } from "@tanstack/react-router";
import adminHtml from "../static/admin.html?raw";

export const Route = createFileRoute("/admin")({
  server: {
    handlers: {
      GET: () =>
        new Response(adminHtml, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
