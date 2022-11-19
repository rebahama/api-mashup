import React, {useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/MoviePage.module.css';
import { Card, Col, Container, Form, Row} from 'react-bootstrap';
import SpinnerBar from '../components/SpinnerBar';
import MovieProps from './MovieProps';


const Movies = () => {

  const axiosReq = axios.create();
  const [loaded,setLoaded] = useState(false);
  const [query, setQuery] = useState("revenant");
  const baseUrl = `https://www.omdbapi.com/?apikey=41059430&s=${query}&type=movie`
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleData = async () => {
      try {
        const {data} = await axiosReq.get(baseUrl);
        setMovies(data.Search);
       console.log(data.Error)
       setError(data.Error)
        setLoaded(true);
      }
      
      catch (err) {
        console.log(err)
      }
    };
    setLoaded(false);

    const timer = setTimeout(()=>{
      handleData();

    }, 2000)

    return ()=>{
      clearTimeout(timer);
    }
        
  }, [query]);

    

  return (

    <div>
 <Form onSubmit={(event) => event.preventDefault()}>
  <Container>
 <Form.Control type="text" className={styles.SearchBar}placeholder= "Search a review" value={query} onChange={(event) => setQuery(event.target.value)}  />

 </Container>
 <p> </p>  
          </Form>
          <Container>
          
     {loaded ? <> {movies && movies.map((movie)=>{
      
      return  <MovieProps key={movie.imdbID} {...movie} />} )}
     
      </>
      
      :<SpinnerBar/>}
      </Container>

<p></p>
<p> {error}</p>
<p> Found: {movies && movies.length> 0 ? movies.length:"0"} </p>
     
      
    </div>
  )
}

export default Movies