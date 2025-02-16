import { levelConfig } from "@/constants/level";
import { Level, setLevel } from "@/store/mine.slice";
import { RootDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function MineBody() {
  const board = Array.from({ length: 16 }, () =>
    Array.from({ length: 16 }, () => 0)
  );
  // const {} = useSelector((state: Root))
  const dispatch = useDispatch<RootDispatch>();
  const { level: currentLevel, mines } = useSelector(
    (state: RootState) => state.minefield
  );

  const handleLevelChange = (level: Level) => {
    dispatch(setLevel(level));
  };

  const [ROW, COL] = [
    levelConfig[currentLevel].row,
    levelConfig[currentLevel].col,
  ];

  if (Array.isArray(mines) && mines.length === 0) {
    return <div>난이도를 설정해주세요</div>;
  }

  console.log(mines);
  return (
    <div className="flex h-full items-center justify-center">
      <button onClick={() => handleLevelChange("intermediate")}>
        지뢰 생성
      </button>
      <div
        className="grid size-fit border border-black "
        style={{
          gridTemplateRows: `repeat(${levelConfig[currentLevel].row}, 3rem)`, // 행 개수와 크기 설정
          gridTemplateColumns: `repeat(${levelConfig[currentLevel].col}, 3rem)`, // 열 개수와 크기 설정
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
