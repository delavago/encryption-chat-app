import React, { FC } from 'react';
import styled from 'styled-components';

let Button: FC<any> = (props) => {
    return (
        <Btn>
            {props.children}
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