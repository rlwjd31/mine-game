export default function Header() {
  return (
    <div className="flex w-full flex-col gap-4 bg-purple-primary text-white">
      <div className="relative">
        <button className="cursor-pointer text-xl">Game</button>
        <div className="absolute left-0 top-0 flex translate-y-10 flex-col gap-2 bg-purple-500">
          <button className="px-4 py-2">Beginner</button>
          <button className="px-4 py-2">Intermediate</button>
          <button className="px-4 py-2">Expert</button>
          <button className="px-4 py-2">Custom</button>
        </div>
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
