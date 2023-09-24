import 'katex/dist/katex.min.css';

import { memo } from 'react';
import { Text, TextInput, Title } from '@mantine/core';
import { BlockMath } from 'react-katex';

import useEquation from '../../hooks/useEquation';

import classes from './LandingKatex.module.css';

export const LandingKatex = memo(() => {
  const { equation, onChange } = useEquation();

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Попробуйте LaTeX в действии</Title>
        <Text fz="sm" c="dimmed">
          Введите формулу и наблюдайте результат в реальном времени
        </Text>
      </div>
      <div className={classes.katex}>
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
