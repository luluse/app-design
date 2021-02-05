import React from 'react';
import styled from 'styled-components';
import Project from '../components/Pairings';
import { PanResponder, Animated } from 'react-native';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0)
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (this.props.action == 'openCard') {
            return false;
          } else {
            return true;
          }
        }
      },

      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();

        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();

        Animated.timing(this.state.opacity, { toValue: 1 }).start();
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        console.log(positionY);

        Animated.timing(this.state.opacity, { toValue: 0 }).start();

        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 1000 }
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({ index: getNextIndex(this.state.index) });
          });
        } else {
          Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();

          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();

          Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
        }

      }
    });
  }


  render() {
    return (
      <Container>
        <AnimatedMask style={{ opacity: this.state.opacity }} />
        <Animated.View style={{
          transform: [
            { translateX: this.state.pan.x },
            { translateY: this.state.pan.y }
          ]
        }}
          {...this._panResponder.panHandlers}>
          <Project
            title={projects[this.state.index].title}
            image={projects[this.state.index].image}
            author={projects[this.state.index].author}
            text={projects[this.state.index].text}
            canOpen={true}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}>
          <Project
            title={projects[getNextIndex(this.state.index)].title}
            image={projects[getNextIndex(this.state.index)].image}
            author={projects[getNextIndex(this.state.index)].author}
            text={projects[getNextIndex(this.state.index)].text}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -3,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ scale: this.state.thirdScale }, { translateY: this.state.thirdTranslateY }]
          }}
        >
          <Project
            title={projects[getNextIndex(this.state.index + 1)].title}
            image={projects[getNextIndex(this.state.index + 1)].image}
            author={projects[getNextIndex(this.state.index + 1)].author}
            text={projects[getNextIndex(this.state.index + 1)].text}
          />
        </Animated.View>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ProjectsScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Text = styled.Text``;

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const projects = [
  {
    title: '5 Favorite Sparkling Wine Pairing Recipes',
    image: require('../assets/champagne.jpg'),
    author: 'Wine Spectator',
    text:
      'From light bites to dessert, these bubbly matches are ideal for Valentine\'s Day or other celebrations. Many celebratory occasions have traditional foods tied to them, and Valentine’s Day is no exception. You’ve got to have chocolate. But what to eat before the chocolate? My feeling is that lighter foods are good so that you save room for dessert and stay limber. And not only is sparkling wine a great food accompaniment, it’s also so buoyant and happy-making and convivial that it suits the day. Below are five dishes—canapés, starters and small plates—paired with various bubbly styles to keep your Valentine’s evening light so you can concentrate on the main event. No, no, I mean the chocolate. Serving Champagne and canapés together is a classic move to start a special meal. A few years back, New York Scandinavian restaurant Aquavit created an all-canapé menu for us to show off the range of styles in these sparkling wines and their respective, and somewhat elevated, food matches.'
  },
  {
    title: 'Compliment the Hop Flavors - Guide to IPA Food Pairing',
    image: require('../assets/ipa3.jpg'),
    author: 'Hop Culture',
    text:
      'One of the most fundamental principles of beer and food pairing is matching “intensity.” In short, the food can\’t be more powerful than the beer and vice versa. If you don’t nail this then nothing else in this guide matters. That being said, you’ll generally find the most success with session- and regular-strength IPAs. I find that double, triple, and quadruple IPAs have far too much flavor (whether that be bitterness, juiciness, sweetness, etc.) and ABV to play nicely with most dishes. They tend to completely dominate, and are best enjoyed outside the context of intentional pairing.'
  },
  {
    title: 'Gold, Silver, Reposado & Anejo: Tequila and Food pairings',
    image: require('../assets/tequila.jpg'),
    author: 'Sip Tequila',
    text:
      'Tequila is a versatile spirit that can be paired with a wide variety of foods. For our sipping tequilas, here are some recommendations. Desserts: The sweetness in barrel-aged spirits is a perfect partner to after-dinner treat. Some ideas are: Top-quality dark chocolate, milk chocolate or salted caramel with a side of Extra añejo. We love Edward Marc for all of the above and their toffee covered almonds too! Apple pie, chocolate desserts (including churros), crème brûlée, vanilla, coffee, or chocolate ice cream, poached pears, warm berry dishes and banana-based desserts also work very well with the balanced smoothness and viscosity of an aged tequila'
  }
];