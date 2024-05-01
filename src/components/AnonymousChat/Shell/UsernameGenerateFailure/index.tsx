import { Flex, Text, Title } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';

export function UsernameGenerateFailure() {
  return (
    <Flex
      px="md"
      h="calc(100dvh - 59px)"
      justify="center"
      align="center"
      direction="column"
      gap="md"
    >
      <IconMoodSad size={132} stroke={1.5} />
      <Title order={2} ta="center">
        К сожалению, не удалось сгенерировать случайное имя для Вас
      </Title>
      <Text fz="lg" ta="center">
        Такое бывает, если в данный момент слишком много участников. Попробуйте позже или напишите в
        поддержку
      </Text>
    </Flex>
  );
}
