export const MAX_SECTION_ITEMS: number = 9;
export const SLIDER_ROWS_COUNT: number = 3;
export const SLIDES_TO_SHOW_COLLAPSED: number = 3;
export const SLIDES_TO_SHOW_EXPANDED: number = 6;

export const STATUS_OK = 'ok';
export const STATUS_SUCCESS = 'success';

export enum TEXT_SIZE {
  small = 'small',
  big = 'big',
}

export enum SECTION_TYPE {
  services = 'service',
  chats = 'chat',
  contacts = 'contact',
}

export enum MESSENGER_FILTER_TYPE {
  all = 'all',
  chats = 'chat',
  contacts = 'contact',
}

export enum SECTION_NAME {
  services = 'Сервисы',
  chats = 'Чаты',
  contacts = 'Контакты',
}

export enum NOTIFICATION_TYPES {
  services = 'сервисов',
  chats = 'чатов',
  contacts = 'контактов',
}

export enum ROUTES_PATH {
  dashboard = '/',
  add = 'add',
  settings = 'settings',
  messenger = 'messenger',
}

export enum METHODS {
  getDashboard = 'dashboard.get',
  getServices = 'services.get',
  postDashboard = 'dashboard.post',
  deleteDashboard = 'dashboard.delete',
  patchDashboardOrdering = 'dashboard_ordering.patch',
}