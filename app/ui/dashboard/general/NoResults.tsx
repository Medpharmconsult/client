export default function NoResults({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-5 border-grey-300 border-1 py-8 px-0 xs:px-4">
      <div className=" flex flex-col gap-y-3 text-center">
        <h1 className="lg:text-[28px]/[36px] text-[24px]/[32px] text-primary-100 font-bold">
          {title}
        </h1>
        <p>{text}</p>
      </div>
    </div>
  );
}
