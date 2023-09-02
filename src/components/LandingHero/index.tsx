import { memo } from "react";
import { Button, Flex, Text, Title } from "@mantine/core";

const LandingHero = memo(function LandingHero() {
  return (
    <Flex
      w="fit-content"
      mx="auto"
      py={96}
      direction="column"
      gap={18}
      align="center"
      justify="center"
    >
      <Flex direction="column" gap={4} align="center" justify="center">
        <Title size={48} ta="center">
          Мессенджер с поддержкой LaTeX
        </Title>
        <Title size={48} c="blue">
          Без компромиссов!
        </Title>
      </Flex>
      <Text size="lg" w="50%" ta="center">
        Мы создали универсальный инструмент для общения и передачи документов в
        формате LaTeX, которым удобно пользоваться и приятно работать
      </Text>
      <Button size="lg">Начать работу</Button>
    </Flex>
  );
});

export default LandingHero;
