function Row({
  children,
  hasSpacing = true,
  classname = "",
}: {
  children: React.ReactNode;
  hasSpacing?: boolean;
  classname?: string;
}) {
  return (
    <div
      className={` flex flex-wrap ${classname}  ${
        hasSpacing ? "mx-[-15px] gap-y-[30px] *:px-[15px]" : ""
      }`}
    >
      {children}
    </div>
  );
}

function Column({
  children,
  breakPoints = "",
}: {
  children: React.ReactNode;
  breakPoints?: string;
}) {
  return <div className={`w-full ${breakPoints}`}>{children}</div>;
}

Row.Column = Column;
export default Row;
