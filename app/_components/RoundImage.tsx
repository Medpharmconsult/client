import Image from "next/image";
import { roundImage } from "../_lib/types";

export default function RoundImage({
  src,
  alt,
  size = 56,
  priority,
}: roundImage) {
  return (
    <div className={`relative rounded-full overflow-hidden`}>
      <Image
        src={src ? src : ""}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
      />
    </div>
  );
}
