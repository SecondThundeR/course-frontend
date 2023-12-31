import 'katex/dist/katex.min.css';

import { memo } from 'react';
import { BlockMath } from 'react-katex';
import { Title, Text, TextInput } from '@mantine/core';

import { useEquation } from '@/hooks';

import classes from './Katex.module.css';

const LandingKatex = memo(function LandingKatex() {
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
          label="LaTeX-выражение"
          placeholder="Введите выражение для отображения"
          value={equation}
          onChange={onChange}
        />
      </div>
    </div>
  );
});

export default LandingKatex;
