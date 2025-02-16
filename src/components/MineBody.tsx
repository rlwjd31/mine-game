import { Level, generateMineBoard } from "@/store/mine.slice";
import { RootDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function MineBody() {
  const dispatch = useDispatch<RootDispatch>();
  const { levelConfig, mines, board } = useSelector(
    (state: RootState) => state.minefield
  );

  const handleLevelChange = (
    level: Level,
    row: number,
    col: number,
    numsOfMine: number
  ) => {
    dispatch(generateMineBoard({ levelType: level, row, col, numsOfMine }));
  };

  console.log("mines", mines);
  console.log("board", board);

  if (Array.isArray(mines) && mines.length === 0) {
    return <div>난이도를 설정해주세요</div>;
  }

  // TODO: 일어나서 board와 같이 지뢰를 표시(현재branch)하고 지뢰 근처에 숫자를 표시(다른 브랜치)하는 기능 추가
  // => mine의 속성명을 board로 바꾸고 빈값은 ""로 처리 mine은 mine, 숫자는 숫자로 처리
  // 또한, 한 Cell의 state는 {isOpen, isMine, isFlag, position, aroundMineCount}으로 구성되어야 함
  // Cell은 isOpen일 때 style 분기처리 값은 isFlag, isMine, aroundMineCount로 처리, position은 그냥 가지고 있는 값
  return (
    <div className="flex h-full items-center justify-center">
      <button onClick={() => handleLevelChange("custom", 5, 5, 3)}>
        지뢰 생성
      </button>
      <div
        className="grid size-fit border border-black "
        style={{
          gridTemplateRows: `repeat(${levelConfig.row}, 3rem)`, // 행 개수와 크기 설정
          gridTemplateColumns: `repeat(${levelConfig.col}, 3rem)`, // 열 개수와 크기 설정
        }}
      >
        {board.map((row, rowIndex) =>
          row.map(({ isOpen, content, position }, colIndex) => (
            <div key={position} className="flex items-center justify-center">
              {content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
