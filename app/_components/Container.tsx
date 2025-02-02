import { containerType } from "../_lib/types";

export default function Container({ children, styles = "" }: containerType) {
  return (
    <div
      className={`container mx-auto ${styles} px-[15px] max-w-full md:max-w-[1400px]`}
    >
      {children}
    </div>
  );
}
