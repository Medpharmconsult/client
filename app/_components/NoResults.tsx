export default function NoResults({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-5 border-grey-300 border-1 py-6 px-4 xs:px-6">
      <div className=" flex flex-col gap-y-2 text-center py-4">
        <h1 className="lg:text-[28px]/[36px] text-[24px]/[32px] text-primary-100 font-bold">
          {title}
        </h1>
        <p>{text}</p>
      </div>
    </div>
  );
}
