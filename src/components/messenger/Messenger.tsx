import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import { ReactComponent as AddChat } from '../../assets/icons/pure-plus.svg';
import { ROUTES_PATH } from '../../constants/constants';
import MessengerList from './messenger-list/MessengerList';
import Chat from './chat/Chat';
import { getDashboardItemsIds } from '../../redux/selectors/dashboard';
import { getFullMessengerInfo } from '../../mockups';
import './Messenger.scss';

const Messenger = () => {
  const navigate = useNavigate();

  const { chatsIds, contactsIds } = useSelector(getDashboardItemsIds);
  // TODO: useMemo -> useSelector
  const { chats, contacts } = useMemo(() => getFullMessengerInfo(chatsIds, contactsIds), [chatsIds, contactsIds]);

  const [currentChat, setCurrentChat] = useState('');

  const [showChatsList, setShowChatsList] = useState(true);
  const handleChatsListToggle = () => {
    setShowChatsList((old) => !old);
  };

  const handleChatClick = useCallback((id: string) => {
    setCurrentChat(id);
    // some api logic
  }, []);

  useEffect(() => {
    // subscribe
    return () => {
      // clear subscribe
    };
  }, []);

  return (
    <div
      className={classNames({
        wrapper: true,
        messenger: true,
      })}
    >
      <div className="messenger__header">
        <div className="messenger__title">
          <span onClick={handleChatsListToggle} className="curs-point">
            Чаты
          </span>{' '}
          <AddChat className="curs-point " onClick={() => navigate(`/${ROUTES_PATH.add}`)} />
        </div>
      </div>
      <div className="messenger__container">
        {showChatsList && <MessengerList currentChat={currentChat} chats={chats} contacts={contacts} onChatClick={handleChatClick} />}
        <Chat currentChat={currentChat} />
      </div>
    </div>
  );
};

export default Messenger;
