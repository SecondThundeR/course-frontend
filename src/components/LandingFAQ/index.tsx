import { memo } from "react";
import { Accordion, Flex, Title } from "@mantine/core";

import { FAQ_DATA } from "../../constants/faq";

const LandingFAQ = memo(function LandingFAQ() {
  return (
    <Flex
      py={36}
      direction="column"
      gap={24}
      align="center"
      justify="center"
      w="50%"
      mx="auto"
    >
      <Title size={36} ta="center">
        Ответы на часто задаваемые вопросы
      </Title>
      <Accordion variant="separated" radius="md" w="100%">
        {FAQ_DATA.map((faqItem) => (
          <Accordion.Item key={faqItem.id} value={faqItem.id}>
            <Accordion.Control>{faqItem.title}</Accordion.Control>
            <Accordion.Panel>{faqItem.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Flex>
  );
});

export default LandingFAQ;
