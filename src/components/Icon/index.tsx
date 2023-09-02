import { memo } from "react";
import { Icon } from "@tabler/icons-react";
import { ThemeIcon } from "@mantine/core";

interface IconProps {
  icon: Icon;
}

const Icon = memo(function Icon({ icon: Icon }: IconProps) {
  return (
    <ThemeIcon variant="light" radius="xl" size={64}>
      <Icon style={{ width: "50%", height: "50%" }} />
    </ThemeIcon>
  );
});

export default Icon;
