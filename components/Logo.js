import React from 'react'
import styled from 'styled-components';

const Logo = props => (
  <Container>
    <Image source={props.image} resizeMode='contain'/>
    <Text>{props.text}</Text>
  </Container>
)

export default Logo


const Container = styled.View`
flex-direction: row;
background: white;
height: 60px;
padding: 12px 16px;
border-radius: 10px;
box-shadow: 0 5px 10px rgba(0,0,0,0.05);
align-items: center;
margin: 0 8px;
`;

const Image = styled.Image`
width: 36px;
height: 36px;
/* position:absolute;
top: 0;
left: 0; */
`;

const Text = styled.Text`
font-size:17px;
font-weight: 600;
margin-left: 8px;

`;