import "katex/dist/katex.min.css";

import { ChangeEventHandler, memo, useState } from "react";
import { Flex, Title, Text, TextInput } from "@mantine/core";
import { BlockMath } from "react-katex";

const LandingLaTeX = memo(function LandingLaTeX() {
  const [equation, setEquation] = useState("\\int_0^\\infty x^2 dx");

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setEquation(event.currentTarget.value);

  return (
    <Flex
      w="100%"
      py={36}
      direction="column"
      mx="auto"
      justify="center"
      align="center"
      gap={18}
    >
      <Title size={36}>Попробуйте LaTeX в действии</Title>
      <Text size="lg">
        Введите формулу и наблюдайте результат в реальном времени
      </Text>
      <BlockMath math={equation} />
      <TextInput
        w="full"
        label="Введённое выражение"
        placeholder="Введите выражение сюда"
        value={equation}
        onChange={onChange}
      />
    </Flex>
  );
});

export default LandingLaTeX;
