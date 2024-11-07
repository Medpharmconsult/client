import Container from "./_components/Container";

export default function Loading() {
  return (
    <Container>
      <div className="text-center min-h-dvh flex items-center justify-center relative">
        <div>
          <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <path
              d="M95.3639 55.7887C97.2303 44.4386 94.9589 32.7957 88.9631 22.9795C82.9673 13.1633 73.6459 5.8266 62.6958 2.30498C51.7456 -1.21664 39.895 -0.688968 29.3012 3.79193C18.7074 8.27282 10.0749 16.409 4.97527 26.7192C-0.124357 37.0294 -1.35201 48.8281 1.51579 59.9674C4.38359 71.1066 11.1562 80.8457 20.6005 87.4115C30.0449 93.9774 41.5331 96.9335 52.9737 95.7416C64.4142 94.5498 75.0464 89.2892 82.9346 80.9176L78.8608 77.079C71.8924 84.4743 62.5001 89.1214 52.3937 90.1743C42.2872 91.2272 32.1387 88.6158 23.7957 82.8156C15.4527 77.0154 9.46987 68.4121 6.93649 58.5718C4.40311 48.7316 5.48761 38.3088 9.99254 29.2008C14.4975 20.0929 22.1233 12.9056 31.4817 8.9472C40.8401 4.98884 51.3088 4.5227 60.982 7.63365C70.6552 10.7446 78.8896 17.2258 84.1862 25.8973C89.4828 34.5687 91.4894 44.8539 89.8406 54.8804L95.3639 55.7887Z"
              fill="#1341A3"
            />
          </svg>
        </div>
        <svg
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.3337 26.6667C13.3338 34.0305 19.3033 40 26.6671 40V26.6667H39.9999V13.3334H26.6671V13.3334H13.3337V13.3334H13.3333V26.6667H13.3337Z"
            fill="#8AD7F5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.6666 13.3334H26.6667V26.6667H0V13.3334H13.3333V0H26.6666V13.3334Z"
            fill="#1341A3"
            fillOpacity="0.85"
          />
        </svg>
      </div>
    </Container>
  );
}
