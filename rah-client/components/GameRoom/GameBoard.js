import Container from '@mui/material/Container';
import styled from 'styled-components';
import Image from 'next/Image';
import {useEffect} from 'react'
import BoardImg from '../../public/gameboard.jpg';
import Card from '@mui/material/Card';

import Game from '../../pages/_sampleData/sampleGame.js'
import {MapEmAcross, MapEmCircle, oneInMiddle} from './HelperFuncs.js';
//import { useRecoilState } from 'recoil';

const sprite = {height: '60px', width: '30px'}
export default function GameBoard(props) {
  const players = props.game.players
  const game = props.game
  useEffect(() => {
    console.log(game, players)
  })
  const renderItems = (game) => {
    var phase = game.phase || 'night'
    var Arr;
    if (phase === 'day2') {
      Arr = MapEmAcross(players, 60, 30, 390, 736)
    } else if (phase === 'day3') {
      Arr = oneInMiddle(players, 60, 30, 390, 736, '627d86726902e534664e1b02')
    } else {
      Arr = MapEmCircle(players, 60, 30, 390, 736)
    }
    return Object.values(Arr).map((locale) => {
      return <Person left={locale.left} top={locale.top}></Person>
    } )
  }
  const handleClick = () => {

  }

  return (
    <OuterContainer maxWidth={false} disableGutters={true}>
      <Banner>
        {props.announcement ? (
          <Announcement behavior='scroll' direction='left'>
            {props.announcement}
          </Announcement>
        ) : null}
      </Banner>

      <ImgContainer maxWidth={false} disableGutters={true}>
        <Img src={BoardImg} alt='' id='bgimg' height="450" width="850"/>
        {props.game ? renderItems(game) : null}
      </ImgContainer>

    </OuterContainer>
  );
}

const Person = styled.span`
  position: absolute;
  border: 15px solid red;

  width: ${sprite.width};
  height: ${sprite.height};

  border-radius: 15px;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
`;

const OuterContainer = styled(Container)`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  background-color: #f1f7ed;
  border-radius: 5px;
  height: 400px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  padding: 10px;
  height: 70%;
  margin-top: 10px;
  text-align: center;
  min-width: 750px;
  margin-bottom: 0;
`;

const ImgContainer = styled(Container)`
  position: relative;
  border-radius: 5px;
  margin-left: 0;
`;

const Banner = styled.div`
  width: 100%;
  height: 35px;
`;

const Img = styled(Image)`
  border-radius: 5px;
  height: 80%;
`;

const Announcement = styled.marquee`
  font-size: 1.2em;
  line-height: 1.6em;
  font-family: monospace;
  font-weight: 700;
  color: #9a8249;
`;
