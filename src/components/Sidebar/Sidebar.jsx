import React, { useContext } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'
import { GeminiContext } from '../Context/GeminiContext'


const Sidebar = () => {
const [extend, setExtend] = useState(null);
const{onSent,setPrevPrompt,prevPrompt,recentPrompt,setRecentPrompt,newChatbtn} = useContext(GeminiContext)



const sidebarPrompt = async(prompt)=>{
    await onSent(prompt)
}

  return (
    <>
    <div className={`sidebar ${extend?'sidebaranimate':null}`}>
        <div className="top-menu">
            <img className='top-menu-img' src={assets.Menu} alt="menu" onClick={()=>setExtend(!extend)}/>
            <div onClick={()=>newChatbtn()} className="new-chat">
                <img src={assets.plus_icon} alt="add" />
                {extend?<p>New Chat</p>:null}
            </div>
            {extend?<div className="recent">
                    <h3>Recent</h3>
                    {prevPrompt.map((item,index)=>{
                        return(<div onClick={()=>sidebarPrompt(item)} className="recent-chats box" key={index}>
                        <img src={assets.message_icon} alt='message' />
                        <p>{item.slice(0,16)}...</p>
                    </div>)
                    
                    })}
                </div>:null}
            
        </div>
        <div className="bottom-menu">
            <div className="setting box">
                <img src={assets.Settings} alt='setting' />
               {extend?<p>Settings</p>:null} 
            </div>
            <div className="help box">
                <img src={assets.Help} alt='help' />
               {extend?<p>Help</p>:null} 
            </div>
            <div className="activity box">
                <img src={assets.Time_Machine} alt="history" />
                {extend?<p>Activity</p>:null}
            </div>
        </div>
    </div>
    
    
    </>
  )
}

export default Sidebar