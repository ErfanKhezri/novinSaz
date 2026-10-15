import type { ProductSpec } from "../../data/types";

/** Specifications as a printed table: label on the right, value on the left. */
export function SpecList({ specs, options }: { specs: ProductSpec[]; options?: string[] }) {
  const rows = options?.length ? [...specs, { label: "رنگ‌ها", value: options.join("، ") }] : specs;

  return (
    <table className="w-full text-body">
      <caption className="sr-only">مشخصات</caption>
      <tbody>
        {rows.map((spec) => (
          <tr key={spec.label} className="odd:bg-surface">
            <th scope="row" className="py-3 ps-4 pe-6 text-start font-normal text-muted">
              {spec.label}
            </th>
            <td className="py-3 pe-4 text-end font-medium">{spec.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
