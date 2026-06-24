import { createFileRoute } from "@tanstack/react-router";
import aboutHtml from "../static/about.html?raw";

export const Route = createFileRoute("/about")({
  server: {
    handlers: {
      GET: () =>
        new Response(aboutHtml, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
