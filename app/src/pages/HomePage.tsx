import {
  CatalogueList,
  ContactCoupon,
  Faq,
  Hero,
  HowItWorks,
  Letter,
  PackageMenu,
  Showcase,
} from "../components/sections";

export function HomePage() {
  return (
    <>
      <Hero />
      <CatalogueList />
      <Showcase />
      <HowItWorks />
      <PackageMenu />
      <Letter />
      <Faq />
      <ContactCoupon />
    </>
  );
}
