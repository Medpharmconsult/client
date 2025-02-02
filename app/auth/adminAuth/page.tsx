import SigninForm from "@/app/_components/SigninForm";

export const metadata = {
  title: "Sign In",
};
export default function Page() {
  return (
    <div>
      <SigninForm admin={true} />
    </div>
  );
}
