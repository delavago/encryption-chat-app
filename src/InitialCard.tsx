import React from 'react';
import styled from 'styled-components';
import Button from './components/Button';
import TextInput from './components/TextInput';

let InitialCard = () => {
    return (
        <CardContainer>
            <CardSection style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Logo src={"/logo/Chatapp-logos.jpeg"} />
            </CardSection>
            <CardSection>
                <Text style={{ fontSize: 32, fontWeight: 400, marginBottom: 40, textAlign: 'center' }}>Welcome!</Text>
                <Text style={{ fontSize: 18, fontWeight: 400, color: '#202221' }}>Enter a Username:</Text>
                <TextInput
                    containerStyle={{marginBottom: 15}}
                />
                <Button>Enter</Button>
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