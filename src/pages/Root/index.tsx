import { MantineProvider } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";

function Root() {
  return (
    <MantineProvider>
      <Outlet />
    </MantineProvider>
  );
}

export default Root;
