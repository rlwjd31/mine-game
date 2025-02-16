import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-purple-secondary flex h-screen w-screen flex-col pb-12 pl-8 pr-24 pt-20">
      <div className="mx-auto w-full max-w-[51rem]">{children}</div>
    </div>
  );
}
