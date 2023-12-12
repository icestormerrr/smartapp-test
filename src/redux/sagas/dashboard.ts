import { all, put, takeEvery, select } from 'redux-saga/effects';
import { Bridge as bridge, ready, getChats, searchCorporatePhonebook, openSmartApp, openGroupChat, openContactCard } from '@expressms/smartapp-sdk';
import { GeneratorFunction } from '../../types/sagas';
import {
  INIT_APP,
  FETCH_DASHBOARD_ITEMS,
  SEARCH_FOR_NEW_DASHBOARD_ITEMS,
  ADD_ITEM_TO_DASHBOARD,
  REMOVE_ITEM_FROM_DASHBOARD,
  CHANGE_DASHBOARD_ITEMS_ORDER,
  OPEN_SMART_APP,
  OPEN_GROUP_CHAT,
  OPEN_CONTACT_CARD,
  setDashboardItems,
  setFoundItemsForDashboard,
  updateItemsOnDashboard,
  searchForNewDashboardItemsActionType,
  addItemToDashboardActionType,
  removeItemFromDashboardActionType,
  changeDashboardItemsOrderActionType,
  openSmartAppActionType,
  openGroupChatActionType,
  openContactCardActionType,
} from '../actions/dashboard';
import { setMainLoader, setNotification } from '../actions/ui';
import { getDashboardItems } from '../selectors/dashboard';
import { METHODS, NOTIFICATION_TYPES, SECTION_TYPE, STATUS_OK, STATUS_SUCCESS } from '../../constants/constants';
import { MOCKUP_CHATS, MOCKUP_CONTACTS, MOCKUP_SERVICES } from '../../mockups';
import { ChatState, ContactState, ServiceState } from '../../types/reducers';
import { getNextOrderValue } from '../../helpers';

export function* initAppSaga(): GeneratorFunction {
  try {
    yield put(setMainLoader(true));
    yield ready();
    yield fetchDashboardItemsSaga();
  } catch (e) {
    console.error('initAppSaga error: ', e);
  } finally {
    yield put(setMainLoader(false));
  }
}

export function* fetchDashboardItemsSaga(): GeneratorFunction {
  try {
    yield put(setMainLoader(true));

    const response = yield bridge?.sendBotEvent({
      method: METHODS.getDashboard,
      params: {},
    });

    if (response?.payload?.status === STATUS_OK) {
      yield put(
        setDashboardItems({
          services: MOCKUP_SERVICES, //response?.payload?.result?.services || [],
          chats: MOCKUP_CHATS, //response?.payload?.result?.chats || [],
          contacts: MOCKUP_CONTACTS, //response?.payload?.result?.contacts || [],
        })
      );
    }
  } catch (e) {
    console.error('fetchDashboardItemsSaga error: ', e);
  } finally {
    yield put(setMainLoader(false));
  }
}

export function* searchForNewDashboardItemsSaga({ payload: querySearch }: searchForNewDashboardItemsActionType): GeneratorFunction {
  try {
    yield put(setMainLoader(true));

    const servicesResponse = yield bridge?.sendBotEvent({
      method: METHODS.getServices,
      params: { query_search: querySearch },
    });

    // const services = [...(servicesResponse?.payload?.result?.services || [])];
    const services = MOCKUP_SERVICES.filter((service) => service.name.toLowerCase().includes(querySearch.toLowerCase()));

    const chatsResponse = yield getChats({ filter: querySearch });
    // const chats = [...(chatsResponse?.payload?.chats || [])];
    const chats = MOCKUP_CHATS.filter((chat) => chat.name.toLowerCase().includes(querySearch.toLowerCase()));

    const contactsResponse = yield searchCorporatePhonebook({ filter: querySearch });
    // const contacts[...(contactsResponse?.payload?.corpPhonebookEntries || []), ...(contactsResponse?.payload?.trustSearchEntries || [])];
    const contacts = MOCKUP_CONTACTS.filter((contact) => contact.name.toLowerCase().includes(querySearch.toLowerCase()));

    yield put(setFoundItemsForDashboard({ services, chats, contacts }));
  } catch (e) {
    console.error('searchForNewDashboardItemsSaga error: ', e);
  } finally {
    yield put(setMainLoader(false));
  }
}

export function* addItemToDashboardSaga({ payload }: addItemToDashboardActionType): GeneratorFunction {
  try {
    yield put(setMainLoader(true));

    let { services, chats, contacts } = yield select(getDashboardItems);

    if (payload.entityType === SECTION_TYPE.services && services.length === 9) {
      yield put(setNotification({ isOpen: true, type: NOTIFICATION_TYPES.services }));
      return;
    } else if (payload.entityType === SECTION_TYPE.chats && chats.length === 9) {
      yield put(setNotification({ isOpen: true, type: NOTIFICATION_TYPES.chats }));
      return;
    } else if (contacts.length === 9) {
      yield put(setNotification({ isOpen: true, type: NOTIFICATION_TYPES.contacts }));
      return;
    }

    const orderValue: number =
      payload.entityType === SECTION_TYPE.services
        ? getNextOrderValue(services)
        : payload.entityType === SECTION_TYPE.chats
          ? getNextOrderValue(chats)
          : getNextOrderValue(contacts);

    const response = yield bridge?.sendBotEvent({
      method: METHODS.postDashboard,
      params: {
        entity_type: payload.entityType,
        entity: payload.entity,
      },
    });

    // if (response?.payload?.result === STATUS_SUCCESS) {
    if (true) {
      yield put(updateItemsOnDashboard({ entity: { ...payload.entity, orderValue }, entityType: payload.entityType }));
    }
  } catch (e) {
    console.error('addItemToDashboardSaga error: ', e);
  } finally {
    yield put(setMainLoader(false));
  }
}

