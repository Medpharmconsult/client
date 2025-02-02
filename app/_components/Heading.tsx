import { headingType } from "../_lib/types";

const types = {
  h1: "lg:text-[45px]/[52px]  font-bold text-[36px]/[44px]",
  h2: "lg:text-[36px]/[44px] font-bold text-[32px]/[40px]",
  h3: "lg:text-[32px]/[40px] font-bold text-[28px]/[36px]",
  h4: "lg:text-[28px]/[36px] text-[24px]/[32px] font-medium",
};

export default function Heading({
  children,
  styles,
  type = "h4",
}: headingType) {
  return (
    <h1 className={`tracking-normal ${styles} ${types[type]}`}>{children}</h1>
  );
}
