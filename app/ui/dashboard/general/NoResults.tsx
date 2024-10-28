export default function NoResults({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-[5px] border-grey-300 border-[1px] py-[32px] px-0 xs:px-[16px]">
      <div className=" flex flex-col gap-y-[12px] text-center">
        <h1 className="lg:text-[28px]/[36px] text-[24px]/[32px] text-primary-100 font-bold">
          {title}
        </h1>
        <p>{text}</p>
      </div>
    </div>
  );
}
