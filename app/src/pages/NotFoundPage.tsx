import { ButtonLink, Container } from "../components/ui";

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-start justify-center gap-8 py-section">
      <h1 className="text-head font-extrabold tracking-tight">این صفحه پیدا نشد</h1>
      <p className="text-lead">شاید کالا جابه‌جا شده باشد. فهرست کامل کالاها اینجاست:</p>
      <ButtonLink to="/products">دیدن کالاها</ButtonLink>
    </Container>
  );
}
