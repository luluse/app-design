import React from "react";
import styled from "styled-components";
import Project from "../components/Projects";
import { PanResponder, Animated } from "react-native";

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    pan: new Animated.ValueXY()
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
      }
      // onPanResponderGrant: (e, gestureState) => {
      //   // We'll take care of this later.
      //   },
    });
  }


  render() {
    return (
      <Container>
        <Animated.View style={{
          transform: [
            { translateX: this.state.pan.x },
            { translateY: this.state.pan.y }
          ]
        }}
          {...this._panResponder.panHandlers}>
          <Project title="Design project"
            image={require("../assets/background5.jpg")}
            author="Lulu"
            text="Thanks to Design+Code, I improved my design skill and learned to do animations" />
        </Animated.View>
      </Container>
    );
  }
}

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Text = styled.Text``;