import React, { useEffect, useState } from 'react'
import "./Chat.css"
import ChatHeader from './ChatHeader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatMessage from './ChatMessage';
import { useAppSelecter } from '../../app/hooks';
import { DocumentData, DocumentReference, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { setChannelId } from '../../features/channelSlice';


interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

function Chat() {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const user = useAppSelecter((state) => state.user.user);
  const channelId = useAppSelecter((state) => state.channel.channelId);
  const channelName = useAppSelecter((state) => state.channel.channelName);

  useEffect(() => {
    let collectionRef = collection(
        db,
        "channels",
        String(channelId),
        "messages"
      );

    let collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "desc")
    );
    
    // onSnapshot(collectionRef, (snapshot) => {
    // )
    onSnapshot(collectionRef, (snapshot) => {
      let results:Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMessages(results);
    });
  }, [channelId])


  const sendMessage =  async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const collectionRef = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );
    const docRef: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      }
    );
    console.log(docRef);

    setInputText("");
  };

  return (
    <div className='chat'>

        <ChatHeader channelName={channelName}/>

        <div className="chatMessage">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
            />
          ))}
            {/* <ChatMessage /> 
            <ChatMessage /> 
            <ChatMessage /> 
            <ChatMessage /> 
            <ChatMessage />  */}
        </div>

        <div className="chatInput">
            <AddCircleOutlineIcon />
            <form action="">
                <input type="text" placeholder='メッセージを送信' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} value={inputText}/>
                <button type='submit' className='chatInputButton' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>送信</button>
            </form>
        </div>
    </div>
  )
}

export default Chat