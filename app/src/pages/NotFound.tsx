import { ButtonLink } from "../components/ui/Button";
import { Container } from "../components/ui/Container";

export function NotFound() {
  return (
    <Container className="flex flex-col items-center py-section text-center">
      <h1 className="text-h1 font-extrabold text-navy-900">صفحه پیدا نشد</h1>
      <p className="mt-3 text-muted">صفحه‌ای که دنبالش هستید وجود ندارد یا جابه‌جا شده است.</p>
      <ButtonLink to="/products" className="mt-8">
        مشاهده محصولات
      </ButtonLink>
    </Container>
  );
}
