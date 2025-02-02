import Link from "next/link";
import { IButton } from "../_lib/types";

// Button types
const types = {
  primary: "bg-primary-100 text-white hover:bg-primary-200",
  "outline-primary":
    "bg-transparent text-primary-100  border-2 hover:text-white border-primary-100 hover:bg-primary-100",
  "outline-white":
    "outline-white border-2 text-white hover:bg-white hover:text-primary-100",
};

// Button sizes
const sizes = {
  md: "px-6 py-3  h-12",
  sm: "px-5 py-[10px] py-2 !h-10 text-sm tracking-normal",
  xs: "px-4 py-2 text-xs !font-medium",
};

export default function Button({
  children,
  colour = "primary",
  styles = "",
  size = "md",
  href = "",
  ...rest
}: IButton) {
  const className = `font-semibold rounded-full flex items-center justify-center ${sizes[size]} ${styles} ${types[colour]} `;
  if (href)
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}
