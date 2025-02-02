"use client";
import Form from "@/app/_components/Form";
import { setParams, timeMap } from "@/app/_lib/utilities";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight, BsSearch } from "react-icons/bs";
import { usePagination } from "../_hooks/usePagination";
import { bookedAppointmentType } from "../_lib/types";

export default function AppointmentsUi({
  appointments,
}: {
  appointments: bookedAppointmentType[];
}) {
  // Search state
  const [search, setSearch] = useState("");
  // Filter appointments based on search
  const sortedAppointments = appointments.filter(
    (app) =>
      (app.patientData.lastName + app.patientData.firstName)
        .toLowerCase()
        .includes(search.replace(/\s+/g, "").toLowerCase()) ||
      (app.month + app.day + app.year)
        .toLowerCase()
        .includes(search.replace(/\s+/g, "").toLowerCase())
  );

  // Table headings
  const tableHeadings = ["Patient name", "Date", "Start time", "End time"];

  // Pagination
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const page = Number(searchParams.get("page") ?? 1);
  const { dataNum, totalPages, pageStart, pageEnd, currentData } =
    usePagination<bookedAppointmentType>(10, page, appointments);
  const appointmentData = search ? sortedAppointments : currentData;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Next page
  const next = () => {
    if (page < totalPages)
      setParams(
        [{ name: "page", value: `${page + 1}` }],
        searchParams,
        router,
        path
      );
  };

  // Change page
  const change = (value: number) => {
    if (page !== value)
      setParams(
        [{ name: "page", value: `${value}` }],
        searchParams,
        router,
        path
      );
  };

  // Previous page
  const previous = () => {
    if (page > 1)
      setParams(
        [{ name: "page", value: `${page - 1}` }],
        searchParams,
        router,
        path
      );
  };

  return (
    <div className="bg-white rounded-[5px] xs:px-6 px-4 py-6 border-grey-300 border-1 ">
      <div className="relative mb-4 ">
        <BsSearch
          size={16}
          className="text-grey-100 absolute left-3 top-1/2 translate-y-[-50%]"
        />
        <Form.Input
          placeholder="Search"
          styles="pl-[40px] !h-10 w-full"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          disabled={dataNum === 0}
        />
      </div>
      {sortedAppointments.length === 0 && appointments.length > 0 ? (
        <h3 className="py-4 text-center text-primary-100 text-[18px]/[24px] font-bold tracking-normal">
          No results
        </h3>
      ) : (
        <div>
          {dataNum > 0 ? (
            <div>
              <div className="overflow-x-auto grid grid-cols-[repeat(1,minmax(0,1fr))]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className=" bg-grey-700">
                      {tableHeadings.map((th, index) => (
                        <th
                          key={index}
                          className="p-4 whitespace-nowrap text-left "
                        >
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentData.map((app, index) => (
                      <tr
                        key={index}
                        className="border-grey-300 border-b-1 *:text-left last:border-b-0  *:border-grey-300 *:whitespace-nowrap *:p-4 "
                      >
                        <td>
                          {`${app.patientData.lastName} ${app.patientData.firstName}`}
                        </td>
                        <td>{`${app.month} ${app.day} ${app.year}`}</td>
                        <td>{timeMap[app.startTime]}</td>
                        <td>{timeMap[app.endTime]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!search && dataNum > 0 && (
                <div className="flex flex-wrap gap-y-4 items-center justify-between border-grey-300 border-t-1 pt-6">
                  <div className="text-grey-100">
                    {`Showing `}
                    <span className="text-black-100 font-semibold">
                      {`${pageStart} - ${pageEnd}`}
                    </span>
                    {` of `}
                    <span className="text-black-100 font-semibold">
                      {dataNum}
                    </span>
                  </div>
                  <ul className="flex items-center h-10 rounded-5  *:h-full  *:border-grey-300 ">
                    <button
                      className="size-10 flex justify-center rounded-l-5 items-center border-1  text-sm bg-grey-700 text-grey-100"
                      onClick={previous}
                    >
                      <BsChevronLeft />
                    </button>
                    {pages.map((pg: number, index) => (
                      <button
                        onClick={() => change(pg)}
                        key={index}
                        className={`${
                          pg === page
                            ? "bg-primary-100 border-primary-100 text-white border"
                            : "bg-white text-grey-100 "
                        } transition-none border-r-1 border-y-1 w-10 text-sm`}
                      >
                        {pg}
                      </button>
                    ))}
                    <button
                      className="flex justify-center items-center rounded-r-5 size-10 text-sm bg-grey-700 border-r-1 border-y-1 text-grey-100"
                      onClick={next}
                    >
                      <BsChevronRight />
                    </button>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <h3 className="py-4 text-center text-primary-100 text-[18px]/[24px] font-bold tracking-normal">
              No Appointments available.
            </h3>
          )}
        </div>
      )}
    </div>
  );
}
