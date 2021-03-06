import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, StatusBar, Linking, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-showdown';

class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    const { navigation } = this.props
    const section = navigation.getParam('section');

    return (
      <ScrollView>
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={{ uri: section.image.url }} />

          <Wrapper>
            <Logo source={{ uri: section.logo.url }} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>

          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            position: 'absolute',
            top: 20,
            right: 20
          }}
        >
          <CloseView>
            <Ionicons
              name='ios-close'
              size={36}
              style={{ marginTop: -2 }}
              color='#4775f2'
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
        
          {/* <WebView
            source={{ html: section.content + htmlStyles }} scalesPageToFit={false}
            scrollEnabled={false}
            ref='webview'
            onNavigationStateChange={event => {
              console.log(event);

              if (event.url != 'about:blank') {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }} /> */}
          <Markdown
            body={section.content}
            pureCSS={htmlStyles}
            scalesPageToFit={false}
            scrollEnabled={false}
          />
        </Content>
      </Container>
      </ScrollView>
    );
  }
}

export default SectionScreen;

const htmlContent = `
      <h2>This is a title</h2>
      <p>This <strong>is</strong> a <a href=''>link</a></p>
      <img src='' />
    `;

const htmlStyles = `
<style>
      * {
        font-family: -apple-system, Roboto; 
    		margin: 0;
    		padding: 10px;
        font-size: 50px; 
        font-weight: normal; 
        color: #3c4560;
        line-height: 24px;
      }

      img {
        width: 100%;
        border-radius: 10px;
        margin-top: 20px;

      }
    
      h2 {
        font-size: 30px;
        text-transform: uppercase;
        color: #b8bece;
        font-weight: 600;
        margin-top: 20px;
      }

      p {
        margin-top: 10px;
      }
    
      a {
        color: #4775f2;
        font-weight: 600;
        text-decoration: none;
      }
    
      strong {
        font-weight: 700;
      }
    </style>
`

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background: #3c4560;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  max-width: 350px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const Content = styled.View`
height: 1400px;
/* padding: 15px; */
`;