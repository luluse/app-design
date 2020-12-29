import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import Success from './Success';
import Loading from './Loading';

class ModalLogin extends React.Component {

  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
    isSuccessful: false,
    isLoading: false
  };

  handleLogin = () => {
    console.log(this.state.email, this.state.password);

    // Start loading
    this.setState({ isLoading: true });

    // Simulate API Call
    setTimeout(() => {
      // Stop loading and show success
      this.setState({ isLoading: false });
      this.setState({ isSuccessful: true });
      
      Alert.alert("Congrats", "You've logged in successfuly!");
    }, 2000);
  };

  focusEmail = () => {
    this.setState({
      iconEmail: require("../assets/icon-email-animated.gif"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  focusPassword = () => {
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password-animated.gif")
    });
  };

  tapBackground = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <Container>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={100}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
        <Modal>
          <Logo source={require("../assets/logo-dc.png")} />
          <Text>Log in to access content</Text>
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            keyboardType="email-address"
            value={this.state.email}
            onFocus={this.focusEmail} />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onFocus={this.focusPassword} />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.iconPassword} />
          <TouchableOpacity onPress={this.handleLogin}>
            <ButtonView>
              <ButtonText>Log in</ButtonText>
            </ButtonView>
          </TouchableOpacity>
        </Modal>
        {/* <Success isActive={this.state.isSuccessful} /> */}
        {/* <Loading isActive={this.state.isLoading} /> */}
      </Container>
    );
  }
}

export default ModalLogin;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const Modal = styled.View`
  width: 335px;
  height: 370px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  color: #b8bece;
  text-align: center;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
  margin-top: 20px;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;

const ButtonView = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;