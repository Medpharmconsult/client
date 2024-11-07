"use client";
import Button from "./_components/Button";
import Container from "./_components/Container";
import Heading from "./_components/Heading";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <Container>
        <div className="text-center min-h-dvh flex items-center justify-center flex-col max-w-[525px] w-full mx-auto">
          <Heading type="h1" classname="text-primary-100">
            Something went wrong!
          </Heading>
          <Heading type="h2" classname="mt-2 mb-4">
            Please try again
          </Heading>
          <p className="mb-6 text-grey-100 first-letter:capitalize">
            {error.message}
          </p>
          <Button onClick={reset}>Try again</Button>
        </div>
      </Container>
    </div>
  );
}
