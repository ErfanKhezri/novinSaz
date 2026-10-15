import { useEffect } from "react";
import { site } from "../data/site";

const defaultDescription =
  "نوین ساز؛ اجاره مبلمان و تجهیزات غرفه نمایشگاه و اتاق جلسه. اجاره روزانه و چهار روزه صندلی، میز، مبلمان، تلویزیون و پاراوان.";

export function usePageMeta(title?: string, description = defaultDescription) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | اجاره مبلمان نمایشگاهی`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
