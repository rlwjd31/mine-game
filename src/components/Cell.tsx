import Icon from "@/components/Icon";
import { CellType, setGameStart } from "@/store/mine.slice";
import { RootDispatch, RootState } from "@/store/store";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const defaultStyle = "flex size-full items-center justify-center shadow-cell";

  return isOpen ? (
    <OpenButton
      className={cn(
        defaultStyle,
        "bg-transparent pointer-events-none",
        openStyle
      )}
      content={content}
      {...others}
    />
  ) : (
    <CloseButton
      className={cn(
        defaultStyle,
        "relative bg-purple-primary/50  hover:bg-purple-primary/30 cursor-pointer",
        closeStyle
      )}
      content={content}
      {...others}
    />
  );
}

type ButtonProps = {
  className?: string;
  content: CellType["content"];
} & ComponentProps<"button">;

function OpenButton({ className, content, ...others }: ButtonProps) {
  return (
    <button className={className} {...others}>
      {typeof content === "number" && (
        <span className="text-center text-xl font-bold">
          {content === 0 ? "" : content}
        </span>
      )}
      {content === "mine" && <Icon type="mine" />}
    </button>
  );
}

function CloseButton({ className, content, ...others }: ButtonProps) {
  const { isStart } = useSelector((state: RootState) => state.minefield);
  const dispatch = useDispatch<RootDispatch>();

  const onClickOpenCell = () => {
    // TODO: 타이머 시작(지뢰가 아닐 시)
    if (content !== "mine" && !isStart) {
      dispatch(setGameStart(true));
    }
    // TODO: 지뢰 주변까지 cell을 여는 기능 구현
  };

  return (
    <button className={className} onClick={onClickOpenCell} {...others}>
      {content === "flag" && (
        <div>
          <Icon type="flag" />
        </div>
      )}
    </button>
  );
}
