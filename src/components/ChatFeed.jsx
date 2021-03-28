import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

import { deleteChat } from "react-chat-engine";

import Confetti from "react-confetti";

import { toInt, toString } from "../utilities/date";

const ChatFeed = (props) => {
  const ONE_SECOND = 1000;
  const ONE_MINUTE = 60 * ONE_SECOND;
  const ONE_HOUR = 60 * ONE_MINUTE;

  const { creds, chats, activeChat, userName, messages } = props;
  const callback = (data) => console.log(data);

  const chat = chats && chats[activeChat]; // if chat exists, get the active chat

  const hasMessages = Object.keys(messages).length > 0; // this doesn't seem to work

  const renderReadReceipts = (message, isMyMessage) => {
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`} 
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      // If there are messages, find the last message
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {
              // Ternary operator!!
              isMyMessage ? (
                <MyMessage message={message} /> // display MyMessage return value
              ) : (
                <TheirMessage
                  message={message}
                  lastMessage={messages[lastMessageKey]}
                />
              )
            }
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "76px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  renderMessages();

  if (!chat) return "Loading...";

  const lastMessageTime = chat.last_message.created;
  const lastMessageTimeInt = toInt(lastMessageTime);
  const lastMessageTimeString = toString(lastMessageTime);

  const date = new Date();
  // Move back an hour because the backend doesn't recognise the BST change...
  const now = date.valueOf() - ONE_HOUR;

  const deleteContact = async () => {
    await new Promise((r) => setTimeout(r, 10 * ONE_SECOND));
    deleteChat(creds, activeChat, callback);
    window.location.reload();
  };

  // const shouldDelete = now - lastMessageTimeInt >= 24 * ONE_HOUR;
  const shouldDelete = false;

  if (hasMessages && shouldDelete) {
    deleteContact();
    return (
      <div className="chat-feed">
        <Confetti width="650px" height="800px" />
        <div className="friend-deletion">
          <h1>Congratulations!</h1>
          <h2>You're a horrible friend</h2>
          <h3>
            Why bother adding someone on a messaging app if you're not going to
            message them?
          </h3>
          <br />
          <h3>This chat will be deleted in 10 seconds.</h3>
          <br />
          <br />
          <h4>You should be ashamed of yourself.</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        {/* Kotlin-like non-null syntax - OH BABY! */}
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">{`Last messaged: ${lastMessageTimeString}`}</div>
      </div>
      {renderMessages()}
      <div style={{ height: "100px" }} />
      {/* This is the message box */}
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
