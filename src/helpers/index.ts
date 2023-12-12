import { isEmpty as _isEmpty, isArray, maxBy } from 'lodash';
import { ServiceState, ChatState, ContactState } from '../types/reducers';
import { DashboardItem } from '../types/types';

export const getServicesArray = (services: ServiceState[], addedServicesIds: string[] = []): DashboardItem[] => services.map(service => ({
  ...service,
  id: service.smartappHuid,
  isAlreadyAdded: addedServicesIds.includes(service.smartappHuid),
}));

export const getChatsArray = (chats: ChatState[], addedChatsIds: string[] = []): DashboardItem[] => chats.map(chat => ({
  ...chat,
  id: chat.groupChatId,
  isAlreadyAdded: addedChatsIds.includes(chat.groupChatId),
}));

export const getContactsArray = (contacts: ContactState[], addedContactsIds: string[] = []): DashboardItem[] => contacts.map(contact => ({
  ...contact,
  id: contact.contacts[0].userHuid,
  user_huid: contact.contacts[0].userHuid,
  description: (contact.companyPosition === null || contact.company === null) ? '' : `${contact.companyPosition}, ${contact.company}`,
  isAlreadyAdded: addedContactsIds.includes(contact.contacts[0].userHuid),
}));

export const isEmpty = (services: ServiceState[] | null, chats: ChatState[] | null, contacts: ContactState[] | null) => ({
  isServicesEmpty: isArray(services) && _isEmpty(services),
  isChatsEmpty: isArray(chats) && _isEmpty(chats),
  isContactsEmpty: isArray(contacts) && _isEmpty(contacts),
  isDataEmpty: (isArray(services) && _isEmpty(services)) && (isArray(chats) && _isEmpty(chats)) && (isArray(contacts) && _isEmpty(contacts)),
});

export const getInitials = (str: string) =>
  str
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('.')
    ?.toUpperCase();

export const getNextOrderValue = (items: any[]) => {
  const itemWithMaxOrderValue: any = maxBy(items, 'orderValue');

  return itemWithMaxOrderValue ? itemWithMaxOrderValue.orderValue + 1 : 1;
};

export const reorderItems = (items: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(items);

  result.forEach((item: any, index: number) => {
    if (startIndex > endIndex && index < startIndex && index >= endIndex) {
      item.orderValue = item.orderValue + 1;
    } else if (startIndex < endIndex && index > startIndex && index <= endIndex) {
      item.orderValue = item.orderValue - 1;
    }
  });

  const [removed]: any[] = result.splice(startIndex, 1);

  removed.orderValue = endIndex + 1;
  result.splice(endIndex, 0, removed);

  return result;
};

export const formatDate = (date: Date | number) => {
  const dateObject = new Date(date);
  const hours = ('0' + dateObject.getHours()).slice(-2);
  const minutes = ('0' + dateObject.getMinutes()).slice(-2);
  return hours + ':' + minutes;
};