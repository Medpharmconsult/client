const headingType = {
  h1: "lg:text-[45px]/[52px] font-bold text-[36px]/[44px]",
  h2: "lg:text-[36px]/[44px] font-bold text-[32px]/[40px]",
  h3: "lg:text-[32px]/[40px] font-bold text-[28px]/[36px]",
  h4: "lg:text-[28px]/[36px] text-[24px]/[32px] font-medium",
};

export default function Heading({
  children,
  classname,
  type = "h4",
}: {
  children: React.ReactNode;
  classname?: string;
  type?: "h1" | "h2" | "h3" | "h4";
}) {
  const className = ` tracking-normal ${classname} ${headingType[type]} `;
  return <h1 className={className}>{children}</h1>;
}
