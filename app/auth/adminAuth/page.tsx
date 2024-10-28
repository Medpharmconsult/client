import SigninForm from "@/app/ui/auth/signin/SigninForm";

export const metadata = {
  title: "Admin Login",
};
export default function Page() {
  return (
    <div>
      <SigninForm isAdmin={true} />
    </div>
  );
}
