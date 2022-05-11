import LandingPage from '../components/LandingPage';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import ActiveUsersList from '../components/ActiveUsersList';
import axios from 'axios';
import activeUsers from '../pages/_sampleData/activeUsers';

const basePath = 'http://localhost:4030/blueocean/api/v1';

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [activeList, setActiveList] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (activeUsers) {
      setIsLoaded(true);
      setActiveList(activeUsers);
    }
    // catch block for API call
    // setIsLoaded(true);
    // setError(error);
  }, []);

  if (error) {
    return <div>Error: {error.message} </div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Navbar />
        <Container maxWidth={false} id="app-container">
          <ActiveUsersList users={activeUsers} />

          <Container maxWidth={false}>
            <Container maxWidth={false} id="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/OysJ4nL4jS8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Container>

            <Container maxWidth={false} id="instructions-container">
              <h1>Instructions</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
                Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                sapiente officiis modi at sunt excepturi expedita sint? Sed
                quibusdam recusandae alias error harum maxime adipisci amet
                laborum.
              </p>
            </Container>
          </Container>
        </Container>
      </>
    );
  }
}

