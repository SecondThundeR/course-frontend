import 'katex/dist/katex.min.css';

import { memo } from 'react';
import {
  Container,
  Title,
  Accordion,
  Card,
  Text,
  SimpleGrid,
  Group,
  Button,
  TextInput,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { BlockMath } from 'react-katex';

import { FAQ_DATA } from '@/constants/landing/faq';
import { FEATURES } from '@/constants/landing/features';
import { LOGIN_ROUTE } from '@/constants/routes';

import { useEquation } from '@/hooks';

import classes from './Landing.module.css';

const LandingFAQ = memo(function LandingFAQ() {
  return (
    <Container size="sm" className={classes.faq__wrapper}>
      <Title ta="center" className={classes.faq__title}>
        Ответы на часто задаваемые вопросы
      </Title>

      <Accordion variant="separated">
        {FAQ_DATA.map((faqItem) => (
          <Accordion.Item key={faqItem.id} className={classes.faq__item} value={faqItem.id}>
            <Accordion.Control>{faqItem.title}</Accordion.Control>
            <Accordion.Panel>{faqItem.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
});

const LandingFeatures = memo(function LandingFeatures() {
  const theme = useMantineTheme();

  const features = FEATURES.map((feature) => (
    <Card key={feature.id} shadow="md" radius="md" className={classes.features__card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.features__cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.features__title} ta="center" mt="sm">
        Используйте с удобством
      </Title>

      <Text c="dimmed" className={classes.features__description} ta="center" mt="md">
        Данный проект позволяет делиться научными выражениями настолько просто, что вы сможете даже
        не заметить, как это происходит
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
});

const LandingHero = memo(function LandingHero() {
  return (
    <div className={classes.hero__wrapper}>
      <Container size={700} className={classes.hero__inner}>
        <h1 className={classes.hero__title}>
          Мессенджер{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            с поддержкой LaTeX
          </Text>{' '}
          Без компромиссов!
        </h1>

        <Text className={classes.hero__description} c="dimmed">
          Мы создали универсальный инструмент для общения и передачи документов в формате LaTeX,
          которым удобно пользоваться и приятно работать
        </Text>

        <Group className={classes.hero__controls}>
          <Button
            component={Link}
            to={LOGIN_ROUTE}
            size="xl"
            className={classes.hero__control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Начать работу
          </Button>
        </Group>
      </Container>
    </div>
  );
});

const LandingKatex = memo(function LandingKatex() {
  const { equation, onChange } = useEquation();

  return (
    <div className={classes.katex__wrapper}>
      <div className={classes.katex__body}>
        <Title className={classes.katex__title}>Попробуйте LaTeX в действии</Title>
        <Text fz="sm" c="dimmed">
          Введите формулу и наблюдайте результат в реальном времени
        </Text>
      </div>
      <div className={classes.katex__block}>
        <BlockMath math={equation} />
        <TextInput
          w="full"
          label="Введённое выражение"
          placeholder="Введите выражение сюда"
          value={equation}
          onChange={onChange}
        />
      </div>
    </div>
  );
});

const LandingBase = memo(function LandingBase() {
  throw new Error("Doesn't use this `Landing` component. Export other components via dot notation");
});

export const Landing = Object.assign(LandingBase, {
  FAQ: LandingFAQ,
  Features: LandingFeatures,
  Hero: LandingHero,
  Katex: LandingKatex,
});
