import { levelConfig } from "@/constants/mineInfo";
import { generateMineBoard } from "@/store/mine.slice";
import { RootDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Header() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 bg-purple-primary text-white">
      <div className="relative">
        <button
          className="cursor-pointer text-xl"
          onClick={() => setIsClicked(!isClicked)}
        >
          Game
        </button>
        {isClicked && <Dropdown />}
      </div>
      <hr className="border-2 border-neutral-200" />
      <div className="flex w-full items-center justify-between text-3xl">
        <div>깃발 개수</div>
        <button className="rounded-md bg-white p-2 shadow-md">😊</button>
        <div>시간</div>
      </div>
    </div>
  );
}

function Dropdown() {
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
      <button className="px-4 py-2">Custom</button>
    </div>
  );
}
