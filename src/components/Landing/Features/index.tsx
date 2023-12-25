import { memo } from 'react';
import { Card, Container, Title, Text, SimpleGrid, rem, useMantineTheme } from '@mantine/core';

import { FEATURES } from '@/constants/landing/features';

import classes from './Features.module.css';

const LandingFeatures = memo(function LandingFeatures() {
  const theme = useMantineTheme();
  const features = FEATURES.map((feature) => (
    <Card key={feature.id} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Используйте с удобством
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Данный проект позволяет делиться научными выражениями настолько просто, что вы сможете даже
        не заметить, как это происходит
      </Text>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
});

export default LandingFeatures;
