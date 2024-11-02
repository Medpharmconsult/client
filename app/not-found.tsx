import Heading from "./_components/Heading";
import Button from "./_components/Button";
import Container from "./_components/Container";

export const metadata = {
  title: "404",
};

function NotFound() {
  return (
    <Container>
      <div className="text-center min-h-dvh flex items-center justify-center flex-col">
        <Heading type="h1" classname="text-primary-100">
          404
        </Heading>
        <Heading type="h2" classname="mt-2 mb-4">
          Page not found
        </Heading>
        <p className="mb-6 text-grey-100 ">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button isLink={true} href="/">
          Go back home
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
