import Icon from "@/components/Icon";
import { cellOpen, CellType, setGameStart } from "@/store/mine.slice";
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
      position={position}
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
      position={position}
      {...others}
    />
  );
}

type ButtonProps = {
  className?: string;
  content: CellType["content"];
  position: CellType["position"];
} & ComponentProps<"button">;

function OpenButton({ className, content, position, ...others }: ButtonProps) {
  const { isEnd: isGameEnd } = useSelector(
    (state: RootState) => state.minefield
  );
  return (
    <button
      className={cn(
        className,
        isGameEnd.value && isGameEnd.lastPosition === position && "bg-red-300"
      )}
      {...others}
    >
      {typeof content === "number" && (
        <span className="text-center text-xl font-bold">
          {content === 0 ? "" : content}
        </span>
      )}
      {content === "mine" && <Icon type="mine" />}
    </button>
  );
}

function CloseButton({ className, content, position, ...others }: ButtonProps) {
  const { isStart: isGameStart, isEnd: isGameEnd } = useSelector(
    (state: RootState) => state.minefield
  );
  const dispatch = useDispatch<RootDispatch>();

  const onClickOpenCell = () => {
    if (content !== "mine" && !isGameStart) {
      dispatch(setGameStart(true));
    }

    dispatch(cellOpen(position));

    // TODO: 지뢰 주변까지 cell을 여는 기능 구현
  };

  return (
    <button
      className={cn(className, isGameEnd.value && "pointer-events-none")}
      onClick={isGameEnd.value ? () => {} : onClickOpenCell}
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
