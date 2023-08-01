import { createAction } from 'redux-actions';

export const SET_MAIN_LOADER = 'SET_MAIN_LOADER';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';

export const setMainLoader = createAction(SET_MAIN_LOADER, (mainLoader: boolean) => mainLoader);
export const setNotification = createAction(SET_NOTIFICATION, (
  { isOpen, type }: { isOpen: boolean; type: string }) => ({ isOpen, type })
);
export const resetNotification = createAction(RESET_NOTIFICATION);

export type setMainLoaderActionType = ReturnType<typeof setMainLoader>;
export type setNotificationActionType = ReturnType<typeof setNotification>;