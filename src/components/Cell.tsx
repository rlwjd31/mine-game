import Icon from "@/components/Icon";
import { CellType } from "@/store/mine.slice";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type CellProps = CellType & {
  openStyle?: string;
  closeStyle?: string;
} & ComponentProps<"button">;

export default function Cell({
  content,
  isOpen,
  position,
  openStyle,
  closeStyle,
  ...others
}: CellProps) {
  console.log("content", content, isOpen, position);

  const defaultStyle = "flex size-full items-center justify-center shadow-cell";
  // isOpen = true;

  console.log("content", content, isOpen, position);

  if (!isOpen) {
    return (
      <button
        className={cn(
          defaultStyle,
          "relative bg-purple-primary/50  hover:bg-purple-primary/30 cursor-pointer",
          closeStyle
        )}
        {...others}
      >
        {content === "flag" && (
          <div>
            <Icon type="flag" />
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      className={cn(
        defaultStyle,
        "bg-transparent pointer-events-none",
        openStyle
      )}
      {...others}
    >
      {typeof content === "number" && (
        <span className="text-xl font-bold text-center">
          {content === 0 ? "" : content}
        </span>
      )}
      {content === "mine" && <Icon type="mine" />}
    </button>
  );
}
