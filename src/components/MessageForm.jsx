import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import {
  SentOutlined,
  pictureOutlined,
  PictureOutlined,
  SendOutlined,
} from "@ant-design/icons";

const MessageForm = (props) => {
  // Initial value of message is simply empty string
  const [value, setValue] = useState("");

  const { chatId, creds } = props;

  const handleSubmit = (event) => {
    event.preventDefault(); // not do browser refresh once you submit form

    const text = value.trim();

    if (text.length > 0) sendMessage(creds, chatId, { text });

    setValue(""); // reset message box to empty string
  };

  const handleChange = (event) => {
    setValue(event.target.value); // where value of input is stored

    isTyping(props, chatId); 
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, test: "" });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message!"
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;
