import Cell from "@/components/Cell";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function MineBody() {
  const { levelConfig, mines, board } = useSelector(
    (state: RootState) => state.minefield
  );

  if (Array.isArray(mines) && mines.length === 0) {
    return <div>난이도를 설정해주세요</div>;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="grid size-fit border-8 border-purple-primary "
        style={{
          gridTemplateRows: `repeat(${levelConfig.row}, 3rem)`, // 행 개수와 크기 설정
          gridTemplateColumns: `repeat(${levelConfig.col}, 3rem)`, // 열 개수와 크기 설정
        }}
      >
        {board.map((row, rowIndex) =>
          row.map(({ isOpen, content, position }, colIndex) => (
            <Cell
              key={position}
              content={content}
              isOpen={isOpen}
              position={position}
            />
          ))
        )}
      </div>
    </div>
  );
}
