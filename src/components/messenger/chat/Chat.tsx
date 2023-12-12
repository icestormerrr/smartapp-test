import React, {FC} from 'react';
import { ReactComponent as EmptyChat } from '../../../assets/icons/chats.svg';
import "./Chat.scss";

interface ChatProps {
  currentChat: string;
}

const Chat: FC<ChatProps> = ({currentChat}) => {
  return (
    <div className="chat">
      {!currentChat ? (
        <div className="chat--placeholder">
          <EmptyChat />
          <p>Выберите нужный чат из списка</p>
        </div>
      ): <h1>{currentChat}</h1>}
    </div>
  );
};

export default Chat;