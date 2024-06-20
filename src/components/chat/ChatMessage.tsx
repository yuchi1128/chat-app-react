import React from 'react'
import "./ChatMessage.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

type Props = {
  message: string;
  timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

function ChatMessage(props: Props) {

  const { message, timestamp, user } = props;
  
  return (
    <div className='message'>
        <Avatar src={user?.photo}/>
        <div className="messageInfo">
            <h4>
                {user.displayName}
                <span className='messageTimestamp'>{new Date(timestamp?.toDate()).toLocaleString()}</span>
            </h4>

            <p>{message}</p>
        </div>
    </div>
  )
}

export default ChatMessage