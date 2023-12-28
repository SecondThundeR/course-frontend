import { memo } from 'react';
import { ActionIcon, Affix, Transition, rem } from '@mantine/core';
import { IconArrowDown } from '@tabler/icons-react';

import { useChatAffix } from '@/hooks';

type BottomAffixProps = { onScroll: () => void };

export const BottomAffix = memo(function BottomAffix({ onScroll }: BottomAffixProps) {
  const { scroll, scrollableHeight } = useChatAffix();

  return (
    <Affix position={{ bottom: 120, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y < scrollableHeight}>
        {(transitionStyles) => (
          <ActionIcon
            onClick={onScroll}
            variant="filled"
            size="48"
            radius="999"
            style={transitionStyles}
          >
            <IconArrowDown style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
});
