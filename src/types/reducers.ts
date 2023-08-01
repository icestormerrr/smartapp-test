import { RouterState } from 'connected-react-router';

export interface UiState {
  mainLoader: boolean;
  notification: {
    isOpen: boolean;
    type: string;
  };
}

export interface ServiceState {
  appId: string;
  smartappHuid: string;
  name: string;
  avatar: string | null;
  orderValue: number;
}

export interface ChatState {
  groupChatId: string;
  name: string;
  avatar: string | null;
  orderValue: number;
}

export interface ContactState {
  name: string;
  avatar: string | null;
  company: string | null;
  companyPosition: string | null;
  contacts: Array<{ userHuid: string }>;
  orderValue: number;
}

export interface DashboardItems {
  services: ServiceState[];
  chats: ChatState[];
  contacts: ContactState[];
}

export interface DashboardState {
  services: ServiceState[];
  chats: ChatState[];
  contacts: ContactState[];
  searchResults: {
    services: ServiceState[] | null;
    chats: ChatState[] | null;
    contacts: ContactState[] | null;
  };
}

export interface ApplicationState {
  ui: UiState;
  router: RouterState;
  dashboard: DashboardState;
}