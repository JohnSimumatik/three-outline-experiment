import { Object3D } from 'three';
import { create } from 'zustand';

type State = {
  selected: Object3D | null;
  setSelected: (selected: Object3D | null) => void;
};

export const useStore = create<State>((set) => ({
  selected: null,
  setSelected: (selected) => set(() => ({ selected })),
}));
