export default function Card({
  title,
  classname,
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
      className={`${
        classname && classname
      } bg-white border-grey-300 border-[1px] rounded-[5px] overflow-hidden`}
    >
      <div className="bg-[#f4f4f4] border-grey-300 border-b-[1px] p-[16px] max-h-[56px] text-[18px]/[24px] tracking-normal font-semibold">
        {title}
      </div>
      <div className={`${spacing && "px-[16px] py-[32px]"}`}>{children}</div>
    </div>
  );
}
