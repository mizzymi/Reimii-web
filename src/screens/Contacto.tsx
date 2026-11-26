'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Clock3, Mail, MapPin, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../components/i18n/LanguageContext';
import { useTheme } from '../components/ThemeContext';

const CONTACT_EMAIL = 'shop@reimii.com';

export default function Contacto() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const c = t.contactPage;
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(c.errorMsg);
      return;
    }

    const subject = encodeURIComponent(`Contacto de ${form.name}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\nMensaje:\n${form.message}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
    toast.success(c.successMsg);
  };

  const pageBg = isDark ? 'bg-[#151218]' : 'bg-[#f7f1e9]';
  const titleColor = isDark ? 'text-white' : 'text-[#272229]';
  const bodyColor = isDark ? 'text-[#ded4e0]' : 'text-[#594d55]';
  const labelColor = isDark ? 'text-white/70' : 'text-[#51484d]';
  const mutedColor = isDark ? 'text-[#c9bdcd]' : 'text-[#62555e]';

  const surface = isDark
    ? 'border-white/8 bg-white/[0.04]'
    : 'border-white bg-white/72 shadow-[0_25px_75px_rgba(83,61,72,0.08)]';

  const inputClass = isDark
    ? 'border-[#88798c] bg-white/[0.045] text-white placeholder:text-[#c4b8c7] focus-visible:border-[#f2b7d4]/50 focus-visible:ring-[#f2b7d4]/15'
    : 'border-[#9a8693] bg-[#fffafc]/90 text-[#272229] placeholder:text-[#665961] focus-visible:border-[#d884ae] focus-visible:ring-[#f2b7d4]/25';

  return (
    <main
      className={`relative min-h-screen overflow-hidden pb-24 pt-28 transition-colors duration-500 lg:pb-32 lg:pt-36 ${pageBg}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-500/10' : 'bg-[#efbdd4]/40'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-20 top-[30rem] h-96 w-96 rounded-full blur-3xl ${
          isDark ? 'bg-violet-500/10' : 'bg-[#d9c6f2]/45'
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.header
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-4xl"
        >
          <div
            className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
              isDark
                ? 'border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]'
                : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#86345e]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {c.subtitle}
          </div>

          <h1
            className={`text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl ${titleColor}`}
          >
            {c.title}
          </h1>

          <p className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg ${bodyColor}`}>
            {c.description}
          </p>
        </motion.header>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <motion.section
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className={`overflow-hidden rounded-[2.5rem] border ${surface}`}
          >
            {sent ? (
              <div className="flex min-h-[580px] items-center justify-center px-6 py-16 text-center sm:px-10">
                <div className="max-w-lg">
                  <div
                    className={`mx-auto grid h-20 w-20 place-items-center rounded-full border ${
                      isDark
                        ? 'border-[#f2b7d4]/25 bg-[#f2b7d4]/10'
                        : 'border-[#e7a8c7]/50 bg-[#fceaf3]'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-9 w-9 ${isDark ? 'text-[#f2b7d4]' : 'text-[#8e3864]'}`}
                    />
                  </div>

                  <h2
                    className={`mt-7 text-3xl font-black tracking-[-0.045em] sm:text-4xl ${titleColor}`}
                  >
                    {c.sent}
                  </h2>

                  <p className={`mt-4 text-base leading-7 ${bodyColor}`}>{c.sentDesc}</p>

                  <Button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: '', email: '', message: '' });
                    }}
                    className={`mt-8 h-12 rounded-full border-0 px-7 text-sm font-bold ${
                      isDark
                        ? 'bg-[#f2b7d4] text-[#261d24] hover:bg-[#fac8df]'
                        : 'bg-[#282329] text-white hover:bg-[#8e3864]'
                    }`}
                  >
                    {c.sendAnother}
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-9 lg:p-11">
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.17em] ${
                      isDark ? 'text-[#f2b7d4]' : 'text-[#86345e]'
                    }`}
                  >
                    Escríbenos
                  </p>
                  <h2
                    className={`mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl ${titleColor}`}
                  >
                    Cuéntanos tu idea
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className={`mb-2 block text-sm font-semibold ${labelColor}`}
                    >
                      {c.name}
                    </label>
                    <Input
                      id="contact-name"
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder={c.namePlaceholder}
                      className={`h-13 rounded-[1rem] px-4 ${inputClass}`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className={`mb-2 block text-sm font-semibold ${labelColor}`}
                    >
                      {c.email}
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="tu@email.com"
                      className={`h-13 rounded-[1rem] px-4 ${inputClass}`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className={`mb-2 block text-sm font-semibold ${labelColor}`}
                  >
                    {c.message}
                  </label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    placeholder={c.messagePlaceholder}
                    rows={8}
                    className={`min-h-[220px] resize-none rounded-[1.2rem] p-4 ${inputClass}`}
                  />
                </div>

                <Button
                  type="submit"
                  className={`h-13 group w-full rounded-full border-0 text-sm font-bold shadow-none ${
                    isDark
                      ? 'bg-[#f2b7d4] text-[#261d24] hover:bg-[#fac8df]'
                      : 'bg-[#282329] text-white hover:bg-[#8e3864]'
                  }`}
                >
                  <Send className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  {c.send}
                </Button>
              </form>
            )}
          </motion.section>

          <motion.aside
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-5"
          >
            <div className={`rounded-[1.8rem] border p-6 ${surface}`}>
              <div
                className={`grid h-12 w-12 place-items-center rounded-[1rem] border ${
                  isDark
                    ? 'border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]'
                    : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#86345e]'
                }`}
              >
                <Mail className="h-5 w-5" />
              </div>

              <h3 className={`mt-5 text-xl font-black tracking-[-0.03em] ${titleColor}`}>
                {c.email}
              </h3>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`mt-2 inline-block text-sm transition-colors ${
                  isDark
                    ? 'text-[#d3c8d5] hover:text-[#f2b7d4]'
                    : 'text-[#594d55] hover:text-[#8e3864]'
                }`}
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className={`rounded-[1.8rem] border p-6 ${surface}`}>
              <div
                className={`grid h-12 w-12 place-items-center rounded-[1rem] border ${
                  isDark
                    ? 'border-[#d9c6f2]/20 bg-[#d9c6f2]/10 text-[#d9c6f2]'
                    : 'border-[#d9c6f2]/55 bg-[#eee7f8] text-[#614387]'
                }`}
              >
                <MapPin className="h-5 w-5" />
              </div>

              <h3 className={`mt-5 text-xl font-black tracking-[-0.03em] ${titleColor}`}>
                {c.location}
              </h3>

              <p className={`mt-2 text-sm leading-6 ${bodyColor}`}>{c.locationDesc}</p>
            </div>

            <div
              className={`relative overflow-hidden rounded-[1.8rem] border p-6 ${
                isDark
                  ? 'border-amber-300/12 bg-amber-300/[0.055]'
                  : 'border-[#efdfbf] bg-[#fff8ea]/85'
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl ${
                  isDark ? 'bg-amber-300/10' : 'bg-[#f3d89f]/35'
                }`}
              />

              <div className="relative z-10">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-[1rem] border ${
                    isDark
                      ? 'border-amber-300/20 bg-amber-300/10 text-amber-300'
                      : 'border-[#f1cf92]/55 bg-[#fff1d8] text-[#785016]'
                  }`}
                >
                  <Clock3 className="h-5 w-5" />
                </div>

                <h3 className={`mt-5 text-xl font-black tracking-[-0.03em] ${titleColor}`}>
                  {c.fastReply}
                </h3>

                <p className={`mt-2 text-sm leading-6 ${bodyColor}`}>{c.fastReplyDesc}</p>
              </div>
            </div>

            <p className={`px-2 text-xs leading-5 ${mutedColor}`}>
              Al enviar el formulario se abrirá tu aplicación de correo con el mensaje preparado.
            </p>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
