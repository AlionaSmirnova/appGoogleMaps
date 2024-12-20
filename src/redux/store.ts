import { createStore, combineReducers } from 'redux';
import { mainReducer } from './reducers/mainReducer';

// Корневой редьюсер
const rootReducer = combineReducers({
  main: mainReducer,
});

// Создаем хранилище
export const store = createStore(rootReducer);

// Типы для использования в приложении
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
