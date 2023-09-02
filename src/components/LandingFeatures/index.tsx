import { memo } from "react";
import { Flex, Title, Text, SimpleGrid } from "@mantine/core";

import { FEATURES } from "../../constants/features";

import Feature from "../Feature";

const LandingFeatures = memo(function LandingFeatures() {
  return (
    <Flex
      w="fit-content"
      mx="auto"
      py={36}
      direction="column"
      gap={48}
      align="center"
      justify="center"
    >
      <Flex direction="column" gap={8} align="center" justify="center">
        <Title size={36} ta="center">
          Используйте с удобством
        </Title>
        <Text size="md" w="50%" ta="center">
          Данный проект позволяет делиться научными выражениями настолько
          просто, что вы сможете даже не заметить, как это происходит
        </Text>
      </Flex>
      <SimpleGrid
        mx={{
          base: 36,
          sm: 48,
          xl: 96,
        }}
        cols={{ base: 1, sm: 2, xl: 3 }}
        spacing="xl"
      >
        {FEATURES.map((feature) => (
          <Feature key={feature.id} {...feature} />
        ))}
      </SimpleGrid>
    </Flex>
  );
});

export default LandingFeatures;
