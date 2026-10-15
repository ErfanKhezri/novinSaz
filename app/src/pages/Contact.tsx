import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Input } from "../components/ui/Input";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Textarea } from "../components/ui/Textarea";
import { site } from "../data/site";
import { whatsappLink } from "../utils/whatsapp";

const contactItems = [
  { label: "تلفن", value: site.phone, href: site.phoneLink },
  { label: "واتس‌اپ", value: site.whatsappDisplay, href: `https://wa.me/${site.whatsapp}` },
  { label: "اینستاگرام", value: `${site.instagram}@`, href: `https://instagram.com/${site.instagram}` },
  { label: "نشانی", value: site.address },
  { label: "ساعت کاری", value: site.hours },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", company: "", message: "" });

  const update = (key: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm({ ...form, [key]: event.target.value });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = [
      `سلام ${site.name}،`,
      form.message,
      `نام: ${form.name}`,
      `تلفن: ${form.phone}`,
      form.company && `شرکت: ${form.company}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(text), "_blank");
  };

  return (
    <section className="py-section-sm sm:py-section">
      <Container>
        <SectionTitle
          as="h1"
          title="تماس با ما"
          subtitle="برای استعلام موجودی و قیمت، فرم را پر کنید یا مستقیم تماس بگیرید."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="p-6 lg:col-span-2">
            <ul className="divide-y divide-line">
              {contactItems.map((item) => (
                <li key={item.label} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
                  <span className="text-small text-muted">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="font-bold text-navy-900 transition-colors hover:text-gold-600"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-bold text-navy-900">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 lg:col-span-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input id="name" label="نام و نام خانوادگی" required value={form.name} onChange={update("name")} />
                <Input id="phone" label="شماره تماس" type="tel" required value={form.phone} onChange={update("phone")} />
              </div>
              <Input id="company" label="نام شرکت" value={form.company} onChange={update("company")} />
              <Textarea
                id="message"
                label="پیام"
                placeholder="اقلام موردنیاز، تاریخ و محل نمایشگاه"
                required
                value={form.message}
                onChange={update("message")}
              />
              <Button type="submit" variant="accent">
                ارسال در واتس‌اپ
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
