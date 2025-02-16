import { Level, generateMineBoard } from "@/store/mine.slice";
import { RootDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function MineBody() {
  const board = Array.from({ length: 16 }, () =>
    Array.from({ length: 16 }, () => 0)
  );
  // const {} = useSelector((state: Root))
  const dispatch = useDispatch<RootDispatch>();
  const { levelConfig, mines } = useSelector(
    (state: RootState) => state.minefield
  );

  const handleLevelChange = (
    level: Level,
    row: number,
    col: number,
    numsOfMine: number
  ) => {
    console.log("row", row, "col", col, "numsOfMine", numsOfMine);
    dispatch(generateMineBoard({ levelType: level, row, col, numsOfMine }));
  };

  const [ROW, COL] = [levelConfig.row, levelConfig.col];

  if (Array.isArray(mines) && mines.length === 0) {
    return <div>난이도를 설정해주세요</div>;
  }

  console.log(mines);
  // TODO: 일어나서 board와 같이 지뢰를 표시(현재branch)하고 지뢰 근처에 숫자를 표시(다른 브랜치)하는 기능 추가
  // => mine의 속성명을 board로 바꾸고 빈값은 ""로 처리 mine은 mine, 숫자는 숫자로 처리
  // 또한, 한 Cell의 state는 {isOpen, isMine, isFlag, position, aroundMineCount}으로 구성되어야 함
  // Cell은 isOpen일 때 style 분기처리 값은 isFlag, isMine, aroundMineCount로 처리, position은 그냥 가지고 있는 값
  return (
    <div className="flex items-center justify-center h-full">
      <button onClick={() => handleLevelChange("custom", 5, 5, 3)}>
        지뢰 생성
      </button>
      <div
        className="grid border border-black size-fit "
        style={{
          gridTemplateRows: `repeat(${levelConfig.row}, 3rem)`, // 행 개수와 크기 설정
          gridTemplateColumns: `repeat(${levelConfig.col}, 3rem)`, // 열 개수와 크기 설정
        }}
      >
        {Array(ROW)
          .fill("")
          .map((row, rowIndex) =>
            Array(COL)
              .fill("")
              .map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="flex items-center justify-center"
                >
                  {mines.has(`${rowIndex},${colIndex}`)
                    ? "지뢰"
                    : `${rowIndex},${colIndex}`}
                </div>
              ))
          )}
      </div>
    </div>
  );
}
