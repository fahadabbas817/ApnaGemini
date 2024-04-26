import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { GeminiContext } from "../Context/GeminiContext";
const Main = () => {
  const { input, setInput, showResult, recentPrompt,result, onSent, loading } =
    useContext(GeminiContext);

  return (
    <>
      <div className="main">
        <div className="top-main-menu">
          
          <p>Gemini</p>
          <img src={assets.Cyber} alt="User" />
        </div>

        <div className="main-container">
          {!showResult?
            <>
            <div className="hero-text">
            <p>
              <span>Hello, Boss.</span>
            </p>
            <p>How Can I help You?</p>
          </div>
          <div className="card-container">
            <div className="card">
              <p>What is React? Can You tell me more about this frameword</p>
              <img src={assets.bulb_icon} alt="bulb" />
            </div>
            <div className="card">
              <p>What is React? Can You tell me more about this frameword</p>
              <img src={assets.code_icon} alt="bulb" />
            </div>
            <div className="card">
              <p>What is React? Can You tell me more about this frameword</p>
              <img src={assets.compass_icon} alt="bulb" />
            </div>
            <div className="card">
              <p>
                How to set a NexJS app in the Vercel without using the
                commandline
              </p>
              <img src={assets.message_icon} alt="bulb" />
            </div>
          </div>
          </>:<div className="result">
            <div className="result-title">
              <img src={assets.Cyber} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading?<div className="loading">
                <hr />
                <hr />
                <hr />
              </div>:<p dangerouslySetInnerHTML={{__html:result}}></p>}
              
            </div>
            </div>}
          
          <div className="main-bottom">
            <div
              className="search"
              onKeyDown={(e) => e.key === "Enter" && onSent()}
            >
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter the prompt here"
                name=""
                id=""
              />
              <div className="searchbar-image">
                <img src={assets.Add_Record} alt="" />
                <img src={assets.Add_Image} alt="" />
                {input?<img onClick={() => onSent()} src={assets.Email_Send} alt="" />:null}
              </div>
            </div>
            <p className="bottomtext">
              Dont rely on shera Shera is not correct all the times
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
