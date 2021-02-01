import React from 'react';
import styled from 'styled-components';
import Course from '../components/Course';

const Courses = () => (
  <Container>
    {courses.map((course, index) => (
      <Course
        key={index}
        image={course.image}
        title={course.title}
        subtitle={course.subtitle}
        logo={course.logo}
        author={course.author}
        avatar={course.avatar}
        caption={course.caption}
      />
    ))}
  </Container>
);

export default Courses;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const courses = [
  {
    title: 'Guinness to Release a Stout Aged in Bulleit Bourbon Barrels',
    subtitle: '4 min reading',
    image: require('../assets/guinness.jpg'),
    logo: require('../assets/beer.png'),
    author: 'Food & Wine',
    avatar: require('../assets/beer.png'),
    caption: 'The beer was brewed in Ireland but aged in America.'
  },
  {
    title: 'Plan a food and wine tour of Emilia Romagna and Lombardy',
    subtitle: '8 min reading',
    image: require('../assets/background-2.jpg'),
    logo: require('../assets/logo-react.png'),
    author: 'Decanter',
    avatar: require('../assets/vino.png'),
    caption: 'Let Lambrusco be your guide through the gastronomic heartland of Italy.'
  },
  {
    title: 'Sommelier Roundtable: Beverages That Deserve a Breakout Year',
    subtitle: '6 min reading',
    image: require('../assets/beverage.jpg'),
    logo: require('../assets/cocktail.png'),
    author: 'Wine Spectator',
    avatar: require('../assets/cocktail.png'),
    caption: 'The future of beverages goes beyond wine.'
  },
  {
    title: 'To Malo Or Not To Malo?',
    subtitle: '12 min reading',
    image: require('../assets/vat.jpg'),
    logo: require('../assets/logo-figma.png'),
    author: 'WineMaker Magazine',
    avatar: require('../assets/barrel.png'),
    caption:
      'There is no “one size fits all” approach to the decision of using MLF.'
  }
];