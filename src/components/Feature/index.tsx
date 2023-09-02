import { memo } from "react";
import { Flex, Title, Text } from "@mantine/core";

import { FeatureType } from "../../constants/features";

import Icon from "../Icon";

const Feature = memo(function Feature({
  icon,
  title,
  description,
}: FeatureType) {
  return (
    <Flex direction="column" gap={8} align="center" justify="center">
      <Icon icon={icon} />
      <Title order={3} ta="center">
        {title}
      </Title>
      <Text size="md" ta="center">
        {description}
      </Text>
    </Flex>
  );
});

export default Feature;
