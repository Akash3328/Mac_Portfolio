// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";
// import { locations } from "#constants";

// const DEFAULT_LOCATION = locations.work;

// const useLocationStore = create(
//   immer((set) => ({
//     activeLocation: DEFAULT_LOCATION,
//     setActiveLocation: (location = null) =>
//       set((state) => {
//         state.activeLocation = location;
//       }),
//     resetActiveLocation: set((state) => {
//       state.activeLocation = DEFAULT_LOCATION;
//     }),
//   }))
// );
// export default useLocationStore;



//----------------
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#constants";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    // setActiveLocation: set active location (or clear to default)
    setActiveLocation: (location ) =>
      set((state) => {
        if(location === undefined) return;
        state.activeLocation = location;
      }),

    // resetActiveLocation: a function that resets to default
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
