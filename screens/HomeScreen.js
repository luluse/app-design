import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar, Platform } from 'react-native';
import styled from 'styled-components';
import Card from '../components/Card';
import Course from '../components/Course';
import Logo from '../components/Logo';
import Menu from '../components/Menu';
import { connect } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ModalLogin from '../components/ModalLogin';
import Avatar from '../components/Avatar';
import NotificationButton from '../components/NotificationButton';
import Notifications from '../components/Notifications';


const CardsQuery = gql`
      {
        cardsCollection {
          items {
            title
            subtitle
            image {
              title
              description
              contentType
              fileName
              size
              url
              width
              height
            }
            subtitle
            caption
            logo {
              title
              description
              contentType
              fileName
              size
              url
              width
              height
            }
            content
          }
        }
      }
    `;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: 'OPEN_MENU'
      }),
    openLogin: () =>
      dispatch({
        type: 'OPEN_LOGIN'
      }),
    openNotif: () =>
      dispatch({
        type: 'OPEN_NOTIF'
      })
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);

    if (Platform.OS === 'android') StatusBar.setBarStyle('light-content', true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action === 'openMenu') {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle('light-content', true);
    }

    if (this.props.action == 'closeMenu') {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle('dark-content', true);
    }
  };

  handleAvatar = () => {
    if (this.props.name !== 'Stranger') {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  };

  render() {

    return (
      <RootView>
        <Menu />
        <Notifications />
        <AnimatedContainer style={{ transform: [{ scale: this.state.scale }], opacity: this.state.opacity }}>
          <SafeAreaView>
            <ScrollView style={{ height: '100%' }}>
              <TitleBar>
                <TouchableOpacity onPress={this.handleAvatar} style={{ position: 'absolute', left: 20 }}>
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome to Genuine Drink</Title>
                <Name>{this.props.name}</Name>
                <TouchableOpacity
                  onPress={() => this.props.openNotif()}
                  style={{ position: 'absolute', right: 20, top: 5 }}
                >
                  <NotificationButton />
                </TouchableOpacity>

              </TitleBar>
              <ScrollView style={{ flexDirection: 'row', padding: 20, paddingLeft: 12, paddingTop: 30 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}

              </ScrollView>
              <Subtitle>{'trending'.toUpperCase()}</Subtitle>
              <ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;

                    {/* console.log(data.cardsCollection.items); */}

                    return (
                      <CardsContainer>
                        {data.cardsCollection.items.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push('Section', {
                                section: card
                              });
                            }}>
                            <Card
                              key={index}
                              title={card.title}
                              image={{ uri: card.image.url }}
                              caption={card.caption}
                              logo={{ uri: card.logo.url }}
                              subtitle={card.subtitle}
                              content={card.content}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>

              </ScrollView>
              <Subtitle>{'Events'.toUpperCase()}</Subtitle>
              <CoursesContainer>
                {courses.map((course, index) => (
                  <Course key={index}
                    title={course.title}
                    subtitle={course.subtitle}
                    image={course.image}
                    logo={course.logo}
                    author={course.author}
                    avatar={course.avatar}
                    caption={course.caption} />
                ))}
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
color: grey;
font-weight:600;
font-size: 15px;
margin-left: 20px;
margin-top: 20px;
text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);


const Title = styled.Text`
font-size: 20px;
color: #0b5394;
font-weight: 600;
`;


const Name = styled.Text`
font-size: 16px;
color: #3c4560;
`;

const TitleBar = styled.View`
width:100%;
margin-top: 50px;
padding-left: 80px; 
`;

const Message = styled.Text`
margin: 20px;
color: #b8bece;
font-size: 15px;
font-weight: 500;
`;

const CardsContainer = styled.View`
flex-direction: row;
padding-left: 10px;

`;

const CoursesContainer = styled.View`
flex-direction: row;
flex-wrap: wrap;
padding-left: 10px;
`;


const logos = [
  {
    image: require('../assets/vino.png'),
    text: 'Wine'
  },
  {
    image: require('../assets/beer.png'),
    text: 'Beer'
  },
  {
    image: require('../assets/liquor.png'),
    text: 'Liquor'
  },
  {
    image: require('../assets/cocktail.png'),
    text: 'Cocktail'
  },
  {
    image: require('../assets/soda.png'),
    text: 'Soft Drink'
  },
  {
    image: require('../assets/glassware.png'),
    text: 'Glassware'
  },
];

const cards = [
  {
    title: 'React Native for vino',
    image: require('../assets/background11.jpg'),
    subtitle: 'React Native',
    caption: '1 of 12 sections',
    logo: require('../assets/logo-react.png')
  },
  {
    title: 'Styled Components',
    image: require('../assets/background12.jpg'),
    subtitle: 'React Native',
    caption: '2 of 12 sections',
    logo: require('../assets/logo-react.png')
  },
  {
    title: 'Props and Icons',
    image: require('../assets/background13.jpg'),
    subtitle: 'React Native',
    caption: '3 of 12 sections',
    logo: require('../assets/logo-react.png')
  },
  {
    title: 'Static Data and Loop',
    image: require('../assets/background14.jpg'),
    subtitle: 'React Native',
    caption: '4 of 12 sections',
    logo: require('../assets/logo-react.png')
  }
];

const courses = [
  {
    title: 'Live webinar - History of Cognac',
    subtitle: 'feb 20',
    image: require('../assets/hennessy.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'Hennessy',
    avatar: require('../assets/liquor.png'),
    caption: 'Learn about production process, grades, region and more'
  },
  {
    title: 'Perrin Wine Tasting',
    subtitle: 'mar 1',
    image: require('../assets/background-4.jpg'),
    logo: require('../assets/logo-react.png'),
    author: 'Famille Perrin',
    avatar: require('../assets/vino.png'),
    caption: 'Flight of different wines to explore The Cote du Rhone Terroir'
  },
  {
    title: 'Mixology Class',
    subtitle: 'mar 9',
    image: require('../assets/background-6.jpg'),
    logo: require('../assets/logo-framerx.png'),
    author: 'Bar Georges V',
    avatar: require('../assets/cocktail.png'),
    caption: 'Become a mixologist and create your very own cocktail'
  }
]