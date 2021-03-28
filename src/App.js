import { ChatEngine } from "react-chat-engine";

import LoginForm from "./components/LoginForm";
import ChatFeed from "./components/ChatFeed";

import "./App.css";

const App = () => {
  if (!localStorage.getItem("username")) return <LoginForm />
  
  return (
    <ChatEngine
      height="100vh"
      projectID="44c4f1ff-6048-4e0e-ad28-16790737836c"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      // renderChatHeader={(chat) => <ChatHeaderCustom {...chat} />}
      // renderChatSettings={(chatAppState) => {}}
      // renderPeopleSettings={(creds, chat) => {}}
      // renderChatSettingsTop={(creds, chat) => {}}
    />
  );
};

export default App;
