import { createFileRoute } from "@tanstack/react-router";
import servicesHtml from "../static/services.html?raw";

export const Route = createFileRoute("/services")({
  server: {
    handlers: {
      GET: () =>
        new Response(servicesHtml, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
