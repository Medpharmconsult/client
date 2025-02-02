import AdminScreen from "../_components/AdminScreen";
import Spinner from "../_components/Spinner";

export default function Loading() {
  return (
    <AdminScreen styles="min-h-dvh flex justify-center items-center">
      <div className="h-full w-full">
        <Spinner fill="#1341A3" size={40} />
      </div>
    </AdminScreen>
  );
}
