import RoundImage from "./RoundImage";
import { IProfileImg } from "../_lib/types";

export default function ProfileImg({
  src = "",
  size,
  alt,
  altImg,
  priority,
}: IProfileImg) {
  return (
    <div>
      {src ? (
        <RoundImage size={size} src={src} alt={alt} priority={priority} />
      ) : (
        <div
          className={`rounded-full overflow-hidden flex items-center justify-center bg-pink-600`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          {altImg}
        </div>
      )}
    </div>
  );
}
