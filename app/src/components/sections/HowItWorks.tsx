import { stagger } from "../../lib/stagger";
import { rentalSteps } from "../../data/site";
import { Container } from "../ui";

/** The rental printed as an itinerary on a torn slip. */
export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-field py-section text-field-ink">
      <Container className="grid items-start gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5" data-reveal>
          <h2 id="how-title" className="text-head font-extrabold tracking-tight">
            از سفارش تا برچیدن
          </h2>
          <p className="max-w-[34ch] text-lead">
            شما فقط برگه سفارش را می‌فرستید. بردن، چیدن و جمع کردن با ماست.
          </p>
        </div>

        <div
          className="edge-zigzag w-full max-w-[30rem] justify-self-center bg-paper p-6 text-ink sm:p-8 lg:col-span-6 lg:col-start-7 lg:justify-self-start"
          data-reveal
          style={stagger(1)}
        >
          {rentalSteps.map((step) => (
            <div key={step.when} className="mt-7 first:mt-0">
              <h3 className="mb-3 font-bold">{step.when}</h3>
              <ul className="flex flex-col gap-2.5">
                {step.rows.map((row) => (
                  <li key={row.what} className="flex items-end gap-2">
                    <span>{row.what}</span>
                    <span aria-hidden="true" className="dots-x mb-2 min-w-6 flex-1 text-surface-2" />
                    <span className="shrink-0 text-muted">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="mt-8 flex min-h-11 items-center justify-between gap-4 bg-ink px-4 text-paper">
            <span className="font-bold">غرفه آماده</span>
            <span>بی یک ساعت کار شما</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
