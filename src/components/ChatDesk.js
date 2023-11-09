import "../Style/chatdesk.css";
import image from "../images/2.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Firebase
import app from "./Firebase";
import {
  getFirestore,
  getDoc,
  addDoc,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";

const ChatDesk = () => {
  const [chatLength, setChatLength] = useState();
  const [chatState, setChatState] = useState(false);
  const [resNum, setResNum] = useState(0);
  const [resKey, setResKey] = useState(0);
  const userName = localStorage.getItem("user-name");
  const userPhone = parseFloat(localStorage.getItem("user-phone"));

  //Firebase
  const db = getFirestore(app);

  useEffect(() => {
    if (!userPhone) {
      return;
    }
    function getDet() {
      const detRef = collection(db, `users/${userPhone}/chatroom`);
      getDocs(detRef).then((snap) => {
        setChatLength(snap.size);
      });
    }

    getDet();
  }, []);

  function setupChat() {
    setResNum(resNum * 1099);
    const resNum2 = parseFloat(resNum) * 1099;

    if (resKey && resNum && userPhone) {
      const resMsgRef = collection(db, `users/`);
      const resDet = doc(db, `users/${resNum2}`);

      //Get details from db an check
      getDoc(resDet).then((snap) => {
        if (snap.exists()) {
          const resKeyDb = parseFloat(snap.data().key)-9901;
          if (resKeyDb === parseFloat(resKey)) {
            localStorage.setItem("res-num", snap.data().phone);
            localStorage.setItem("res-name", snap.data().name);

            setChatState(true);
            alert("Nice! your chat is ready, Go to chat");
            return;
          } else {
            alert("Error: Recepient key is not correct");
            return;
          }
        } else {
          alert("Error: Confirm Recepients Number! ( User may not available )");
        }
      });
    } else {
      resNum.length < 9 && alert("Invalid phone number Length");
      !resKey && alert("Please enter recepient key");
      !resNum && alert("Please enter phone number");
      !userPhone && alert("Error: Your not logged in !");
    }
  }

  function deleteDet() {
    const a = prompt('Type "yes" to confirm log out ');

    if (a === "yes") {
      localStorage.clear();
      window.location.href="/"
      alert("Your logged out successfully, see you soon");
    } else {
      alert("log out is canceled");
    }
  }

  return (
    <div className="page chat-desk-page flex-col ">
      <header>
        <span></span>
        <p>Hi, {userName}</p>
        <p>||</p>
        <p>
          {chatLength} {chatLength <= 1 ? "chat" : "chats"}
        </p>
        <p onClick={deleteDet}>Log Out</p>
      </header>
      <section>
        <img src={image} />
      </section>

      <div className="flex-col">
        <input
          type={"number"}
          placeholder="Enter Recepients Number"
          onChange={(e) => setResNum(e.target.value)}
        />
        <input
          type={"password"}
          placeholder="Enter Recepients Key"
          onChange={(e) => setResKey(e.target.value)}
        />

        {!chatState && <button onClick={setupChat}>Chat</button>}
        {chatState && (
          <button>
            <Link to={"/ChatRoom"}> Go to chat room</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatDesk;

//Chat state toggles chat button and the link to the chat room after verification
