import { Title } from "@solidjs/meta";

const NotFound = () => {
  return (
    <>
      <main class="mx-4 flex h-screen flex-1 flex-col items-center justify-center md:flex-row md:justify-center">
        <Title>404 Not Found</Title>
        <p>404 Not Found</p>
      </main>
    </>
  );
};

export default NotFound;
