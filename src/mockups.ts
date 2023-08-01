import { ChatState, ContactState, ServiceState } from './types/reducers';

export const MOCKUP_SERVICES: ServiceState[] = [
  {
    smartappHuid: '078b44c7-afe9-44e8-8ee5-4fd6452dbac4',
    appId: 'сервис1',
    name: 'Сервис 1',
    avatar: 'https://cts1dev.ccsteam.ru/uploads/profile_avatar/0833887b-2083-59e5-8d45-974c89131d13/90a4139730d8411f9547eaa17edc7b4c.png?v=1618478844359',
    orderValue: 1,
  },
  {
    smartappHuid: 'ef270d05-04b0-4b11-b87b-5fccbb85c829',
    appId: 'сервис2',
    name: 'Сервис 2',
    avatar: null,
    orderValue: 2,
  },
  {
    smartappHuid: '078b44c7-afe9-44e8-8ee5-4fd6452dbac5',
    appId: 'сервис3',
    name: 'Сервис 3',
    avatar: null,
    orderValue: 3,
  },
  {
    smartappHuid: '078b44c8-afe9-44e8-8ee5-4fd6452dbac4',
    appId: 'сервис4',
    name: 'Сервис 4',
    avatar: null,
    orderValue: 4,
  },
  {
    smartappHuid: '078b54c8-afe9-44e8-8ee5-4fd6452dbac4',
    appId: 'сервис5',
    name: 'Сервис 5',
    avatar: null,
    orderValue: 5,
  },
  {
    smartappHuid: '078b44c8-afe9-44e8-8ee5-4fd64526dbac4',
    appId: 'сервис6',
    name: 'Сервис 6',
    avatar: null,
    orderValue: 6,
  },
  {
    smartappHuid: '078b447c8-afe9-44e8-8ee5-4fd6452dbac4',
    appId: 'сервис7',
    name: 'Сервис 7',
    avatar: null,
    orderValue: 7,
  },
  {
    smartappHuid: '078b44c88-afe9-44e8-8ee5-4fd6452dbac4',
    appId: 'сервис8',
    name: 'Сервис 8',
    avatar: null,
    orderValue: 8,
  },
  {
    smartappHuid: '078b44c8-af9e9-44e8-8ee5-4fd6452dbac4',
    appId: 'сервис9',
    name: 'Сервис 9',
    avatar: null,
    orderValue: 9,
  },
];

export const MOCKUP_CHATS: ChatState[] = [
  {
    groupChatId: '740cf331-d833-5250-b5a5-5b5cbc697ff5',
    name: 'Чат 1',
    avatar: null,
    orderValue: 1,
  },
  {
    groupChatId: '740cf331-d8334-5250-b5a5-5b5cbc697ff5',
    name: 'Чат 2',
    avatar: null,
    orderValue: 2,
  },
  {
    groupChatId: '740cf331-d83342-5250-b5a5-5b5cbc697ff5',
    name: 'Чат 3',
    avatar: null,
    orderValue: 3,
  },
  {
    groupChatId: '740cf331-d83342-52530-b5a5-5b5cbc697ff5',
    name: 'Чат 4',
    avatar: null,
    orderValue: 4,
  }
];

export const MOCKUP_CONTACTS: ContactState[] = [
  {
    name: 'Светлова Ирина',
    avatar: null,
    company: 'Express, Unlimited Production',
    companyPosition: 'Дизайнер',
    contacts: [{ userHuid: '6fafda2c-6505-57a5-a088-25ea5d1d0364' }],
    orderValue: 1,
  },
  {
    name: 'Денисова Наталья',
    avatar: null,
    company: 'Express, Unlimited Production',
    companyPosition: 'Руководитель подразделения',
    contacts: [{ userHuid: '6fafda2c-6505-57a5-a088-25ea5d1d03364' }],
    orderValue: 2,
  },
  {
    name: 'Смирнова Екатерина',
    avatar: null,
    company: 'Express, Unlimited Production',
    companyPosition: 'Руководитель подразделения',
    contacts: [{ userHuid: '6faafda2c-6505-57a5-a088-25ea5d1d03364' }],
    orderValue: 3,
  },
  {
    name: 'Авраменко Яна',
    avatar: null,
    company: 'Express, Unlimited Production',
    companyPosition: 'Разработчик',
    contacts: [{ userHuid: '6fafdas2c-6505-57a5-a088-25ea5d1d0364' }],
    orderValue: 4,
  },
  {
    name: 'Авраменко Дарья',
    avatar: null,
    company: 'Express, Unlimited Production',
    companyPosition: 'Разработчик',
    contacts: [{ userHuid: '6faffdas2c-6505-57a5-a088-25ea5d1d0364' }],
    orderValue: 5,
  },
  {
    name: 'Есина Екатерина',
    avatar: null,
    company: 'Express, Unlimited Production',
    companyPosition: 'Разработчик',
    contacts: [{ userHuid: '6fsaffdas2c-6505-57a5-a088-25ea5d1d0364' }],
    orderValue: 6,
  },
  {
    name: 'Хузин Вильдан',
    avatar: null,
    company: 'Express, Unlimited Production',
    companyPosition: 'Разработчик',
    contacts: [{ userHuid: '6fssaffdas2c-6505-57a5-a088-25ea5d1d0364' }],
    orderValue: 7,
  }
];