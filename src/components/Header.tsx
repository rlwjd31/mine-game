import { levelConfig } from "@/constants/mineInfo";
import { generateMineBoard, LevelConfig } from "@/store/mine.slice";
import { RootDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [time, setTime] = useState(0);

  const { isStart } = useSelector((state: RootState) => state.minefield);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isStart) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isStart]);

  return (
    <div className="relative flex w-full flex-col gap-4 bg-purple-primary text-white">
      {isModalOpen && (
        <InputModal setModalOpen={setModalOpen} setIsClicked={setIsClicked} />
      )}
      <div className="relative">
        <button
          className="cursor-pointer text-xl"
          onClick={() => setIsClicked(!isClicked)}
        >
          Game
        </button>
        {isClicked && <Dropdown setModalOpen={setModalOpen} />}
      </div>
      <hr className="border-2 border-neutral-200" />
      <div className="flex w-full items-center justify-between text-3xl">
        <div>깃발 개수</div>
        <button className="rounded-md bg-white p-2 shadow-md">😊</button>
        <span className="w-12">{time}</span>
      </div>
    </div>
  );
}

function Dropdown({ setModalOpen }: { setModalOpen: (prev: boolean) => void }) {
  const dispatch = useDispatch<RootDispatch>();

  return (
    <div className="absolute left-0 top-0 z-50 flex translate-y-10 flex-col gap-2 bg-purple-500">
      <button
        className="px-4 py-2"
        onClick={() =>
          dispatch(
            generateMineBoard({
              levelType: "beginner",
              ...levelConfig.beginner,
            })
          )
        }
      >
        Beginner
      </button>
      <button
        className="px-4 py-2"
        onClick={() =>
          dispatch(
            generateMineBoard({
              levelType: "intermediate",
              ...levelConfig.intermediate,
            })
          )
        }
      >
        Intermediate
      </button>
      <button
        className="px-4 py-2"
        onClick={() =>
          dispatch(
            generateMineBoard({
              levelType: "expert",
              ...levelConfig.expert,
            })
          )
        }
      >
        Expert
      </button>
      <button className="px-4 py-2" onClick={() => setModalOpen(true)}>
        Custom
      </button>
    </div>
  );
}

function InputModal({
  setModalOpen,
  setIsClicked,
}: {
  setModalOpen: (prev: boolean) => void;
  setIsClicked: (prev: boolean) => void;
}) {
  const [levelInfo, setLevelInfo] = useState<LevelConfig>({
    levelType: "custom",
    row: 0,
    col: 0,
    numsOfMine: 0,
  });
  const dispatch = useDispatch<RootDispatch>();

  const defaultStyle = "bg-purple-secondary text-purple-primary";
  const onClickgenerateMineBoard = () => {
    dispatch(generateMineBoard({ ...levelInfo }));

    setModalOpen(false);
    setIsClicked(false);
  };

  return (
    <div className="absolute left-0 top-1/2 z-[100] flex w-full flex-col justify-center gap-4 overflow-hidden rounded-xl bg-purple-secondary px-4 py-5 shadow-xl">
      <button
        className="w-fit cursor-pointer text-start text-2xl font-bold text-purple-primary hover:bg-purple-primary/30 hover:text-white"
        onClick={() => setModalOpen(false)}
      >
        X
      </button>
      <div className="flex gap-4 text-purple-primary">
        <span>행 입력:</span>
        <input
          className={defaultStyle}
          type="text"
          placeholder="행 입력"
          value={levelInfo.row}
          onChange={(e) =>
            setLevelInfo((prev) => ({
              ...prev,
              row: +e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-4 text-purple-primary">
        <span>열 입력:</span>
        <input
          className={defaultStyle}
          type="text"
          placeholder="열 입력"
          value={levelInfo.col}
          onChange={(e) =>
            setLevelInfo((prev) => ({
              ...prev,
              col: +e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-4 text-purple-primary">
        <span>지뢰 개수 입력:</span>
        <input
          className={defaultStyle}
          type="text"
          placeholder="지뢰 개수"
          value={levelInfo.numsOfMine}
          onChange={(e) =>
            setLevelInfo((prev) => ({
              ...prev,
              numsOfMine: +e.target.value,
            }))
          }
        />
      </div>
      <button
        className="w-fit cursor-pointer rounded-md bg-purple-primary px-4 py-2 text-white hover:bg-purple-primary/80"
        onClick={onClickgenerateMineBoard}
      >
        지뢰 생성
      </button>
    </div>
  );
}
