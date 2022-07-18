import React, { FC } from 'react';
import styled from 'styled-components';

interface ButtonInterface {
    label: string;
    onClick: Function;
}

let Button: FC<ButtonInterface> = (props) => {
    return (
        <Btn onClick={()=>props.onClick()}>
            {props.label}
        </Btn>
    )
}

let Btn = styled.button`
    height: 34px;
    width: 100%;
    border-radius: 8px;
    border-style: none;
    background-color: #539D8B;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
`;

export default Button;