import { cardType } from "../_lib/types";

export default function Card({ title, styles = "", children }: cardType) {
  return (
    <div
      className={`${styles} bg-white border-grey-300 border-1 rounded-5 overflow-hidden h-full`}
    >
      <div className="bg-grey-500 border-grey-300 border-b-1 pt-4  px-6 pb-6 h-14 text-[18px]/[24px] tracking-normal font-semibold">
        {title}
      </div>
      <div className="py-6 px-4 xs:px-6">{children}</div>
    </div>
  );
}
