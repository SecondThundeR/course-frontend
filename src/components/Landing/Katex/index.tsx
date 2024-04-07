import 'katex/dist/katex.min.css';

import { Suspense, lazy, memo } from 'react';
import { Title, Text, TextInput } from '@mantine/core';

import { useEquation } from '@/hooks';

import classes from './Katex.module.css';

const LazyBlockMath = lazy(() =>
  import('react-katex').then((module) => ({ default: module.BlockMath }))
);

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
        <Suspense>
          <LazyBlockMath math={equation} />
        </Suspense>
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
