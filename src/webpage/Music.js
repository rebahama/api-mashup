import React, { useState } from "react";
import styles from "../styles/MusicPage.module.css";
import axios from "axios";
import SpinnerBar from "../components/SpinnerBar";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const Music = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [music, SetMusic] = useState([]);
  const [lyric, setLyrics] = useState("");
  const [error, setError] = useState("");

  const options = {
    method: "GET",
    url: "https://shazam.p.rapidapi.com/search",
    params: { term: lyric, locale: "en-US", offset: "0", limit: "5" },
    headers: {
      "X-RapidAPI-Key": "287e8c27a4msh78acdca733c3af2p13858ejsnd551110e95c8",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };

  const handleSubmit = (event) => {
    if (lyric === "") {
      alert("Please type something in the field");
    }
    if (lyric.length > 100) {
      alert("Maximum 100 characters");
    } else if (lyric !== "") {
      event.preventDefault();
      setIsLoading(true);
      axios
        .request(options)
        .then(function (response) {
          console.log(response.status);
          if (!response.data.tracks || !response.data.tracks.hits) {
            setError("Song not found please try again");
            SetMusic([]);
          } else if (response.status === 200) {
            console.log(response.data.tracks.hits);
            SetMusic(response.data.tracks.hits);
          }
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={12} className={styles.HeroImage}></Col>
        </Row>
        <h2> Lyricfinder</h2>
        <hr className={styles.hrLine} />
        <h2>
          Got a song stuck in your head? Go ahead and type in atleast 5
          sentences from the lyrics of a song and a list of possible songs will
          be displayed starting with the top being the most likely song that you
          are looking for
        </h2>
        <div className={styles.ContainerSearch}>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className={styles.SearchSong}
            as="textarea"
            placeholder="Search a song"
            value={lyric}
            onChange={(e) => setLyrics(e.target.value)}
          />
          <p> {lyric.length}/100</p>
          <Button type="submit"> Search</Button>
        </Form>
        </div>
      </Container>
      {isLoading ? (
        <SpinnerBar />
      ) : (
        <>
          <p> Found: {music.length} songs </p>
          {music.length > 0 ? (
            music.map((musics) => {
              return (
                <div key={musics.track.key} className={styles.ArtistContainer}>
                  <img
                    src={musics.track.images.background}
                    alt="artist avatar"
                    className={styles.ArtistAvatar}
                  ></img>

                  <p> Song: {musics.track.title}</p>
                  <p> Artist: {musics.track.subtitle}</p>
                  <a
                    href={musics.track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here to hear song
                  </a>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>{error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Music;
