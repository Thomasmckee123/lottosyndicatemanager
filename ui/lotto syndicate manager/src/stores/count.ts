import { create } from 'zustand'

const useCountStore = create((set) => ({
  count: 0,
  increasePopulation: () => set((state: any) => ({ count: state.count + 1 })),
  removeAllBears: () => set({ count: 0 }),
}))
export default useCountStore