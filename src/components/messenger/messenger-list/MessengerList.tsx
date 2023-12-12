import React, { FC, memo, useMemo, useState } from 'react';

import MessengerListItem from './messenger-list-item/MessengerListItem';
import Select, { Option } from '../../select/Select';
import { MESSENGER_FILTER_TYPE } from '../../../constants/constants';
import { ChatsMessengerState, CommonMessengerState, ContactsMessengerState } from '../../../mockups';
import { formatDate } from '../../../helpers';
import './MessengerList.scss';

const ModeOptions: Option[] = [
  { label: 'Все', value: MESSENGER_FILTER_TYPE.all },
  { label: 'Чаты', value: MESSENGER_FILTER_TYPE.chats },
  { label: 'Контакты', value: MESSENGER_FILTER_TYPE.contacts },
];

interface MessengerListProps {
  chats: ChatsMessengerState[];
  contacts: ContactsMessengerState[];
  currentChat: string;
  onChatClick: (id: string) => void;
}

export const MessengerList: FC<MessengerListProps> = memo(({ chats, contacts, currentChat, onChatClick }) => {
  const commonList = useMemo<CommonMessengerState[]>(
    () => [...chats, ...contacts].sort((A: CommonMessengerState, B: CommonMessengerState) => A.time - B.time),
    [chats, contacts]
  );

  const [mode, setMode] = useState<Option<MESSENGER_FILTER_TYPE>>({ label: 'Все', value: MESSENGER_FILTER_TYPE.all });
  const handleModeChange = (newMode: Option) => {
    setMode(newMode);
  };

  const selectedList = useMemo(() => {
    switch (mode.value) {
      case MESSENGER_FILTER_TYPE.all:
        return commonList;
      case MESSENGER_FILTER_TYPE.chats:
        return chats;
      case MESSENGER_FILTER_TYPE.contacts:
        return contacts;
    }
  }, [mode.value, commonList, chats, contacts]);

  return (
    <div className="messenger-list">
      <Select value={mode} options={ModeOptions} onChange={handleModeChange} />
      <div>
        {selectedList &&
          selectedList.map((item) => {
            const isCurrent = currentChat === item.id;
            return (
              <MessengerListItem
                key={item.id}
                id={item.id}
                avatar={item.avatar}
                name={item.name}
                lastMessage={item.lastMessage}
                unreadMsgCount={item.unreadMsgCount}
                time={formatDate(item.time)}
                isCurrent={isCurrent}
                onClick={onChatClick}
              />
            );
          })}
      </div>
    </div>
  );
});

export default MessengerList;
