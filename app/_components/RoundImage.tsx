import Image from "next/image";

interface RoundImageProps {
  src: string;
  alt: string;
  size?: number;
}

export default function RoundImage({ src, alt, size = 56 }: RoundImageProps) {
  return (
    <div
      className={`relative rounded-full overflow-hidden shadow-sm`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
      ;
    </div>
  );
}
