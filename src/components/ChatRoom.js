import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Style/chatroom.css";
//firebase
import app from "./Firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

function Message({ msg }) {
  const userPhone = parseFloat(localStorage.getItem("user-phone"));

  return (
    <div
      className={`message ${userPhone === msg.senderPhone && "message-right"}`}
    >
      <p>{msg.message}</p>
    </div>
  );
}

const ChatRoom = () => {
   const [text, setText] = useState();
  const [reloadChat, setReloadChat] = useState(false);
  const userName = localStorage.getItem("user-name");
  const userNum = parseFloat(localStorage.getItem("user-phone"));
  const resName = localStorage.getItem("res-name");
  const resNum = parseFloat(localStorage.getItem("res-num"));

  //Firebase
  const db = getFirestore(app);
  const userMsgCol = collection(db, `users/${userNum}/chatroom/${resNum}/chat`);
  const resMsgCol = collection(db, `users/${resNum}/chatroom/${userNum}/chat`);

  //Chat Messages
  const [msgs, setMsgs] = useState([
    {
      name: "james",
      message: "hey how are you",
    },
    {
      name: "james",
      message: "hey how are you",
    },
    {
      name: "james",
      message:
        "hey are you hey how are you hey how are you hey how are you hey how are you hey how are you hey how are you",
    },
  ]);
 

  useEffect(() => {
    function getMsgs() {
      const msgsRef1 = collection(
        db,
        `users/${userNum}/chatroom/${resNum}/chat`
      );
      const msgsRef = query(msgsRef1, orderBy("createdAt"));

      setMsgs([]);
      const array = [];
      getDocs(msgsRef).then((docs) => {
        docs.forEach((doc) => {
          console.log(doc.data())
          array.push(doc.data());
        });
        setMsgs([...array]);
      });
    }

    getMsgs();
  }, [reloadChat]);

  function addMsg() {
    //Checks for recepients number
    if (resNum && text!="") {
      const outText = {
        senderName: userName,
        senderPhone: userNum,
        resPhone: resNum,
        resName: resName,
        message: text,
        createdAt: serverTimestamp(),
      };

      //add msgs to db
      addDoc(resMsgCol, outText);
      addDoc(userMsgCol, outText);

      setText("");

      //setMsgs([...msgs, outText]);
      setText("");
      setReloadChat(!reloadChat);
    } else {
      alert("Please add 'RECEPIENT NUMBER' ");
    }
  }

  return (
    <div className="chat-room-page page flex-col">
      <div className="chat-box">
        <header className="flex">
          <section className="flex">
            <span>.</span>
            <p>{resName}</p>
          </section>
          <Link to={"/ChatDesk"}>Back</Link>
        </header>

        <div>
          {msgs.map((msg) => (
            <Message key={Math.random()} msg={msg} />
          ))}
        </div>

        <section className="flex">
          <input
            type={"type"}
            placeholder="Type Message"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button onClick={addMsg}>Send</button>
        </section>
      </div>
    </div>
  );
};

export default ChatRoom;


/*
git remote add origin https://github.com/ammedia-dev/amchat4.git
git branch -M main
git push -u origin main
*/