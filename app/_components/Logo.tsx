import Image from "next/image";
import Link from "next/link";
import LogoAlt from "@/public/logo/logoAlt.svg";

export default function Logo({ src = LogoAlt }: { src?: string }) {
  return (
    <Link href="/" className="inline-block">
      <Image src={src} alt="site-logo" priority />
    </Link>
  );
}
