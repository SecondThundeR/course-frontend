import { memo } from 'react';
import { Container, Title, Accordion } from '@mantine/core';

import { FAQ_DATA } from '@/constants/landing/faq';

import classes from './FAQ.module.css';

const LandingFAQ = memo(function LandingFAQ() {
  const accordionItems = FAQ_DATA.map((faqItem) => (
    <Accordion.Item key={faqItem.id} className={classes.item} value={faqItem.id}>
      <Accordion.Control>{faqItem.title}</Accordion.Control>
      <Accordion.Panel>{faqItem.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Ответы на часто задаваемые вопросы
      </Title>
      <Accordion variant="separated">{accordionItems}</Accordion>
    </Container>
  );
});

export default LandingFAQ;
