import React from 'react'
import styled from 'styled-components';

const Card = props => (
<Container style= {{ elevation: 10}}>
  <Cover>
    <Image source={props.image} />
    <Title>{ props.title}</Title>
  </Cover>
  <Content>
    <Logo source={props.logo}/>
    <Wrapper>
    <Caption>{props.caption}</Caption>
    <Subtitle>{props.subtitle.toUpperCase()}</Subtitle>
    </Wrapper>
  </Content>
</Container>
)

export default Card;

const Content = styled.View`
padding-left: 20px;
flex-direction:row;
align-items: center;
height: 80px;
`;

const Logo = styled.Image`
width: 30px;
height: 30px;
`;

const Caption = styled.Text`
color: #3c4560;
font-size: 17px;
font-weight: 600;
width: 250px;
`;

const Subtitle = styled.Text`
color:#b8bece;
font-size: 15px;
font-weight: 600;
text-transform: uppercase;
margin-top: 4px;
`;

const Wrapper = styled.View`
 margin-left: 10px;
`;

const Container = styled.View`
background: white;
width: 315px;
height:280px;
border-radius:14px;
margin: 20px 10px;
box-shadow: 0 5px 15px rgba(0,0,0,0.15);
`;

const Cover = styled.View`
width: 100%;
height: 200px;
border-top-left-radius: 14px;
border-top-right-radius: 14px;
overflow: hidden;
`;

const Image = styled.Image`
width: 100%;
height: 100%;
position:absolute;
top: 0;
left: 0;
`;

const Title = styled.Text`
color:white;
font-size:24px;
font-weight: bold;
margin-top: 20px;
margin-left: 20px;
width: 270px;
`;