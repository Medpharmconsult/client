function Row({
  children,
  styles = "",
}: {
  children: React.ReactNode;
  styles?: string;
}) {
  return (
    <div
      className={`flex flex-wrap ${styles} mx-[-7.5px] gap-y-6 *:px-[7.5px]`}
    >
      {children}
    </div>
  );
}

function Column({
  children,
  styles = "",
}: {
  children: React.ReactNode;
  styles?: string;
}) {
  return <div className={`w-full ${styles}`}>{children}</div>;
}

Row.Column = Column;
export default Row;
