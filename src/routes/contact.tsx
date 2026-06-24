import { createFileRoute } from "@tanstack/react-router";
import contactHtml from "../static/contact.html?raw";

export const Route = createFileRoute("/contact")({
  server: {
    handlers: {
      GET: () =>
        new Response(contactHtml, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