export function* removeItemFromDashboardSaga({ payload }: removeItemFromDashboardActionType): GeneratorFunction {
  try {
    yield put(setMainLoader(true));

    let { services, chats, contacts } = yield select(getDashboardItems);

    if (payload.entityType === SECTION_TYPE.services) {
      services = [...(services as ServiceState[]).filter(({ smartappHuid }) => smartappHuid !== payload.entityId)];
    } else if (payload.entityType === SECTION_TYPE.chats) {
      chats = [...(chats as ChatState[]).filter(({ groupChatId }) => groupChatId !== payload.entityId)];
    } else {
      contacts = [...(contacts as ContactState[]).filter(({ contacts }) => contacts[0].userHuid !== payload.entityId)];
    }

    const response = yield bridge?.sendBotEvent({
      method: METHODS.deleteDashboard,
      params: {
        entity_type: payload.entityType,
        entity_id: payload.entityId,
      },
    });

    // if (response?.payload?.result === STATUS_SUCCESS) {
    if (true) {
      yield put(setDashboardItems({ services, chats, contacts }));
    }
  } catch (e) {
    console.error('removeItemFromDashboardSaga error: ', e);
  } finally {
    yield put(setMainLoader(false));
  }
}

export function* changeDashboardItemsOrderSaga({ payload }: changeDashboardItemsOrderActionType): GeneratorFunction {
  try {
    yield put(setMainLoader(true));

    let { services, chats, contacts } = yield select(getDashboardItems);
    let entitiesOrder;

    if (payload.entityType === SECTION_TYPE.services) {
      services = [...payload.entities];
      entitiesOrder = payload.entities.map((entity) => ({
        id: entity.smartappHuid,
        order_value: entity.orderValue,
      }));
    } else if (payload.entityType === SECTION_TYPE.chats) {
      chats = [...payload.entities];
      entitiesOrder = payload.entities.map((entity) => ({
        id: entity.groupChatId,
        order_value: entity.orderValue,
      }));
    } else {
      contacts = [...payload.entities];
      entitiesOrder = payload.entities.map((entity) => ({
        id: entity.contacts[0].userHuid,
        order_value: entity.orderValue,
      }));
    }

    const response = yield bridge?.sendBotEvent({
      method: METHODS.patchDashboardOrdering,
      params: {
        entity_type: payload.entityType,
        entities_order: entitiesOrder,
      },
    });

    //if (response?.payload?.result === STATUS_SUCCESS) {
    if (true) {
      yield put(setDashboardItems({ services, chats, contacts }));
    }
  } catch (e) {
    console.error('changeDashboardItemsOrderSaga error: ', e);
  } finally {
    yield put(setMainLoader(false));
  }
}

export function* openSmartAppSaga({ payload: appId }: openSmartAppActionType): GeneratorFunction {
  try {
    yield openSmartApp({ appId });
  } catch (e) {
    console.error('openSmartAppSaga error: ', e);
  }
}

export function* openGroupChatSaga({ payload: groupChatId }: openGroupChatActionType): GeneratorFunction {
  try {
    yield openGroupChat({ groupChatId });
  } catch (e) {
    console.error('openGroupChatSaga error: ', e);
  }
}

export function* openContactCardSaga({ payload: userHuid }: openContactCardActionType): GeneratorFunction {
  try {
    yield openContactCard({ userHuid });
  } catch (e) {
    console.error('openContactCardSaga error: ', e);
  }
}

export function* rootDashboardSaga() {
  yield all([
    takeEvery(INIT_APP, initAppSaga),
    takeEvery(FETCH_DASHBOARD_ITEMS, fetchDashboardItemsSaga),
    takeEvery(SEARCH_FOR_NEW_DASHBOARD_ITEMS, searchForNewDashboardItemsSaga),
    takeEvery(ADD_ITEM_TO_DASHBOARD, addItemToDashboardSaga),
    takeEvery(REMOVE_ITEM_FROM_DASHBOARD, removeItemFromDashboardSaga),
    takeEvery(CHANGE_DASHBOARD_ITEMS_ORDER, changeDashboardItemsOrderSaga),
    takeEvery(OPEN_SMART_APP, openSmartAppSaga),
    takeEvery(OPEN_GROUP_CHAT, openGroupChatSaga),
    takeEvery(OPEN_CONTACT_CARD, openContactCardSaga),
  ]);
}
