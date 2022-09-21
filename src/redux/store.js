import { createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";

// Начальное значение состояния Redux для корневого редюсера,
// если не передать параметр preloadedState.
const initialStore = {
  contacts: [
    { id: 0, name: 'Rosie Simpson', tel: '459-12-56' },
    { id: 1, name: 'Hermione Kline', tel: '443-89-12' },
    { id: 2, name: "Master React", tel: '645-17-79' },
    { id: 3, name: 'Eden Clements', tel: '227-91-26' },
  ],
  filters: {
    status: "all",
  },
};


// Пока что используем редюсер который
// только возвращает полученное состояние
const rootReducer = (store = initialStore, action) => {
  return store;
};

// Создаем расширение стора чтобы добавить инструменты разработчика
const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);