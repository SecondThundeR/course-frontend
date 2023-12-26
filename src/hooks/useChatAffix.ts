import { useWindowScroll } from '@mantine/hooks';

export default function useChatAffix() {
  const [scroll] = useWindowScroll();
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  return [scroll, scrollableHeight] as const;
}
