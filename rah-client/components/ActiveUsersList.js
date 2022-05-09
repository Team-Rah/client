import Container from '@mui/material/Container';

export default function ActiveUsersList(props) {

  return (
    <Container maxWidth={false} id="activeUsers-container">

      <Container maxWidth="lg" id="activeUsersList-container">
        <h3>Online Players</h3>
        {props.users.map((user) => (
          <Container maxWidth={false} className="activeUser-item" style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="activeUsers-username"> {user.name} </div>

            <div className="activeUsers-rank"> {user.rank} </div>
          </Container>
        ))}
      </Container>

    </Container>
  )
}