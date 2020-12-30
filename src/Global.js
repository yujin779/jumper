// import { createGlobalState } from "react-hooks-global-state";

import create from "zustand";

export const Scene = {
  Opning: 0,
  Playing: 1,
  GameOver: 2
};

export const useStore = create((set) => ({
  tap: false,
  tapTrue: () => set((state) => ({ tap: true })),
  tapFalse: () => set((state) => ({ tap: false }))
}));

// const initialState = {
//   scene: Scene.Opning,
//   score: 0,
//   tap: false
// };
// export const { useGlobalState } = createGlobalState(initialState);
