import ProfileImg from "@/app/_components/ProfileImage";
import Row from "@/app/_components/Row";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import NoResults from "@/app/ui/dashboard/general/NoResults";
import Link from "next/link";
import { BsEnvelope } from "react-icons/bs";
import { getProfession, getProfessionals } from "@/app/_lib/services";

export default async function Professionals({
  params,
}: {
  params: { professionals: string };
}) {
  const res = await getProfessionals(params.professionals);
  const professionals = res?.responseData.professionals;
  const profession = await getProfession(params.professionals);
  return (
    <DashboardScreen title="Professionals" subtitle={`${profession?.name}`}>
      <div>
        {professionals?.length === 0 ? (
          <NoResults
            title="No professionals"
            text="No professionals in this category."
          />
        ) : (
          <div>
            <div>
              <Row>
                {professionals?.map((professional) => (
                  <Row.Column
                    key={professional._id}
                    breakPoints=" lg:w-6/12 ld:w-4/12"
                  >
                    <div className="bg-white border-[1px] border-grey-300 rounded-5 ">
                      <div className="flex items-center gap-x-4 p-4">
                        <ProfileImg
                          src={`${process.env.NEXT_PUBLIC_Host_Name}${professional?.profileImg}`}
                          alt="profile-img"
                          altImg={
                            <h1 className="text-[48px]/[1] font-semibold pointer-events-none uppercase">
                              {professional.firstName.at(0)}
                            </h1>
                          }
                          hasImg={professional?.profileImg ? true : false}
                          size={112}
                        />
                        <div className="flex flex-col gap-y-2">
                          <h3 className="font-medium tracking-normal capitalize text-[18px]/[24px]">{`${professional.lastName} ${professional.firstName}`}</h3>
                          <span className="inline-block text-grey-100 tracking-normal uppercase text-xs font-medium">
                            {professional.yoe} years experience
                          </span>
                        </div>
                      </div>
                      <div className="bg-grey-500 text-grey-100 p-4 text-[15px]/[20px] flex flex-col gap-y-3">
                        <div className="flex items-center gap-x-2">
                          <BsEnvelope size={18} className="text-grey-100" />
                          {professional.email}
                        </div>
                      </div>
                      <div className="px-4 py-6">
                        <Link
                          href={`/dashboard/consult/${params.professionals}/${professional.username}`}
                          className="w-full rounded-full bg-transparent hover:bg-primary-100 hover:text-white border-2 border-primary-100 flex items-center justify-center text-primary-100 font-semibold px-[22px] py-[10px] text-sm"
                        >
                          View profile
                        </Link>
                      </div>
                    </div>
                  </Row.Column>
                ))}
              </Row>
            </div>
          </div>
        )}
      </div>
    </DashboardScreen>
  );
}
