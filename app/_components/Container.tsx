interface ContainerProps {
  children: React.ReactNode;
  classname?: string;
}

export default function Container({
  children,
  classname = "",
}: ContainerProps) {
  return (
    <div
      className={`container mx-auto ${classname} px-[15px] max-w-full md:max-w-[1400px]`}
    >
      {children}
    </div>
  );
}
