export default function MineBody() {
  const board = Array.from({ length: 16 }, () =>
    Array.from({ length: 16 }, () => 0)
  );

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="grid size-fit  border border-black "
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, 3rem)`, // 열 개수와 크기 설정
          gridTemplateRows: `repeat(${board.length}, 3rem)`, // 행 개수와 크기 설정
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center"
            >{`[${rowIndex},${colIndex}]`}</div>
          ))
        )}
      </div>
    </div>
  );
}
