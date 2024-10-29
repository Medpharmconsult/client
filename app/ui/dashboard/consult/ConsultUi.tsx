import Row from "@/app/_components/Row";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import Card from "@/app/_components/Card";
import Link from "next/link";
import RecentChats from "@/app/ui/dashboard/general/RecentChats";
import { getProfessions } from "@/app/_lib/services";

export default async function ConsultUi() {
  const res = await getProfessions();
  const professions = res?.responseData;
  return (
    <DashboardScreen title="Dashboard">
      <Row>
        <Row.Column breakPoints="lg:w-[50%]">
          <Card title="Consult professionals" spacing={false}>
            <div className="p-4">
              <div className="overflow-x-auto grid grid-cols-[repeat(1,minmax(0,1fr))]">
                <table className="w-full ">
                  <thead>
                    <tr className="bg-[#f6f7f9] *:px-4 *:py-[18px] *:whitespace-nowrap *:text-left">
                      <th>Profession</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {professions?.map((prof) => (
                      <tr
                        className="last:border-b-0 border-grey-300 border-b-[1px] *:px-4 *:whitespace-nowrap"
                        key={prof._id}
                      >
                        <td className="first-letter:capitalize py-[18px]">
                          {prof.name}
                        </td>
                        <td className="py-[10px]">
                          <Link
                            href={`/dashboard/consult/${prof.code}`}
                            className="rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center text-white font-semibold px-[22px] py-[10px] text-[14px]/[20px] max-w-[98px]"
                          >
                            Consult
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Row.Column>
        <Row.Column breakPoints="lg:w-[50%]">
          <Card title="Recent chats" spacing={false}>
            <RecentChats />
          </Card>
        </Row.Column>
      </Row>
    </DashboardScreen>
  );
}
