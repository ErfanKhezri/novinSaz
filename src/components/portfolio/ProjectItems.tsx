import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import { products } from "../../data/products";
import { formatNumber } from "../../utils/formatPrice";

export function ProjectItems({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {project.items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        return (
          <li key={item.productId}>
            <Link
              to={`/products/${product.slug}`}
              className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-3 py-1 text-small text-navy-900 transition-colors hover:border-navy-900"
            >
              {product.name}
              <span className="text-muted">× {formatNumber(item.quantity)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
