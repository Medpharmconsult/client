import Button from "@/app/_components/Button";
import SpinnerMini from "@/app/_components/SpinnerMini";

export default function SetScheduleButton({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  return (
    <Button disabled={isLoading} classname="min-w-[149px]">
      {isLoading ? <SpinnerMini /> : "Set schedule"}
    </Button>
  );
}
