import Button from "./Button";
import { professionType } from "../_lib/types";
import Link from "next/link";

export default function ProfessionsTable({ data }: { data: professionType[] }) {
  return (
    <div>
      <div className="overflow-x-auto grid grid-cols-[repeat(1,minmax(0,1fr))]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-grey-700 *:p-4 *:whitespace-nowrap *:text-left">
              <th>Profession</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((prof) => (
              <tr
                className="last:border-b-0 border-grey-300 border-b-1 *:p-4 *:whitespace-nowrap"
                key={prof._id}
              >
                <td className="first-letter:capitalize ">{prof.name}</td>
                <td className="">
                  <div className="flex w-full">
                    <Button
                      href={`/dashboard/consult/${prof.code}`}
                      styles="self-start"
                      size="xs"
                    >
                      Consult
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
