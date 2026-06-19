import { useState } from "react";
import { z } from "zod";
import {
  ArrowRight, MessageCircle, Mail, Phone, Instagram, MapPin, Clock,
} from "lucide-react";
import { toast } from "sonner";

const WHATSAPP = "https://wa.me/584126893075?text=Hola%20PCVEN%2C%20quisiera%20una%20cotizaci%C3%B3n";
const PHONE = "+584126893075";
const EMAIL = "cavucorpo@gmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre completo").max(100, "Máximo 100 caracteres"),
  phone: z.string().trim().min(7, "Teléfono inválido").max(25, "Máximo 25 caracteres"),
  email: z.string().trim().max(255, "Máximo 255 caracteres").email("Correo inválido").or(z.literal("")),
  message: z.string().trim().min(10, "Cuéntanos un poco más (mín. 10 caracteres)").max(1000, "Máximo 1000 caracteres"),
});
type ContactValues = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export default function Contact() {
  const [values, setValues] = useState<ContactValues>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (k: keyof ContactValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: ContactErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    const { name, phone, email, message } = parsed.data;
    const body =
      `Hola PCVEN, soy ${name}.\n` +
      `📱 Tel/WhatsApp: ${phone}\n` +
      (email ? `✉️ Correo: ${email}\n` : "") +
      `\n${message}`;
    const url = `https://wa.me/584126893075?text=${encodeURIComponent(body)}`;
    setSending(true);
    setSent(true);
    toast.success("Mensaje enviado", { description: "Abrimos WhatsApp con tu mensaje listo." });
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setSending(false), 3000);
  }

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

        <form data-reveal onSubmit={onSubmit} noValidate className="rounded-3xl bg-card border border-border p-6 sm:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
          <h3 className="font-display text-2xl font-bold">Cuéntanos tu idea</h3>
          <p className="mt-1 text-sm text-muted-foreground">Al enviar abrimos WhatsApp con tu mensaje listo.</p>

          <div className="mt-6 space-y-4">
            <Field label="Nombre completo" name="name" value={values.name} onChange={update("name")} error={errors.name} required />
            <Field label="Teléfono / WhatsApp" name="phone" type="tel" value={values.phone} onChange={update("phone")} error={errors.phone} required />
            <Field label="Correo electrónico (opcional)" name="email" type="email" value={values.email} onChange={update("email")} error={errors.email} />
            <div>
              <label htmlFor="message" className="text-sm font-medium">Mensaje *</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={update("message")}
                aria-invalid={!!errors.message}
                className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]/20 transition ${errors.message ? "border-destructive focus:border-destructive" : "border-input focus:border-[color:var(--accent)]"}`}
                placeholder="Cuéntanos qué necesitas..."
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
              {sending ? "Enviando..." : sent ? "¡Enviado! Abrimos WhatsApp" : "Enviar por WhatsApp"} <ArrowRight className="size-4" />
            </button>
            <p className="text-xs text-center text-muted-foreground">Atención directa vía WhatsApp · +58 412-6893075</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, value, onChange, error,
}: {
  label: string; name: string; type?: string; required?: boolean;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}{required && " *"}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]/20 transition ${error ? "border-destructive focus:border-destructive" : "border-input focus:border-[color:var(--accent)]"}`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
