import { enableMapSet } from "immer"; // Immer에서 Set 지원 활성화
import { configureStore } from "@reduxjs/toolkit";
import minefieldReducer from "@/store/mine.slice"; // 상대 경로가 정확한지 확인!

enableMapSet()

export const store = configureStore({
  reducer: {
    minefield: minefieldReducer, // 여기서 minefield가 key로 설정됨
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
