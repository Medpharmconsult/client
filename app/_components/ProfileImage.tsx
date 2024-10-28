import RoundImage from "./RoundImage";

export default function ProfileImg({
  src = "",
  size,
  alt,
  altImg,
  hasImg,
}: {
  src?: string;
  size: number;
  alt: string;
  altImg: React.ReactElement;
  hasImg: boolean;
}) {
  return (
    <>
      {hasImg && src ? (
        <RoundImage size={size} src={src} alt={alt} />
      ) : (
        <div
          className="rounded-full overflow-hidden flex items-center justify-center bg-pink-600"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          {altImg}
        </div>
      )}
    </>
  );
}
