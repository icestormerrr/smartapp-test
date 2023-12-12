import React, { FC, memo } from 'react';

import classNames from 'classnames';

import { ReactComponent as Corporate } from '../../../../assets/icons/corporate.svg';
import { ReactComponent as MessageStatus } from '../../../../assets/icons/message-status.svg';
import { getInitials } from '../../../../helpers';
import './MessengerListItem.scss';

interface MessengerListItemProps {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  unreadMsgCount: number;
  time: string | number;
  isCurrent: boolean;
  onClick: (id: string) => void;
}

const MessengerListItem: FC<MessengerListItemProps> = memo(({ id, name, avatar, lastMessage, unreadMsgCount, time, isCurrent, onClick }) => {
  const nameInitials = getInitials(name)[0] + getInitials(name)[2];
  const lastMessageShort = lastMessage.length > 50 ? lastMessage.slice(0, 50) + '...' : lastMessage;
  const nameShort = name.length > 50 ? name.slice(0, 50) + '...' : name;

  return (
    <div className={classNames({ 'messenger-list-item': true, 'messenger-list-item--current': isCurrent })} onClick={() => onClick(id)}>
      {!avatar ? <div className="messenger-list-item__img">{nameInitials}</div> : <div className="messenger-list-item__img" />}
      <div className="messenger-list-item__content">
        <div className="messenger-list-item__name">
          <Corporate />
          <label>{nameShort}</label>
        </div>
        <div className="messenger-list-item__message">
          {!unreadMsgCount && <MessageStatus />}
          <label>{lastMessageShort}</label>
        </div>
      </div>
      <div className="messenger-list-item__status">
        <label>{time}</label>
        {!!unreadMsgCount && <div className="messenger-list-item__count">{unreadMsgCount}</div>}
      </div>
    </div>
  );
});

export default MessengerListItem;
