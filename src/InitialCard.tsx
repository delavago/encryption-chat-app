import React, { useState } from 'react';
import styled from 'styled-components';
import ApiService from './api';
import Button from './components/Button';
import TextInput from './components/TextInput';
import { User } from './types';

let InitialCard = (props: {changeComponent: Function}) => {

    let [fName, setFName] = useState<string>("");
    let [lName, setLName] = useState<string>("");
    let [email, setEmail] = useState<string>("");
    let [password, setPassword] = useState<string>("");

    let triggerLogin = () => {
        let apiservice = new ApiService();

        apiservice.loginRequest({Email: email, Password: password})
        .then((response: User)=> {
            sessionStorage.setItem("token", response.Token);
            sessionStorage.setItem("firstName", response.FirstName);
            sessionStorage.setItem("lastName", response.LastName);
            props.changeComponent()
        });
    }

    return (
        <CardContainer>
            <CardSection style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Logo src={"/logo/Chatapp-logos.jpeg"} />
            </CardSection>
            <CardSection>
                <Text style={{ fontSize: 32, fontWeight: 400, marginBottom: 40, textAlign: 'center' }}>Welcome!</Text>
                {/* <TextInput
                    containerStyle={{marginBottom: 15}}
                    placeholder="First Name"
                    onChange={(val: string)=>setFName(val)}
                />
                <TextInput
                    containerStyle={{marginBottom: 15}}
                    placeholder="Last Name"
                    onChange={(val: string)=>setLName(val)}
                /> */}
                <TextInput
                    containerStyle={{marginBottom: 15}}
                    placeholder="Email"
                    onChange={(val: string)=>setEmail(val)}
                />
                <TextInput
                    containerStyle={{marginBottom: 15}}
                    placeholder="Password"
                    onChange={(val: string)=>setPassword(val)}
                />
                <Button
                    label="Enter"
                    onClick={()=> triggerLogin()}
                />
            </CardSection>
        </CardContainer>
    )
}

let CardContainer = styled.div`
    max-width: 400px;
    min-width: 400px;
    height: 700px;
    width: 100%;
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.54); 
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.54);
    border-radius: 8px;
    display: grid;
    grid-template-rows: 1fr 1fr;
`;

let CardSection = styled.div`
    padding: 15px;
`;

let Logo = styled.img`
    width: 200px;
    border-radius: 8px;
    
`;

let Text = styled.p`
    color: '#020402';
    margin-bottom: 15px;
`;

export default InitialCard