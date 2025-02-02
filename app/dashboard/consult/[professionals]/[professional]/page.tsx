import AdminScreen from "@/app/_components/AdminScreen";
import Card from "@/app/_components/Card";
import ChatButton from "@/app/_components/ChatButton";
import NoResults from "@/app/_components/NoResults";
import ProfileImg from "@/app/_components/ProfileImage";
import Row from "@/app/_components/Row";
import AppointmentBox from "@/app/_components/AppointmentBox";
import { fetchAppointments, fetchProfessional } from "@/app/_lib/services";
import { professionalType } from "@/app/_lib/types";
import { fetchMonth } from "@/app/_lib/utilities";

export const metadata = {
  title: "Professional",
};

export default async function Page({
  params,
}: {
  params: { professional: string };
}) {
  // Fetch professional
  const data = await fetchProfessional(params.professional);
  const professional = data.responseData.professional;

  return (
    <div>
      {data.statusCode === 200 && (
        <div>
          {professional ? (
            <Professional data={professional} />
          ) : (
            <NoResults
              title="Professional not found"
              text="Could not find the required professional."
            />
          )}
        </div>
      )}
    </div>
  );
}

async function Professional({ data }: { data: professionalType }) {
  // Fetch appointments
  const current = await fetchAppointments(data._id, fetchMonth());
  const next = await fetchAppointments(data._id, fetchMonth(1));
  let appointments;
  if (current && next)
    appointments = {
      current,
      next,
    };
  // Contact info
  const contactInfo = {
    username: `${data.lastName} ${data.firstName}`,
    id: data._id,
    profileImg: data.profileImg ?? "",
  };
  return (
    <AdminScreen
      title="Professional"
      subtitle={`${data.lastName} ${data.firstName}`}
    >
      <Row styles="lg:flex-row-reverse ">
        <Row.Column styles="lg:w-7/12 xl:w-8/12">
          <div className="bg-white rounded-5 border-1 border-grey-300 pb-6">
            <div>
              <div className=" flex items-center gap-4 px-4 xs:px-6 flex-wrap py-6">
                <div>
                  <ProfileImg
                    src={
                      data.profileImg &&
                      `${process.env.NEXT_PUBLIC_Host_Name}${data.profileImg}`
                    }
                    alt="prof-img"
                    size={160}
                    altImg={
                      <h1 className="text-[68px]/[1] font-semibold pointer-events-none uppercase">
                        {data.firstName.at(0)}
                      </h1>
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <h3 className="font-medium tracking-normal capitalize text-[24px]/[32px]">{`${data.lastName} ${data.firstName}`}</h3>
                  <h3 className="text-grey-100 font-medium uppercase text-sm ">
                    {data.yoe} years experience
                  </h3>
                  <ChatButton contact={contactInfo} />
                </div>
              </div>
            </div>
            <ul className="px-4 xs:px-6 py-4 flex items-center gap-y-2 gap-x-6 flex-wrap bg-grey-500 text-[15px] text-grey-100">
              <li className="flex items-center gap-x-1">
                <p className="font-semibold">Email: </p>
                {data.email}
              </li>
              <li className="flex items-center gap-x-1">
                <p className="font-semibold">Phone: </p>
                {data.phoneNo}
              </li>
            </ul>
            <div className="px-4 xs:px-6 py-6">
              <h3 className="text-[18px]/[24px] font-semibold tracking-normal mb-2">
                About
              </h3>
              <p>
                {`Hello, my name is ${data.lastName} ${data.firstName}. I am a dedicated ${data.profession} with ${data.yoe} years of experience, committed to providing the highest standard of medical care. My training and experiences have equipped me with the knowledge and skills necessary to address a wide range of health concerns. I look forward to serving you and ensuring your health and well-being.`}
              </p>
            </div>
          </div>
        </Row.Column>
        <Row.Column styles="lg:w-5/12 xl:w-4/12">
          <Card title="Book appointment" styles="!h-auto">
            {appointments && (
              <AppointmentBox id={data._id} data={appointments} />
            )}
          </Card>
        </Row.Column>
      </Row>
    </AdminScreen>
  );
}
