import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useRecoilValue} from 'recoil'
import {userState} from '../_states/tokenState'
import {useRouter} from 'next/router'
const columns = [
  {
    field: 'creatorName',
    headerName: 'Creator',
    type: 'string',
    width: 150,
    editable: false,
  },
  {
    field: 'gameName',
    headerName: 'Game Name',
    type: 'string',
    width: 200,
    editable: false,
  },
  {
    field: 'playersNum',
    headerName: 'Players',
    type: 'number',
    width: 100,
    editable: false,
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    type: 'string',
    width: 150,
    editable: false,
  },
];
//{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },

export default function GamesList({games}) {
const router = useRouter()
  const user = useRecoilValue(userState)

  const rows = games.map((game) => {
    let players = 'players: ' + game.players.length.toString() + '/' + game.playerAllowed
    return {id: game._id, creatorName: game.owner, gameName: game.gameName, playersNum: players, createdAt: new Date(game.createdAt).toString()}
  });

const onRowClick = (event) => {
  console.log(event.id)
  router.push(`/play/${event.id}/${user.userId}`)
  // 'play/gameId/PlayerId
}


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={onRowClick}
        disableSelectionOnClick
      />
    </div>
  );
}