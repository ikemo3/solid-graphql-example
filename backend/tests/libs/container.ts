import { GenericContainer, Wait } from "testcontainers";

export async function startPostgreSQLContainer(image: GenericContainer) {
  const container = await image
    .withExposedPorts(5432)
    .withWaitStrategy(
      Wait.forLogMessage(
        /.*データベースシステムの接続受け付け準備が整いました.*/,
        2,
      ),
    )
    .withStartupTimeout(10_000)
    .withEnvironment({
      POSTGRES_DB: "test_db",
      POSTGRES_USER: "test_user",
      POSTGRES_PASSWORD: "test_password",
    })
    .start();

  const url = `postgresql://test_user:test_password@localhost:${container.getMappedPort(
    5432,
  )}/test_db`;

  return { container, url };
}

export async function startStorageContainer(image: GenericContainer) {
  const container = await image
    .withExposedPorts(9000)
    .withWaitStrategy(Wait.forLogMessage("Status:"))
    .withStartupTimeout(10_000)
    .withEnvironment({
      MINIO_ROOT_USER: "minio",
      MINIO_ROOT_PASSWORD: "minio123",
    })
    .start();
  const endpoint = `http://localhost:${container.getMappedPort(9000)}`;

  return { user: "minio", password: "minio123", endpoint, container };
}
