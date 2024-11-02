import Container from "@/app/_components/Container";
import Heading from "@/app/_components/Heading";

export default function DashboardScreen({
  children,
  title,
  hasSpaceBelow = true,
  subtitle = "",
}: {
  children: React.ReactNode;
  title?: string;
  hasSpaceBelow?: boolean;
  subtitle?: string;
}) {
  return (
    <Container
      classname={`flex-1 xs:pt-36 pt-32 w-full ${
        hasSpaceBelow ? "xs:pb-16 pb-12" : ""
      } `}
    >
      {title && (
        <Heading
          type="h4"
          classname={`xs:mb-8 mb-6 ${subtitle ? "flex items-end" : ""}`}
        >
          <span className="inline-block first-letter:capitalize"> {title}</span>
          {subtitle && (
            <div className="text-grey-100 text-[16px]/[28px] lg:text-[18px]/[32px] inline-block">
              <span className="px-2">/</span>
              <span className="inline-block first-letter:capitalize ">
                {subtitle}
              </span>
            </div>
          )}
        </Heading>
      )}

      {children}
    </Container>
  );
}
