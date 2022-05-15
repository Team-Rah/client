import Card from '@mui/material/Card';
import {useState} from 'react'
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import React, {useContext} from 'react'
import Image from 'next/Image';
import deadIcon from '../public/killed.png';
import styled from "styled-components";
import { shadows } from "@mui/system";
import { useRecoilState } from 'recoil';
import {useRouter} from 'next/router'
import { userState } from '../_states/tokenState';
import { SocketContext } from '../socket/socket';


export default function PlayerCard(props) {
  const player = props.player
  const username = player.player.userName
  const alive = player.status
  const [revealed, setRevealed] = useState(false)
  const phase = props.phase
  const role = props.role
  const socket = useContext(SocketContext);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const voted = props.voted
  const markAsVoted = props.markAsVoted
  const { gameId, playerId } = router.query;
  const vote = () => {
    markAsVoted()
    let user1 = {user_id: user.userId, userName: user.userName}
    socket.emit('player-vote', user1, player, gameId)
  }
  const seerVote = () => {
    vote()
    setRevealed(true)
    //reveal role to user
  }
  const renderActionButton = () => {
    if (!voted) {
      if (phase === 'night') {
      if (role === 'villager') {
        return
      } else if (role === 'doctor') {
        return <Button onClick={() => vote()}>SAVE</Button>
      } else if (role === 'wolf') {
        return <Button onClick={() => vote()}>SACRIFICE</Button>
      } else if (role === 'seer') {
        return <Button onClick={() => seerVote()}>REVEAL</Button>
      }
    } else if (phase === 'day2' || phase === 'day3') {
      return <Button onClick={() => vote()}>ACCUSE</Button>
    }
  } else {
    return <h4>voted</h4>
  }

  }
  return (
    <Card key={'pc' + username} className={`playerCard alive-${alive}`} id="player-card" sx={{ boxShadow: 3}}>
      <UserDiv>
        <img className="userAvatar" src={`${player.img}`} alt=""/>
        <UsernameSpan key={'pc' + username}>{username}</UsernameSpan>
      </UserDiv>

      <IconDiv>
        {alive? null : <StyledDiv><Image alt='' height="55" width="55" src={deadIcon}/> <br/> <span>{`${username} was taken by Anubis`} </span></StyledDiv>}
      </IconDiv>
      {revealed ? <h4>{role}</h4>: null}
      <ButtonDiv>
        {!voted && alive ? renderActionButton() : null}
      </ButtonDiv>

    </Card>
  )
}

const Button = styled.button`
  border: none;
  background-color: #9a824991;
  cursor: pointer;
  height: 30px;
  border-radius: 9px;
  padding: 5px;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-family: 'Josefin Slab';
  font-weight: 700;
  font-size: 1.1em;
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  height: 55px;
  font-size: 0.9em;
`;

const IconDiv = styled.div`
  height: fit-content;
  text-align: center;
  font-family: 'Josefin Slab';
  font-weight: 700;
  font-size: 1.1em;
`;

const ButtonDiv = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const UsernameSpan = styled.div`
  margin: 5px;
  font-family: 'Josefin Slab';
  font-weight: 700;
  font-size: 1.1em;
`;

const StyledDiv = styled.div`
  position: relative;
  bottom: -40px;
  height: 150px;
  width: 150px;
  font-size: 0.85em;
`;