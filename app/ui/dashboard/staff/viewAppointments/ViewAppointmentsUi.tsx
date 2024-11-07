"use client";
import Form from "@/app/_components/Form";
import NoResults from "../../general/NoResults";
import { timeMap } from "@/app/_lib/utilities";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight, BsSearch } from "react-icons/bs";

export default function ViewAppointmentsUi({
  appointments,
}: {
  appointments: {
    year: number;
    month: string;
    day: number;
    startTime: number;
    endTime: number;
    patientData: {
      firstName: string;
      lastName: string;
    };
  }[];
}) {
  const [search, setSearch] = useState("");
  const tableHeadings = ["Patient name", "Date", "Start time", "End time"];
  const PAGE_SIZE = 10;
  const mainAppointments = appointments
    ?.map((app) => app)
    ?.sort(
      (a, b): number =>
        new Date(`${b.month} ${b.day} ${b.year}`).getTime() -
        new Date(`${a.month} ${a.day} ${a.year}`).getTime()
    );
  const sortedAppointments = mainAppointments?.filter(
    (app) =>
      (app.patientData.lastName + app.patientData.firstName)
        .toLowerCase()
        .includes(search.replace(/\s+/g, "").toLowerCase()) ||
      (app.patientData.firstName + app.patientData.lastName)
        .toLowerCase()
        .includes(search.replace(/\s+/g, "").toLowerCase()) ||
      (app.month + app.day + app.year)
        .toLowerCase()
        .includes(search.replace(/\s+/g, "").toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(sortedAppointments?.length / PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = mainAppointments?.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );
  const startCount = mainAppointments.indexOf(currentData[0]) + 1;
  const endCount =
    mainAppointments.indexOf(currentData[currentData.length - 1]) + 1;
  const data = search ? sortedAppointments : currentData;
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((c) => c + 1);
    window.scrollTo({ top: 0 });
  };
  const handleSetPage = (value: number) => {
    if (currentPage !== value) setCurrentPage(value);
    window.scrollTo({ top: 0 });
  };
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((c) => c - 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      {appointments?.length === 0 ? (
        <NoResults
          title="No appointments"
          text="Your appointment schedule is empty."
        />
      ) : (
        <div className="bg-white rounded-[5px] p-4 border-grey-300 border-1 ">
          {appointments?.length >= 5 && (
            <div className="pb-4">
              <div className=" relative">
                <BsSearch
                  size={18}
                  className="text-grey-100 absolute left-4 top-1/2 translate-y-[-50%]"
                />
                <Form.Input
                  placeholder="Search"
                  classname="pl-[42px] w-full"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            </div>
          )}
          {sortedAppointments.length === 0 && appointments.length > 0 ? (
            <h3 className=" pt-4 pb-8 text-center text-primary-100 text-[18px]/[24px] font-bold tracking-normal">
              No results
            </h3>
          ) : (
            <div>
              <div className=" overflow-x-auto grid grid-cols-[repeat(1,minmax(0,1fr))]">
                <table className="w-full ">
                  <thead>
                    <tr className=" bg-grey-700">
                      {tableHeadings.map((th, index) => (
                        <th
                          key={index}
                          className="px-4 py-[18px] whitespace-nowrap  text-left "
                        >
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((appointment, index) => (
                      <tr
                        key={index}
                        className="border-grey-300 border-b-1 *:text-left last:border-b-0  *:border-grey-300 *:whitespace-nowrap *:px-4 *:py-[18px]"
                      >
                        <td>
                          {`${appointment.patientData.lastName} ${appointment.patientData.firstName}`}
                        </td>
                        <td>{`${appointment.month} ${appointment.day} ${appointment.year}`}</td>
                        <td>{timeMap[appointment.startTime]}</td>
                        <td>{timeMap[appointment.endTime]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!search && appointments?.length > PAGE_SIZE && (
                <div className="flex flex-wrap gap-y-4 items-center justify-between border-grey-300 border-t-1 pt-4">
                  <div className="text-grey-100">
                    {`Showing `}
                    <span className="text-black-100 font-semibold">
                      {`${startCount} - ${endCount}`}
                    </span>
                    {` of `}
                    <span className="text-black-100 font-semibold">
                      {appointments?.length}
                    </span>
                  </div>
                  <ul className="flex items-center h-10 rounded-5 overflow-hidden *:h-full border-grey-300 border-1 *:border-grey-300 ">
                    <button
                      className="px-4 border-r-1 bg-grey-700 text-grey-100"
                      onClick={handlePrevious}
                    >
                      <span className="xs:inline-block hidden">Previous</span>
                      <BsChevronLeft className="xs:hidden" />
                    </button>
                    {pages?.map((page: number, index) => (
                      <button
                        onClick={() => handleSetPage(page)}
                        key={index}
                        className={`${
                          page === currentPage
                            ? "bg-primary-100 text-white"
                            : "bg-white text-grey-100 "
                        } transition-none border-r-1 w-10`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="px-4 bg-grey-700 text-grey-100"
                      onClick={handleNext}
                    >
                      <span className="xs:inline-block hidden">Next</span>
                      <BsChevronRight className="xs:hidden" />
                    </button>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
