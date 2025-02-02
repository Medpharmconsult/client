import Button from "./Button";
import NoResults from "./NoResults";
import ProfileImg from "./ProfileImage";
import Row from "./Row";
import { professionalType } from "../_lib/types";

export default function ProfessionalsList({
  data,
  code,
}: {
  data: professionalType[];
  code: string;
}) {
  return (
    <div>
      {data.length === 0 ? (
        <NoResults
          title="No professionals"
          text="No professionals in this category."
        />
      ) : (
        <div>
          <Row styles="!gap-y-[15px]">
            {data.map((professional) => (
              <Row.Column
                key={professional._id}
                styles=" lg:w-6/12 cxxl:w-4/12"
              >
                <div className="bg-white border-[1px] border-grey-300 rounded-5 ">
                  <div className="flex items-center gap-x-4 py-4 xs:px-6 px-4">
                    <ProfileImg
                      src={
                        professional.profileImg &&
                        `${process.env.NEXT_PUBLIC_Host_Name}${professional.profileImg}`
                      }
                      alt="profile-img"
                      altImg={
                        <h1 className="text-[48px]/[1] font-semibold pointer-events-none uppercase">
                          {professional.firstName.at(0)}
                        </h1>
                      }
                      size={112}
                    />
                    <div className="flex flex-col gap-y-2">
                      <h3 className="font-medium tracking-normal capitalize text-[18px]/[24px]">{`${professional.lastName} ${professional.firstName}`}</h3>
                      <span className="inline-block text-grey-100 text-xs uppercase font-medium">
                        {professional.yoe} years experience
                      </span>
                    </div>
                  </div>
                  <div className="bg-grey-500 text-grey-100 py-4 xs:px-6 px-4  text-[15px]/[20px] flex flex-col gap-y-3">
                    <div className="flex items-center gap-x-1">
                      <p className="font-semibold">Email:</p>
                      {professional.email}
                    </div>
                  </div>
                  <div className="px-4 xs:px-6 py-6">
                    <Button
                      size="sm"
                      colour="outline-primary"
                      href={`/dashboard/consult/${code}/${professional.username}`}
                    >
                      View profile
                    </Button>
                  </div>
                </div>
              </Row.Column>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}
