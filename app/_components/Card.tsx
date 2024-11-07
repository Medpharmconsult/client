export default function Card({
  title,
  classname = "",
  spacing = true,
  children,
}: {
  title: string;
  classname?: string;
  spacing?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${classname} bg-white border-grey-300 border-1 rounded-5 overflow-hidden`}
    >
      <div className="bg-grey-500 border-grey-300 border-b-1 p-4 h-14 text-[18px]/[24px] tracking-normal font-semibold">
        {title}
      </div>
      <div className={`${spacing ? "px-4 py-8" : ""}`}>{children}</div>
    </div>
  );
}
