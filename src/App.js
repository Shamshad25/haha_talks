import { useEffect, useState } from "react";
import "./App.css";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Logo from "./images/comments.png";
import Google from "./images/google.png";
import Send from "./images/send.png";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email });
        getMessages();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const getMessages = () => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  };

  useEffect(() => {
    if (user.email) {
      getMessages();
    }
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message,
    });

    setMessage("");
  };

  return (
    <div>
      {user.email ? null : (
        <div className="signIn">
          <div className="title">
            <h1>Welcome to HahaTalks!</h1>
            <img
              src={Logo}
              alt="logo"
              className="logo"
              width="50px"
              height="50px"
            />
          </div>
          <div className="btn">
            <img src={Google} alt="google" width="40px" height="40px" />
            <button
              onClick={(e) => {
                googleLogin();
              }}
            >
              {" "}
              Sign In
            </button>
          </div>
          <h4>To connect and chat with your Friends and Family</h4>
        </div>
      )}
      {user.email ? (
        <div>
          <div className="header">
            <span class="dot"></span>
            <h3>{user.name}</h3>
          </div>
          <div id="chat" className="chatContainer">
            {chats.map((chat, index) => {
              return (
                <div
                  key={index}
                  className={`container ${
                    chat.user.email === user.email ? "me" : ""
                  }`}
                >
                  <p className="chatBox">
                    <span>{chat.message}</span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="inputBox">
            <input
              type="text"
              onInput={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Type here..."
            ></input>
            <button onClick={(e) => sendChat()}>
              <h3>Send</h3>
              <img src={Send} alt="send" width="15px" height="15px" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
