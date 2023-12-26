import { memo } from 'react';
import { Affix, Button, Transition, rem } from '@mantine/core';
import { IconArrowDown } from '@tabler/icons-react';

import { useChatAffix } from '@/hooks';

type BottomAffixProps = { onScroll: () => void };

export const BottomAffix = memo(function BottomAffix({ onScroll }: BottomAffixProps) {
  const [scroll, scrollableHeight] = useChatAffix();

  return (
    <Affix position={{ bottom: 120, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y < scrollableHeight}>
        {(transitionStyles) => (
          <Button
            leftSection={<IconArrowDown style={{ width: rem(16), height: rem(16) }} />}
            style={transitionStyles}
            onClick={onScroll}
          >
            Вернуться назад
          </Button>
        )}
      </Transition>
    </Affix>
  );
});
