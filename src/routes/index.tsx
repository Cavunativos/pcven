import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Globe2, Rocket, Sparkles, Headphones, ShieldCheck, Code2, Cpu, Link2,
  MessageCircle, Mail, Phone, Instagram, MapPin, Clock, ChevronDown,
  ArrowRight, CheckCircle2, Star,
} from "lucide-react";

import heroImg from "@/assets/hero-pcven.jpg";
import aboutImg from "@/assets/about-team.jpg";
import productWeb from "@/assets/product-web.jpg";
import productAi from "@/assets/product-ai.jpg";
import productWeb3 from "@/assets/product-web3.jpg";
import pcvenLogo from "@/assets/pcven-logo.jpg.asset.json";
import MapSection from "@/components/MapSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PCVEN, C.A. — Desarrollo Web3, Blockchain e IA" },
      { name: "description", content: "Agencia venezolana especializada en desarrollo de plataformas web, Web3, blockchain e inteligencia artificial. Diseño premium, entrega récord, cobertura internacional." },
      { property: "og:title", content: "PCVEN, C.A. — Desarrollo Web3, Blockchain e IA" },
      { property: "og:description", content: "Plataformas modernas, escalables y persuasivas para negocios y corporaciones." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const WHATSAPP = "https://wa.me/584126893075?text=Hola%20PCVEN%2C%20quisiera%20una%20cotizaci%C3%B3n";
const PHONE = "+584126893075";
const EMAIL = "cavucorpo@gmail.com";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("reveal")),
      { threshold: 0.12 }
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Home() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <ValueProps />
      <About />
      <Products />
      <Distribution />
      <MapSection />
      <Testimonials />
      <CtaBand />
      <Gallery />
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Inicio", "#inicio"],
    ["Nosotros", "#nosotros"],
    ["Productos", "#productos"],
    ["Distribución", "#distribucion"],
    ["Ubicaciones", "#ubicaciones"],
    ["Galería", "#galeria"],
    ["Contacto", "#contacto"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-xl bg-[oklch(0.18_0.02_40/0.78)] border-b border-white/10">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-3 text-[oklch(0.97_0.015_75)]">
          <img
            src={pcvenLogo.url}
            alt="PCVEN, C.A. logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15 shadow-[0_0_18px_oklch(0.78_0.13_75/0.35)]"
          />
          <span className="font-display font-bold tracking-wide leading-none">PCVEN<span className="text-[color:var(--gold)]">.</span>CA</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="text-sm text-[oklch(0.95_0.02_75/0.85)] hover:text-[color:var(--gold)] transition-colors">{l}</a>
          ))}
        </nav>
        <a href={WHATSAPP} target="_blank" rel="noopener" className="hidden sm:inline-flex btn-primary !py-2 !px-5 text-sm">
          Cotizar <ArrowRight className="size-4" />
        </a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[oklch(0.97_0.015_75)] p-2" aria-label="Menú">
          <div className="w-6 h-0.5 bg-current mb-1.5" />
          <div className="w-6 h-0.5 bg-current mb-1.5" />
          <div className="w-6 h-0.5 bg-current" />
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[oklch(0.18_0.02_40)]">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="text-[oklch(0.95_0.02_75)] py-2">{l}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <img src={heroImg} alt="Plataforma web3 con visualización blockchain e IA" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.45_0.06_165/0.35),transparent_60%)]" />

      <div className="container-x relative z-10 py-24">
        <div className="max-w-3xl text-[oklch(0.97_0.015_75)]">
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest backdrop-blur">
            <Sparkles className="size-3.5 text-[color:var(--gold)]" />
            <span>Venezuela · Cobertura internacional</span>
          </div>
          <h1 data-reveal className="mt-6 font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05]">
            Diseño internacional de <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>plataformas web</span> con Blockchain e IA de alta calidad.
          </h1>
          <p data-reveal className="mt-6 text-lg sm:text-xl text-[oklch(0.95_0.02_75/0.85)] max-w-2xl">
            Soluciones y asesoramiento para negocios, corporaciones y distribuidores. Construimos productos digitales que escalan, persuaden y convierten.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-primary">
              Solicitar Cotización <ArrowRight className="size-4" />
            </a>
            <a href="#productos" className="btn-ghost">Ver Productos</a>
          </div>
          <div data-reveal className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              ["+25", "Años de trayectoria"],
              ["100%", "Atención directa"],
              ["24/7", "Soporte global"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-bold text-[color:var(--gold)]">{n}</div>
                <div className="text-xs text-[oklch(0.95_0.02_75/0.7)] mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <a href="#valor" aria-label="Bajar" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown className="size-6" />
      </a>
    </section>
  );
}

