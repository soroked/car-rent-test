import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal/modal.reducer";
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { carsReducer } from "./cars/cars.reducer";
import { filterReducer } from "./filter.reducer";

// const favoritesConfig = {
//   key: "favorites",
//   storage,
//   whitelist: ["favorites"]
// }

export const store = configureStore({
  reducer: {
    carsStore: carsReducer,
    // favoritesStore: persistReducer(favoritesConfig, fa),
    modal: modalReducer,
    filter: filterReducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);