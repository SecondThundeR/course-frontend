import { memo } from 'react';
import {
  Container,
  Title,
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
} from '@mantine/core';

import { FAQ_DATA } from '@/constants/landing/faq';

import classes from './FAQ.module.css';

const LandingFAQ = memo(function LandingFAQ() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Ответы на часто задаваемые вопросы
      </Title>
      <Accordion variant="separated">
        {FAQ_DATA.map(({ id, title, answer }) => (
          <AccordionItem key={id} className={classes.item} value={id}>
            <AccordionControl>{title}</AccordionControl>
            <AccordionPanel>{answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
});

export default LandingFAQ;
