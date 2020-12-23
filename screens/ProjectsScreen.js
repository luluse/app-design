import React from "react";
import styled from "styled-components";
import Project from "../components/Projects";
import { PanResponder, Animated } from "react-native";

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44)
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        console.log(positionY);

        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 1000 }
          }).start();
        } else {
          Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();
        }

      }
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
          <Project
            title={projects[0].title}
            image={projects[0].image}
            author={projects[0].author}
            text={projects[0].text}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}>
          <Project
            title={projects[1].title}
            image={projects[1].image}
            author={projects[1].author}
            text={projects[1].text}
          />
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

const projects = [
  {
    title: "Design project",
    image: require("../assets/background5.jpg"),
    author: "Lulu",
    text:
      "Thanks to Design+Code, I improved my design skill and learned to do animations for my app"
  },
  {
    title: "The CLI",
    image: require("../assets/background6.jpg"),
    author: "The Async and Awaits",
    text:
      "Dating app on the terminal using socket.io"
  },
  {
    title: "What's Cookin",
    image: require("../assets/background7.jpg"),
    author: "Hot Bots",
    text:
      "A social platform to inspire and get insired by other foodies in your netork."
  }
];