import { useWindowScroll } from '@mantine/hooks';

const SKIP_HEIGHT = 60;

export default function useChatAffix() {
  const [scroll] = useWindowScroll();
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight - SKIP_HEIGHT;

  return { scroll, scrollableHeight };
}
