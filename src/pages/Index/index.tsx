import { AppShell, rem, Title, Button, Flex } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import ThemeToggle from "../../components/ThemeToggle";
import LandingHero from "../../components/LandingHero";
import LandingFeatures from "../../components/LandingFeatures";
import LandingFAQ from "../../components/LandingFAQ";
import LandingLaTeX from "../../components/LandingLaTeX";

function Index() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <Flex h="100%" px="md" align="center" justify="space-between">
          <Title order={4}>Project Prometheus</Title>
          <Flex gap={8}>
            <Button>Вход</Button>
            <Button variant="default">Регистрация</Button>
            <ThemeToggle />
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        <LandingHero />
        <LandingFeatures />
        <LandingLaTeX />
        <LandingFAQ />
      </AppShell.Main>
    </AppShell>
  );
}

export default Index;
