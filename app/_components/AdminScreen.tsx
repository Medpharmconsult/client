import Container from "@/app/_components/Container";
import Heading from "@/app/_components/Heading";
import Link from "next/link";
import { adminScreenType } from "../_lib/types";
import { fetchRole } from "../_lib/services";
import { dashboardLink } from "../_lib/utilities";

export default async function AdminScreen({
  children,
  title,
  styles = "",
  subtitle = "",
}: adminScreenType) {
  // Fetch role
  const role = await fetchRole();
  return (
    <Container styles={`w-full pt-[104px] pb-6  ${styles} !max-w-full`}>
      {title && (
        <div className="flex justify-between flex-wrap gap-x-4 items-center mb-6">
          <Heading type="h4">
            <span className="inline-block first-letter:capitalize">
              {title}
            </span>
          </Heading>
          <div className="flex items-center flex-wrap text-grey-100 h-full py-1 lg:py-[6px]">
            <Link
              href={`${role ? dashboardLink(role) : ""}`}
              className="hover:text-black-100"
            >
              Home
            </Link>
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 fill-grey-100"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="first-letter:capitalize">{title}</span>
            {subtitle && (
              <>
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6 fill-grey-100"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="first-letter:capitalize">{subtitle}</span>
              </>
            )}
          </div>
        </div>
      )}
      {children}
    </Container>
  );
}
