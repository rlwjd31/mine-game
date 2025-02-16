import Flag from "@/assets/icons/flag.svg?react";
import Mine from "@/assets/icons/mine.svg?react";

export const IconInfo = {
  flag: {
    component: Flag,
    text: "",
  },
  mine: {
    component: Mine,
    text: "",
  },
} as const;

export type IconType = keyof typeof IconInfo;

export default function Icon({ type }: { type: IconType }) {
  const DynamicIcon = IconInfo[type].component;

  return <DynamicIcon />;
}
