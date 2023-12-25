import { memo } from 'react';
import { BlockMath } from 'react-katex';
import { Title, Text, TextInput } from '@mantine/core';

import { useEquation } from '@/hooks';

import classes from './Katex.module.css';

export const LandingKatex = memo(function LandingKatex() {
  const { equation, onChange } = useEquation();

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Попробуйте LaTeX в действии</Title>
        <Text fz="sm" c="dimmed">
          Введите формулу и наблюдайте результат в реальном времени
        </Text>
      </div>
      <div className={classes.block}>
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
