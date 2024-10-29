import Card from "@/app/_components/Card";
import ProfileImg from "@/app/_components/ProfileImage";
import Row from "@/app/_components/Row";
import AppointmentCalendar from "@/app/ui/dashboard/consult/appointment/AppointmentCalendar";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import ChatButton from "@/app/ui/dashboard/consult/ChatButton";
import NoResults from "@/app/ui/dashboard/general/NoResults";
import { getMonthAppointments, getProfessional } from "@/app/_lib/services";
import { getCurrentMonth, getNextMonth } from "@/app/_lib/utilities";
import { BsEnvelope, BsPhone } from "react-icons/bs";

export default async function Professional({
  params,
}: {
  params: { professional: string };
}) {
  const res = await getProfessional(params.professional);
  const professional = res?.responseData.professional;
  const contact = {
    firstName: professional.firstName,
    lastName: professional.lastName,
    email: professional.email,
    contactId: professional._id,
    profileImg: professional.profileImg,
  };
  const currentAppointments = await getMonthAppointments(
    professional?._id,
    getCurrentMonth()
  );

  const nextAppointments = await getMonthAppointments(
    professional?._id,
    getNextMonth()
  );

  if (professional)
    return (
      <DashboardScreen
        title={professional.profession}
        subtitle={`${professional.lastName} ${professional.firstName}`}
      >
        <Row classname="lg:flex-row-reverse ">
          <Row.Column breakPoints="lg:w-7/12 xl:w-8/12">
            <div className="bg-white rounded-[5px] border-[1px] border-grey-300 ">
              <div>
                <div className="flex-wrap flex items-center gap-4 px-4 py-6">
                  <div>
                    <ProfileImg
                      src={`${process.env.NEXT_PUBLIC_Host_Name}${professional?.profileImg}`}
                      alt="prof-img"
                      size={160}
                      hasImg={professional?.profileImg ? true : false}
                      altImg={
                        <h1 className="text-[68px]/[1] font-semibold pointer-events-none uppercase">
                          {professional.firstName.at(0)}
                        </h1>
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h3 className="font-medium tracking-normal lg:text-[28px]/[36px] text-[24px]/[32px]">{`${professional.lastName} ${professional.firstName}`}</h3>
                    <h3 className="text-grey-100 font-medium uppercase text-[14px]/[20px]  tracking-[0.1px]">
                      {professional.yoe} years experience
                    </h3>
                  </div>
                </div>
              </div>
              <ul className="p-4 flex items-center gap-y-2 gap-x-6 flex-wrap bg-grey-500 text-[15px] text-grey-100">
                <li className="flex items-center gap-x-2">
                  <BsEnvelope size={18} className="text-grey-100" />
                  {professional.email}
                </li>
                <li className="flex items-center gap-x-1">
                  <BsPhone size={18} className="text-grey-100" />
                  {professional.phoneNo}
                </li>
              </ul>
              <div className="px-4 py-6">
                <p>
                  {`Hello, my name is ${professional.firstName} ${professional.lastName}. I am a dedicated ${professional.profession} with ${professional.yoe} years of experience, committed to providing the highest standard of medical care. My training and experiences have equipped me with the knowledge and skills necessary to address a wide range of health concerns. I look forward to serving you and ensuring your health and well-being.`}
                </p>
              </div>
              <div className="px-4 py-6 border-t-[1px] border-grey-300">
                <ChatButton contact={contact} />
              </div>
            </div>
          </Row.Column>
          <Row.Column breakPoints="lg:w-5/12 xl:w-4/12">
            <Card title="Book appointment">
              <AppointmentCalendar
                currentAppointments={currentAppointments}
                nextAppointments={nextAppointments}
                profID={professional?._id}
              />
            </Card>
          </Row.Column>
        </Row>
      </DashboardScreen>
    );
  else {
    return (
      <NoResults
        title="Professional not found"
        text="Could not find the required professional."
      />
    );
  }
}
