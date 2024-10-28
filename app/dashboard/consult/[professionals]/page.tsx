import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import ProfileImg from "@/app/_components/ProfileImage";
import Row from "@/app/_components/Row";
import Link from "next/link";
import { getProfessionals } from "@/app/_lib/services";
import { BsEnvelope } from "react-icons/bs";
import NoResults from "@/app/ui/dashboard/general/NoResults";

export default async function Professionals({
  params,
}: {
  params: { professionals: string };
}) {
  const res = await getProfessionals(params.professionals);
  const professionals = res?.responseData.professionals;
  return (
    <DashboardScreen
      title="Professionals"
      subtitle={`${professionals?.[0] ? professionals[0].profession : ""}`}
    >
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
                    breakPoints=" lg:w-[50%] ld:w-[33.333333%]"
                  >
                    <div className="bg-white border-[1px] border-grey-300 rounded-[5px] ">
                      <div className="flex items-center gap-x-[16px] p-[16px]">
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
                        <div className="flex flex-col gap-y-[8px]">
                          <h3 className="font-medium tracking-normal text-[18px]/[24px]">{`${professional.lastName} ${professional.firstName}`}</h3>
                          <span className="inline-block text-grey-100 tracking-normal uppercase text-[12px]/[16px] font-medium">
                            {professional.yoe} years experience
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#f4f4f4] text-grey-100 p-[16px] text-[15px]/[20px] flex flex-col gap-y-[12px]">
                        <div className="flex items-center gap-x-[8px]">
                          <BsEnvelope size={18} className="text-grey-100" />
                          {professional.email}
                        </div>
                      </div>
                      <div className="px-[16px] py-[24px]">
                        <Link
                          href={`/dashboard/consult/${params.professionals}/${professional.username}`}
                          className="w-full rounded-full bg-transparent hover:bg-primary-100 hover:text-white border-[2px] border-primary-100 flex items-center justify-center text-primary-100 font-semibold px-[22px] py-[10px] text-[14px]/[20px]"
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
