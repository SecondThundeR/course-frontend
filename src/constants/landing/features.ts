import { IconSpyOff, IconTable, IconVariable } from '@tabler/icons-react';

export const FEATURES = [
  {
    id: 'variable-feature',
    icon: IconVariable,
    title: 'Удобная вставка формул',
    description:
      'Благодаря библиотеке KaTeX можно вставлять формулы прямо в текст, не используя никаких дополнительных инструментов',
  },
  {
    id: 'privacy-feature',
    icon: IconSpyOff,
    title: 'Приватность и безопасность',
    description:
      'Мы не передаем Ваши данные третьим лицам, а также постоянно делаем всё возможное, чтобы они были в безопасности',
  },
  {
    id: 'design-feature',
    icon: IconTable,
    title: 'Приятный дизайн',
    description:
      'С помощью Mantine, мы создали дизайн, который не только приятен глазу, но и удобен в использовании',
  },
];

export type FeatureType = Omit<(typeof FEATURES)[number], 'id'>;
