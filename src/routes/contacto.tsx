import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import Contact from "@/components/Contact";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — PCVEN, C.A. | Cotiza tu plataforma web, Web3 o IA" },
      { name: "description", content: "Habla directo con el equipo PCVEN. Solicita cotización por WhatsApp para tu plataforma web, blockchain o inteligencia artificial. Atención personalizada Lun-Vie." },
      { property: "og:title", content: "Contacto — PCVEN, C.A." },
      { property: "og:description", content: "Cotiza tu próximo proyecto digital con PCVEN. Respuesta directa vía WhatsApp, sin formularios robotizados." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pcven.lovable.app/contacto" },
    ],
    links: [{ rel: "canonical", href: "https://pcven.lovable.app/contacto" }],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="container-x h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--coffee)] hover:text-[color:var(--accent)] transition-colors">
            <ArrowLeft className="size-4" /> Volver al inicio
          </Link>
          <span className="font-display font-bold tracking-wide">PCVEN<span className="text-[color:var(--gold)]">.</span>CA</span>
        </div>
      </header>
      <main>
        <Contact />
      </main>
    </div>
  );
}