function ValueProps() {
  const items = [
    { icon: Globe2, t: "Distribución internacional", d: "Plataformas optimizadas para mercados globales y multimoneda." },
    { icon: Rocket, t: "Entregas en tiempo récord", d: "Sprints ágiles. Tu MVP listo cuando otros aún cotizan." },
    { icon: ShieldCheck, t: "Venta por diseño", d: "Interfaces persuasivas pensadas para conversión." },
    { icon: Headphones, t: "Atención personalizada", d: "Contacto directo con el equipo, sin intermediarios." },
  ];
  return (
    <section id="valor" className="section bg-background">
      <div className="container-x">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} data-reveal className="group relative rounded-2xl bg-card p-6 border border-border hover:border-[color:var(--accent)] transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl text-[oklch(0.97_0.015_75)]" style={{ background: "var(--gradient-forest)" }}>
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="section bg-[color:var(--beige)]/50">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div data-reveal className="relative">
          <img src={aboutImg} alt="Equipo de ingenieros PCVEN" width={1280} height={960} loading="lazy" className="rounded-3xl shadow-2xl" />
          <div className="absolute -bottom-6 -right-6 hidden sm:block rounded-2xl bg-[color:var(--coffee)] text-[color:var(--beige)] p-6 max-w-xs" style={{ boxShadow: "var(--shadow-elevated)" }}>
            <div className="font-display text-3xl font-bold text-[color:var(--gold)]">1997</div>
            <div className="text-sm mt-1 opacity-90">Construyendo el futuro digital desde Venezuela.</div>
          </div>
        </div>
        <div data-reveal>
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[color:var(--accent)] font-semibold">Sobre nosotros</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Una marca venezolana con visión <span className="text-[color:var(--coffee)]">global</span>.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Desde 1997 PCVEN, C.A. ha acompañado a empresas, distribuidores y emprendedores en su transformación digital. Diseñamos plataformas web, integramos blockchain e implementamos inteligencia artificial con un objetivo claro: que tu negocio crezca más rápido y compita en cualquier mercado.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Equipo senior con +30 años combinados en ingeniería de software.",
              "Metodología ágil con entregables visibles cada semana.",
              "Cobertura nacional e internacional con soporte directo.",
            ].map((x) => (
              <li key={x} className="flex gap-3"><CheckCircle2 className="size-5 shrink-0 text-[color:var(--accent)] mt-0.5" /><span>{x}</span></li>
            ))}
          </ul>
          <a href="#contacto" className="mt-8 inline-flex btn-primary">Hablemos de tu proyecto <ArrowRight className="size-4" /></a>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const list = [
    { img: productWeb, icon: Code2, t: "Diseños Web Básicos", d: "Landing pages, sitios corporativos y e-commerce de alta conversión, listos para escalar.", tag: "Desde 7 días" },
    { img: productAi, icon: Cpu, t: "Plataformas con IA Integrada", d: "Chatbots, asistentes y motores inteligentes con OpenAI/Gemini embebidos en tu producto.", tag: "AI-ready" },
    { img: productWeb3, icon: Link2, t: "Web3 con Blockchain", d: "DApps, wallets, smart contracts y marketplaces sobre Ethereum, Polygon y BSC.", tag: "On-chain" },
  ];
  return (
    <section id="productos" className="section bg-background">
      <div className="container-x">
        <div data-reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--accent)] font-semibold">Catálogo premium</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">Productos diseñados para escalar tu marca.</h2>
          <p className="mt-4 text-muted-foreground">Cada solución combina diseño persuasivo, tecnología de punta y arquitectura preparada para crecer contigo.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(({ img, icon: Icon, t, d, tag }) => (
            <article key={t} data-reveal className="group overflow-hidden rounded-3xl bg-card border border-border hover:border-[color:var(--accent)] transition-all hover:-translate-y-2" style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={img} alt={t} width={1024} height={1024} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[color:var(--coffee)]">
                  <Star className="size-3 text-[color:var(--gold)] fill-current" /> {tag}
                </span>
                <div className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-forest)" }}>
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
                <a href={WHATSAPP} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)] hover:gap-3 transition-all">
                  Consultar <ArrowRight className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Distribution() {
  const items = [
    { t: "Cobertura internacional", d: "Servimos a clientes en LATAM, EE.UU. y Europa con onboarding remoto." },
    { t: "Logística digital", d: "Despliegues en la nube, CI/CD, dominios y SSL configurados llave en mano." },
    { t: "Pedidos al mayor", d: "Planes corporativos para agencias y distribuidores con reventa." },
  ];
  return (
    <section id="distribucion" className="section relative overflow-hidden" style={{ background: "var(--gradient-forest)" }}>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,white,transparent_50%)]" />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center text-[oklch(0.97_0.015_75)]">
          <div data-reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] font-semibold">Distribución</span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-tight">Llegamos donde tu negocio te necesite.</h2>
            <p className="mt-5 opacity-90 max-w-xl">Operamos con metodología remota, husos horarios flexibles y entregas continuas. Tu producto se actualiza mientras duermes.</p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {items.map((i) => (
                <div key={i.t} className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/15">
                  <h3 className="font-semibold">{i.t}</h3>
                  <p className="mt-2 text-sm opacity-85">{i.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="relative">
            <div className="aspect-square rounded-full bg-white/5 border border-white/15 grid place-items-center float" style={{ boxShadow: "var(--shadow-glow)" }}>
              <Globe2 className="size-48 sm:size-64 text-[color:var(--gold)] opacity-80" />
            </div>
            {["LATAM", "EE.UU.", "EUROPA", "ASIA"].map((c, idx) => (
              <span key={c} className="absolute rounded-full bg-[color:var(--coffee)] text-[color:var(--beige)] px-4 py-1.5 text-xs font-semibold border border-white/20"
                style={{
                  top: `${[10, 30, 60, 80][idx]}%`,
                  left: `${[5, 80, 0, 75][idx]}%`,
                  boxShadow: "var(--shadow-soft)",
                }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const data = [
    { n: "María Linares", r: "Gerente, Hotel Boutique Margarita", t: "PCVEN levantó nuestra plataforma de reservas en 3 semanas. El ROI se vio el primer mes." },
    { n: "Carlos Rondón", r: "CEO, Restaurante La Brasa", t: "Su sistema con IA contesta a nuestros clientes 24/7. Aumentamos pedidos un 40%." },
    { n: "Daniel Pereira", r: "Founder, CryptoVen Exchange", t: "Implementaron nuestro contrato y la DApp con un nivel de detalle impecable. Súper recomendados." },
  ];
  return (
    <section className="section bg-[color:var(--beige)]/60">
      <div className="container-x">
        <div data-reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--accent)] font-semibold">Testimonios</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">Clientes que confían y crecen con nosotros.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {data.map((x) => (
            <figure key={x.n} data-reveal className="rounded-3xl bg-card p-7 border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="flex gap-1 text-[color:var(--gold)]">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-base leading-relaxed">"{x.t}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full font-display font-bold text-[oklch(0.97_0.015_75)]" style={{ background: "var(--gradient-gold)", color: "oklch(0.18 0.02 40)" }}>
                  {x.n.split(" ").map(s => s[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-sm">{x.n}</div>
                  <div className="text-xs text-muted-foreground">{x.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <img src={heroImg} alt="" aria-hidden width={1920} height={600} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[oklch(0.18_0.02_40/0.85)]" />
      <div className="relative container-x py-20 sm:py-28 text-center text-[oklch(0.97_0.015_75)]">
        <h2 data-reveal className="font-display text-3xl sm:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          ¿Listo para convertir tu concepto en una web de <span className="text-[color:var(--gold)]">alta calidad</span>?
        </h2>
        <p data-reveal className="mt-5 opacity-85 max-w-xl mx-auto">Asesoría inicial gratuita. Hablamos hoy mismo por WhatsApp y diseñamos juntos la mejor ruta.</p>
        <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-primary">
            <MessageCircle className="size-5" /> Contáctanos por WhatsApp
          </a>
          <a href="#contacto" className="btn-ghost">Enviar formulario</a>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [productWeb, productAi, productWeb3, aboutImg, heroImg, productAi];
  return (
    <section id="galeria" className="section bg-background">
      <div className="container-x">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--accent)] font-semibold">Galería</span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">Casos, plataformas y procesos.</h2>
          </div>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="text-sm font-semibold text-[color:var(--accent)] hover:underline">Ver más casos →</a>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {imgs.map((src, i) => (
            <div key={i} data-reveal className={`group relative overflow-hidden rounded-2xl ${i === 0 || i === 4 ? "lg:row-span-2 aspect-[3/4] lg:aspect-auto" : "aspect-square"}`}>
              <img src={src} alt={`Caso ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    { q: "¿Cómo empezamos un proyecto?", a: "Nos escribes por WhatsApp o el formulario, agendamos una llamada y te entregamos una propuesta con alcance, tiempos y precio en 48 horas." },
    { q: "¿La asesoría inicial es gratuita?", a: "Sí. La primera sesión de diagnóstico y propuesta no tiene costo ni compromiso." },
    { q: "¿Qué métodos de pago aceptan?", a: "Transferencia nacional e internacional, USDT, Zelle y pasarelas locales. Pagos parciales por hitos." },
    { q: "¿Cuál es su cobertura?", a: "Trabajamos 100% remoto con clientes en Venezuela, LATAM, EE.UU. y Europa. Atención en horario flexible." },
    { q: "¿Ofrecen soporte después del lanzamiento?", a: "Sí, planes mensuales de mantenimiento, optimización y nuevas funcionalidades." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section bg-[color:var(--beige)]/50">
      <div className="container-x max-w-3xl">
        <div data-reveal className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--accent)] font-semibold">Preguntas frecuentes</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">Lo que más nos preguntan.</h2>
        </div>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <div key={it.q} data-reveal className="rounded-2xl bg-card border border-border overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-semibold">{it.q}</span>
                <ChevronDown className={`size-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{it.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contacto" className="section bg-background">
      <div className="container-x grid lg:grid-cols-2 gap-12">
        <div data-reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--accent)] font-semibold">Contacto</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-tight">Hablemos. Tu próximo gran producto empieza con un mensaje.</h2>
          <p className="mt-5 text-muted-foreground">Atención directa, sin formularios robotizados. Te responde el equipo que construirá tu proyecto.</p>

          <div className="mt-8 space-y-4">
            {[
              { i: MessageCircle, l: "WhatsApp", v: PHONE, h: WHATSAPP, t: true },
              { i: Mail, l: "Correo", v: EMAIL, h: `mailto:${EMAIL}` },
              { i: Phone, l: "Teléfono", v: PHONE, h: `tel:${PHONE}` },
              { i: Instagram, l: "Instagram", v: "@pcvenvzla", h: "https://instagram.com/pcvenvzla", t: true },
              { i: MapPin, l: "Ubicación", v: "Isla de Margarita, Nueva Esparta, Venezuela" },
              { i: Clock, l: "Horario", v: "Lun a Vie · 8:00 a.m. – 6:00 p.m." },
            ].map(({ i: Icon, l, v, h, t }) => {
              const content = (
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-[color:var(--accent)] transition-colors">
                  <div className="grid h-11 w-11 place-items-center rounded-xl text-[oklch(0.97_0.015_75)] shrink-0" style={{ background: "var(--gradient-forest)" }}>
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
                    <div className="font-medium truncate">{v}</div>
                  </div>
                </div>
              );
              return h ? <a key={l} href={h} target={t ? "_blank" : undefined} rel="noopener" className="block">{content}</a> : <div key={l}>{content}</div>;
            })}
          </div>
        </div>

        <form data-reveal onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl bg-card border border-border p-6 sm:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
          <h3 className="font-display text-2xl font-bold">Cuéntanos tu idea</h3>
          <p className="mt-1 text-sm text-muted-foreground">Te respondemos en menos de 24h hábiles.</p>

          <div className="mt-6 space-y-4">
            <Field label="Nombre completo" name="name" required />
            <Field label="Teléfono / WhatsApp" name="phone" type="tel" required />
            <Field label="Correo electrónico" name="email" type="email" />
            <div>
              <label className="text-sm font-medium">Mensaje</label>
              <textarea required rows={4} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 transition" placeholder="Cuéntanos qué necesitas..." />
            </div>
            <button type="submit" className="btn-primary w-full">
              {sent ? "¡Recibido! Te contactamos pronto" : "Enviar mensaje"} <ArrowRight className="size-4" />
            </button>
            <p className="text-xs text-center text-muted-foreground">Atención directa vía WhatsApp · +58 412-6893075</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}{required && " *"}</label>
      <input id={name} name={name} type={type} required={required} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 transition" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--coffee)] text-[color:var(--beige)]">
      <div className="container-x py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
              <span className="font-display font-extrabold text-[oklch(0.18_0.02_40)]">P</span>
            </span>
            <span className="font-display text-xl font-bold">PCVEN<span className="text-[color:var(--gold)]">.</span>CA</span>
          </div>
          <p className="mt-4 text-sm opacity-80 max-w-md leading-relaxed">
            Agencia venezolana de desarrollo de plataformas web, Web3, blockchain e inteligencia artificial. Rif. J-30503194-0.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com/pcvenvzla" target="_blank" rel="noopener" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-[color:var(--gold)] hover:text-[color:var(--coffee)] transition" aria-label="Instagram"><Instagram className="size-5" /></a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-[color:var(--gold)] hover:text-[color:var(--coffee)] transition" aria-label="WhatsApp"><MessageCircle className="size-5" /></a>
            <a href={`mailto:${EMAIL}`} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-[color:var(--gold)] hover:text-[color:var(--coffee)] transition" aria-label="Email"><Mail className="size-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm opacity-85">
            <li><a href="#nosotros" className="hover:text-[color:var(--gold)]">Nosotros</a></li>
            <li><a href="#productos" className="hover:text-[color:var(--gold)]">Productos</a></li>
            <li><a href="#distribucion" className="hover:text-[color:var(--gold)]">Distribución</a></li>
            <li><a href="#contacto" className="hover:text-[color:var(--gold)]">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm opacity-85">
            <li>+58 412-6893075</li>
            <li>{EMAIL}</li>
            <li>Margarita, Nueva Esparta</li>
            <li>Lun – Vie · 8:00 – 18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs flex flex-col sm:flex-row gap-2 justify-between opacity-75">
          <span>© 1997 – 2026 PCVEN, C.A. Todos los derechos reservados.</span>
          <span>Desarrollado por Ing. Sistemas Carlos Vásquez</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid place-items-center h-14 w-14 rounded-full text-white shadow-2xl hover:scale-110 transition-transform"
      style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 10px 30px oklch(0.45 0.06 165 / 0.5)" }}>
      <MessageCircle className="size-7" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
    </a>
  );
}
