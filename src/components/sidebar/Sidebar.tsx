import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAppSelecter } from '../../app/hooks';
import { db } from '../../firebase';
import { DocumentData, DocumentReference, addDoc, collection, query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { channel } from 'diagnostics_channel';
import useCollection from '../../hooks/useCollection';

interface Channel {
    id: string;
    channel:DocumentData
}

const Sidebar = () => {

    const user = useAppSelecter((state) => state.user.user);

    const { documents: channels } = useCollection("channels");

    const addChannel = async () => {
        let channelName = prompt("新しいチャンネルを作成");
    
        if (channelName) {
          const docRef: DocumentReference<DocumentData> = await addDoc(
            collection(db, "channels"),
            {
              channelName: channelName,
            }
          );
          // console.log(docRef);
        }
      };


  return (
    <div className='sidebar'>


        <div className="sidebarLeft">
            <div className="serverIcon">
                <img src="./yucchy.jpg" alt="" />
            </div>
            {/* <div className="serverIcon">
                <img src="./logo192.png" alt="" />
            </div> */}
        </div>


        <div className="sidebarRight">

            <div className="sidebarTop">
                <h3>チャット一覧</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebarChannels">

                <div className="sidebarChannelsHeader">
                    <div className="sidebarHeader">
                        <ExpandMoreIcon />
                        <h4>チャット</h4>
                    </div>
                    <AddIcon className='.sidebarAddChannel' onClick={() => addChannel()}/>
                </div>

                <div className="sidebarChannelList">
                    {channels.map((channel) => (
                        <SidebarChannel channel={channel} id={channel.id} key={channel.id}/>
                    ))}
                    {/* <SidebarChannel />
                    <SidebarChannel />
                    <SidebarChannel /> */}
                </div>
                
                <div className="sidebarFooter">
                    <div className="sidebarAccount">
                        <img src={user?.photo} alt="" />
                        <div className="accountName">
                            <h4>{user?.displayName}</h4>
                            <span>#{user?.uid.substring(0, 4)}</span>
                        </div>
                    </div>
                    <div className="sidebarVoice">
                        <SettingsIcon />
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Sidebar