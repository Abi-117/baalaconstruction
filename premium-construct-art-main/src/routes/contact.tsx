import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND, IMAGES } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BAALA Constructions" },
      {
        name: "description",
        content:
          "Get in touch with BAALA Constructions. Studio address, phone, email and a project enquiry form.",
      },
      { property: "og:title", content: "Contact — BAALA Constructions" },
      {
        property: "og:description",
        content: "Send us a note — we'll get in touch within one business day.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    projectType: "Residential — new build",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = `🏗️ *New Project Enquiry*

 *Name:* ${form.name}

 *Email:* ${form.email}

 *Phone:* ${form.phone}

 *Location:* ${form.location}

 *Project Type:* ${form.projectType}

📝 *Project Details:*
${form.message}
`;

    const whatsappNumber = BRAND.phone.replace(/\D/g, "");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    setSent(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      projectType: "Residential — new build",
      message: "",
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="Let's begin a conversation."
        subtitle="Tell us a little about your project — we'll respond within one business day to schedule your studio consultation."
        image={IMAGES.blueprint}
      />

      <section className="section-y bg-[var(--color-background)]">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-20">

          {/* Left Side */}

          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">Studio</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="display-h mt-6 text-4xl md:text-5xl">
                Come and see us.
              </h2>
            </Reveal>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Studio",
                  value: BRAND.address,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: BRAND.phone,
                  href: `tel:${BRAND.phone.replace(/\s/g, "")}`,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: BRAND.email,
                  href: `mailto:${BRAND.email}`,
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: BRAND.hours,
                },
              ].map((r, i) => (
                <Reveal key={r.label} delay={0.1 + i * 0.08}>
                  <div className="flex items-start gap-4 border-b border-[var(--color-border)] pb-6">

                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-primary)]">
                      <r.icon size={16} />
                    </span>

                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-body)]/60">
                        {r.label}
                      </div>

                      {r.href ? (
                        <a
                          href={r.href}
                          className="mt-1 block font-display text-lg text-[var(--color-heading)] link-underline"
                        >
                          {r.value}
                        </a>
                      ) : (
                        <div className="mt-1 font-display text-lg text-[var(--color-heading)]">
                          {r.value}
                        </div>
                      )}
                    </div>

                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]"
              >
                Open in maps
                <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>

          {/* Form */}

          <div className="md:col-span-7">

            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              onSubmit={handleSubmit}
              className="rounded-sm border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)] md:p-12"
            >
              {sent ? (
                <div className="grid place-items-center py-16 text-center">

                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-primary)] text-white">
                    <Check size={22} />
                  </span>

                  <h3 className="mt-6 font-display text-2xl text-[var(--color-heading)]">
                    Thanks — message received.
                  </h3>

                  <p className="mt-3 max-w-sm text-sm text-[var(--color-body)]">
                    Your enquiry has been opened in WhatsApp. Kindly press
                    <strong> Send </strong>
                    to reach us instantly.
                  </p>

                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-[var(--color-heading)]">
                    Project enquiry
                  </h3>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">

  <Field
    label="Full name"
    id="name"
    required
    form={form}
    setForm={setForm}
  />

  <Field
    label="Email"
    id="email"
    type="email"
    required
    form={form}
    setForm={setForm}
  />

  <Field
    label="Phone"
    id="phone"
    form={form}
    setForm={setForm}
  />

  <Field
    label="Location"
    id="location"
    form={form}
    setForm={setForm}
  />

  <div className="sm:col-span-2">
    <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-[var(--color-body)]/70">
      Project type
    </label>

    <select
      value={form.projectType}
      onChange={(e) =>
        setForm({
          ...form,
          projectType: e.target.value,
        })
      }
      className="w-full border-b border-[var(--color-border)] bg-transparent py-3 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:outline-none"
    >
      <option>Residential — new build</option>
      <option>Villa / Bungalow</option>
      <option>Commercial</option>
      <option>Renovation</option>
      <option>Interior design</option>
      <option>PMC / Consulting</option>
    </select>
  </div>

  <div className="sm:col-span-2">
    <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-[var(--color-body)]/70">
      Tell us about your project
    </label>

    <textarea
      rows={5}
      value={form.message}
      onChange={(e) =>
        setForm({
          ...form,
          message: e.target.value,
        })
      }
      placeholder="Site, plot size, timelines, references..."
      className="w-full resize-none border-b border-[var(--color-border)] bg-transparent py-3 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:outline-none"
    />
  </div>

</div>

<button type="submit" className="btn-primary mt-10">
  Send enquiry
  <ArrowUpRight size={16} />
</button>

                </>
              )}
            </motion.form>

          </div>

        </div>
      </section>
    </>
  );
}

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

function Field({
  label,
  id,
  type = "text",
  required,
  form,
  setForm,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-[var(--color-body)]/70"
      >
        {label}

        {required && (
          <span className="ml-1 text-[var(--color-primary)]">*</span>
        )}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={form[id]}
        onChange={(e) =>
          setForm((prev: any) => ({
            ...prev,
            [id]: e.target.value,
          }))
        }
        className="w-full border-b border-[var(--color-border)] bg-transparent py-3 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:outline-none"
      />
    </div>
  );
}
