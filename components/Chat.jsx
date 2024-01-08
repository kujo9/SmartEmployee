/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "./Button";
import "../app/scrollbar.css";
import Loading from "./Loading";
import ExpandCard from "./ExpandCard";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesScrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [summary, setSummary] = useState(""); // Define summary state
  const [latestResponse, setLatestResponse] = useState("");

  useEffect(() => {
    fakeMessage();
  }, []);

  useEffect(() => {
    if (latestResponse) {
      fetchSummary();
    }
  }, [latestResponse]);

  useEffect(() => {
    setTimeout(() => {
      messagesScrollRef.current.scrollTo({
        top: messagesScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputMessage.trim() === "") {
      return;
    }
    setIsLoading(true);

    const newMessage = {
      content: inputMessage,
      isPersonal: true,
      timestamp: new Date().getTime(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setInputMessage("");

    try {
      const response = await axios.post(
        "https://admin-backend-2api-2imn7pfmma-uc.a.run.app/chain",
        JSON.stringify({ query: inputMessage }), // Explicitly stringify the payload
        {
          headers: {
            "Content-Type": "application/json", // Set the content type header
          },
        }
      );

      const responseData = response.data;
      console.log("Received response:", responseData);

      const responseMessage = {
        content: responseData.response,
        isPersonal: false,
        timestamp: new Date().getTime(),
      };

      setLatestResponse(responseData.response); // Add this line

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const fakeMessage = () => {
    const fakeMessages = ["Welcome To Afterflea!"];

    const fakeMessageIndex = Math.floor(Math.random() * fakeMessages.length);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: fakeMessages[fakeMessageIndex],
        isPersonal: false,
        timestamp: new Date().getTime(),
      },
    ]);
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.post(
        "https://admin-backend-2api-2imn7pfmma-uc.a.run.app/assistant",
        {
          response: latestResponse,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      console.log("Received summary:", responseData.response);
      setSummary(responseData.response);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const handleButtonClick = async (title) => {
    try {
      setButtonLoading(true);
      const response = await axios.post(
        "https://admin-backend-2api-2imn7pfmma-uc.a.run.app/chain",
        JSON.stringify({ query: title }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      const responseMessage = {
        content: responseData.response,
        isPersonal: false,
        timestamp: new Date().getTime(),
      };

      setMessages((prevMessages) => [...prevMessages, responseMessage]);
      setLatestResponse(responseData.response); // Ensure the latest response is updated here.
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <main className="scrollbar-thin scrollbar-thumb-black-500 scrollbar-track-gray-200  scrollbar-thumb-hover-blue-600 ">
      <div className="  ">
        <div className="chat   ">
          <div className="chat-title">
            <h1 className="font-bold ">AI Smart Employee</h1>
            <h2>AIOS</h2>
            <figure className={`avatar`}>
              <img
                src="https://img.freepik.com/free-vector/artificial-intelligence-ai-robot-server-room-digital-technology-banner-computer-equipment_39422-768.jpg?w=1060&t=st=1693327593~exp=1693328193~hmac=8e70f8280d384d5e42605c5c89aaa9210dd9686272f222838cb2bb73fc5a7410"
                alt="Avatar"
              />
            </figure>
          </div>
          <div className="messages">
            <div className="messages-content" ref={messagesScrollRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message  ${
                    message.isPersonal ? "message-personal" : "message-bot"
                  }`}
                >
                  <div className={message.isPersonal ? "hidden " : "avatar "}>
                    <img
                      src="https://img.freepik.com/free-vector/artificial-intelligence-ai-robot-server-room-digital-technology-banner-computer-equipment_39422-768.jpg?w=1060&t=st=1693327593~exp=1693328193~hmac=8e70f8280d384d5e42605c5c89aaa9210dd9686272f222838cb2bb73fc5a7410"
                      alt="Avatar"
                    />
                  </div>
                  <div className="message-content">
                    {String(message.content)}
                  </div>
                  <div className="timestamp">
                    {new Date(message.timestamp).getHours()}:
                    {new Date(message.timestamp).getMinutes()}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message message-loading  ">
                  <div className="avatar">
                    <img
                      src="https://img.freepik.com/free-vector/artificial-intelligence-ai-robot-server-room-digital-technology-banner-computer-equipment_39422-768.jpg?w=1060&t=st=1693327593~exp=1693328193~hmac=8e70f8280d384d5e42605c5c89aaa9210dd9686272f222838cb2bb73fc5a7410"
                      alt="Avatar"
                    />
                  </div>
                  <div className="message-loading">
                    <Loading />
                  </div>
                </div>
              )}
              {buttonLoading && (
                <div className="message message-loading">
                  <div className="avatar">
                    <img
                      src="https://img.freepik.com/free-vector/artificial-intelligence-ai-robot-server-room-digital-technology-banner-computer-equipment_39422-768.jpg?w=1060&t=st=1693327593~exp=1693328193~hmac=8e70f8280d384d5e42605c5c89aaa9210dd9686272f222838cb2bb73fc5a7410"
                      alt="Avatar"
                    />
                  </div>
                  <div className="message-loading">
                    <Loading />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="message-box">
            <textarea
              type="text"
              className="message-input"
              placeholder="Type message..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              type="submit"
              containerStyles="message-submit"
              handleClick={handleSubmit}
              title="send"
            />
          </div>
        </div>
        <div className="messages-buttons ">
          <div className="buttons absolute left-[75%] -translate-x-1/2 top-[50%] -translate-y-1/2">
            <div className="individualEdit">
              <ExpandCard className="expand__card" summary={summary} />
              <Button
                title="Contact Info"
                textStyles="button-text "
                containerStyles="button button-name cssbuttons-io"
                handleClick={() => handleButtonClick("Get contact info")}
              />
              <Button
                title="Feedback"
                textStyles="button-text"
                containerStyles="button button-name cssbuttons-io	"
                handleClick={() => handleButtonClick("feedback")}
              />

              <Button
                className="appointment"
                title="Book an Appointment"
                textStyles="button-text"
                containerStyles="button button-name	cssbuttons-io"
                handleClick={() => handleButtonClick("Book an appointment")}
              />
              <Button
                className="products"
                title="Products and Services"
                textStyles="button-text"
                containerStyles="button button-name cssbuttons-io "
                handleClick={() => handleButtonClick("Products and Services")}
              />
              <Button
                className="cfeatures"
                title="Core Employee Features"
                textStyles="button-text"
                containerStyles="button button-name cssbuttons-io"
                handleClick={() => handleButtonClick("Core Employee Features")}
              />
              <Button
                className="nfeatures"
                title="Niche Employee Features"
                textStyles="button-text"
                containerStyles="button button-name cssbuttons-io"
                handleClick={() => handleButtonClick("Niche Employee features")}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chat;
