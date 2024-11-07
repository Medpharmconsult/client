import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  classname?: string;
  colour?: "primary" | "outline-primary" | "outline-white";
  href?: string;
  isLink?: boolean;
}

const btnType = {
  primary: "bg-primary-100 text-white hover:bg-primary-200",
  "outline-primary":
    "bg-transparent text-primary-100  border-2 hover:text-white border-primary-100 hover:bg-primary-100",
  "outline-white":
    "outline-white border-2 text-white hover:bg-white hover:text-primary-100",
};

export default function Button({
  children,
  colour = "primary",
  classname = "",
  isLink = false,
  href = "",
  ...rest
}: ButtonProps) {
  const className = `px-6 py-4 rounded-full font-semibold h-14 flex items-center justify-center ${classname} ${btnType[colour]} `;
  if (!isLink && !href)
    return (
      <button {...rest} className={className}>
        {children}
      </button>
    );
  else
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
}
