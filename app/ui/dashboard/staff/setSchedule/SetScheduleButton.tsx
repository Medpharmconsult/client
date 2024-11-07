import Button from "@/app/_components/Button";
import SpinnerMini from "@/app/_components/SpinnerMini";

export default function SetScheduleButton({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  return (
    <div className="mt-[6px] gap-4 items-center flex">
      <Button disabled={isLoading}>Set schedule</Button>
      {isLoading && <SpinnerMini fill="#1341A3" />}
    </div>
  );
}
