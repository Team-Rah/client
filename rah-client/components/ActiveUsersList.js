import Container from '@mui/material/Container';

export default function ActiveUsersList(props) {

  return (
    <Container maxWidth={false} id="activeUsers-container">

      <Container maxWidth="lg" id="activeUsersList-container">
        <h3>Online Players</h3>
        {props.users.map((user) => (
          <Container key={JSON.stringify(user)} maxWidth={false} className="activeUser-item" style={{display: 'flex', justifyContent: 'space-between' }}>
            <div className="activeUsers-username"> <img className="userAvatar" src={`${user.img}`} alt=""/> <span>{user.userName}</span> </div>

            <div className="activeUsers-rank"> {user.score} </div>
          </Container>
        ))}
      </Container>

    </Container>
  )
}