import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col bg-purple-secondary px-12 pb-12 pt-20">
      <div className="mx-auto w-full max-w-[51rem]">{children}</div>
    </div>
  );
}
