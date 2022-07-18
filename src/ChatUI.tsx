import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './components/Button';
import TextInput from './components/TextInput';
import { FiSend } from "react-icons/fi";
import signalR from "@microsoft/signalr"
import { MessageObj, PublicKeyBroadcastResponse } from './types';
import ApiService from './api';
import { generateKeyFiles, retrievePublicKey } from './ecryptionUtil';

let ChatUI = () => {

    let [messages, setMessage] = useState<Array<MessageObj>>([])
    let [tokenId, setTokenId] = useState<string | null>("");
    let [messageToSend, setMessageToSend] = useState<string>("")
    let [recieversPublicKey, setRecieverPublicKey] = useState<string>("")

    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`wss://e2e.azurewebsites.net/e2echat?apiKey=${sessionStorage.getItem("token")}`)
        .configureLogging(signalR.LogLevel.Information)
        .build();

    async function start() {
        try {
            await connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.log(err);
            setTimeout(start, 5000);
        }
    };

    let AliceInfo = {
        "Token": "49079d99303a4377acccb86bef71b3b1",
        "FirstName": "Alice",
        "LastName": "Green",
        "Avatar": ""
    }

    let BobInfo = {
        "Token": "6e1d4af5b9f34853b85eeeed3c24d309",
        "FirstName": "Bob",
        "LastName": "Brown",
        "Avatar": ""
    }

    useEffect(()=> {
        generateKeyFiles()
        triggerSendPublicKey(
            sessionStorage.getItem("token")===BobInfo.Token ? BobInfo.Token : AliceInfo.Token
        )
    },[])

    useEffect(()=> {

        setTokenId(sessionStorage.getItem("token"))

        connection.onclose(async () => {
            await start();
        });
    
        // Start the connection.
        start();

        connection.on("MessageReceived", (message: MessageObj) => {
            setMessage([...messages, message]);
        });

        connection.on("KeyReceived", (response: PublicKeyBroadcastResponse) => {
            setRecieverPublicKey(response.PublicKey)
        });
    },[])

    let triggerSendPublicKey = (recieversPublicKey: string) => {
        let apiservice = new ApiService();
        apiservice.sendPublicKey({RecieverstokenId: recieversPublicKey, publicKey: retrievePublicKey()})
        .then((response: PublicKeyBroadcastResponse)=> {
            //
        })
    }

    let triggerSendMessage = () => {
        let apiservice = new ApiService();
        apiservice.sendMessage({Message: messageToSend, Sender: tokenId}, tokenId)
        .then((response: MessageObj)=> {
            setMessage([...messages, response]);
        });
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>User Name</HeaderTitle>
            </Header>

            <ChatContainer>
                {messages.map(item => {
                    // console.log(value)
                    return (
                        <div style={{ display: 'flex', justifyContent: item.From.id === tokenId ? 'flex-end' : 'flex-start' }}>
                            <TextBubble style={{
                                backgroundColor: item.From.id === tokenId  ? '#3bc14a' : '#98da9f'
                            }}>
                                <TextBubbleText style={{ fontSize: 16, fontWeight: 500 }}>UserName</TextBubbleText>
                                <TextBubbleText>{item.Message}</TextBubbleText>
                            </TextBubble>
                        </div>
                    )
                })}
            </ChatContainer>

            <TextBoxContainer>
                <TextInput
                    placeholder="Type your message here"
                    containerStyle={{ width: "100%", marginRight: 20 }}
                    onChange={(val:string) => setMessageToSend(val)}
                />
                <FiSend size={28} color="#3bc14a" onClick={()=> {
                    triggerSendMessage()
                    setMessageToSend("");
                }}/>
            </TextBoxContainer>
        </Container>
    )
}

let Container = styled.div`
    max-width: 400px;
    min-width: 400px;
    height: 700px;
    width: 100%;
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.54); 
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.54);
    border-radius: 8px;
    display: grid;
    grid-template-rows: 60px 1fr 60px;
`;

let Header = styled.div`
    height: 60px;
    /* width: 100%; */
    background-color: #f7f7f7;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 15px;
    moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;

let ChatContainer = styled.div`
    padding: 15px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`;

let TextBoxContainer = styled.div`
    height: 60px;
    /* width: 100%; */
    background-color: #f7f7f7;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 15px;
    moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

let HeaderTitle = styled.h4`
    padding: 0;
    margin: 0;
`;

let TextBubble = styled.div`
    padding: 5px;
    border-radius: 8px;
    margin-bottom: 15px;
    width: fit-content;
`;

let TextBubbleText = styled.p`
    /* font-size: 18px;
    font-weight: 400; */
`;

export default ChatUI;