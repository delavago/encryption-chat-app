import React, { CSSProperties, FC } from 'react';
import styled from 'styled-components';

interface TextInputInterface {
    containerStyle?: CSSProperties;
}

let TextInput: FC<TextInputInterface> = (props) => {
    return (
        <Container style={{...props.containerStyle}}>
            <Input
                placeholder="Username"
            />
        </Container>
    )
}

let Container = styled.div`
    padding: 5px;
    border-radius: 8px;
    border-color: #7A7D7D;
    border-width: 1px;
    border-style: solid;
`;

let Input = styled.input`
    outline: none;
    border-style: none;
`;

export default TextInput;