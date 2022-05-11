import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import React from 'react'
import Image from 'next/Image';
import deadIcon from '../public/killed.png';
import styled from "styled-components";
import { shadows } from "@mui/system";

export default function PlayerCard(props) {
  const player = props.player
  const username = player.player.userName
  const alive = player.status
  const phase = props.phase
  const role = props.role

  const renderActionButton = () => {

    if (phase === 'night') {
      if (role === 'villager') {
        return
      } else if (role === 'doctor') {
        return <Button>Save</Button>
      } else if (role === 'wolf') {
        return <Button>Kill</Button>
      } else if (role === 'seer') {
        return <Button>Check if Wolf</Button>
      }
    } else if (phase === 'day2' || phase === 'day3') {
      return <Button>Accuse</Button>
    }
  }
  return (
    <Card key={'pc' + username} className={`playerCard alive-${alive}`} sx={{ boxShadow: 3}}>
      <UserDiv>
        <img className="userAvatar" src={`${player.img}`} alt=""/>
        <UsernameSpan key={'pc' + username}>{username}</UsernameSpan>
      </UserDiv>

      <IconDiv>
        {alive? null : <div><Image alt='' height="35" width="35" src={deadIcon}/></div>}
      </IconDiv>

      <ButtonDiv>
        {alive ? renderActionButton() : null}
      </ButtonDiv>

    </Card>
  )
}

const Button = styled.button`
  --widthA: fit-content;
  --widthB: calc(var(--widthA) + 5px);
  border: none;
  background-color: #9a824991;
  cursor: pointer;
  height: 30px;
  border-radius: 9px;
  padding: 5px;
  width: var(--widthB);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
`;

const ButtonDiv = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const UsernameSpan = styled.div`
  margin: 5px;
`;