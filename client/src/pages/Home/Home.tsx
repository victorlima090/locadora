import { MovieCard } from "../../components/MovieCard";
import "./Home.css";
import { Movies } from "../../types/Movies";
import { useCallback, useEffect, useState } from "react";
import mockImg from "../../assets/pexels-hicret-13024626.jpg";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Col } from "react-bootstrap";

export const Home: React.FC = () => {
  const [movieList, setMovieList] = useState<Movies[]>([]);

  const moviesMock: Movies[] = [
    {
      id: 1,
      img: mockImg,
      title: "Movie1",
      quantityAvailable: 2,
      cast: ["Emma Stone", "Carlinhos de Jesus"],
    } as Movies,
    {
      id: 2,
      img: mockImg,
      title: "Movie1",
      quantityAvailable: 2,
      cast: ["Emma Stone", "Carlinhos de Jesus"],
    } as Movies,
    {
      id: 3,
      img: mockImg,
      title: "Movie1",
      quantityAvailable: 2,
      cast: ["Emma Stone", "Carlinhos de Jesus"],
    } as Movies,
    {
      id: 4,
      img: mockImg,
      title: "Movie1",
      quantityAvailable: 2,
      cast: ["Emma Stone", "Carlinhos de Jesus"],
    } as Movies,
    {
      id: 5,
      img: mockImg,
      title: "Movie1",
      quantityAvailable: 2,
      cast: ["Emma Stone", "Carlinhos de Jesus"],
    } as Movies,
    {
      id: 6,
      img: mockImg,
      title: "Movie1",
      quantityAvailable: 2,
      cast: ["Emma Stone", "Carlinhos de Jesus"],
    } as Movies,
    {
      id: 7,
      img: mockImg,
      title: "Movie1",
      quantityAvailable: 2,
      cast: ["Emma Stone", "Carlinhos de Jesus"],
    } as Movies,
  ];

  const getMovieList = useCallback(async () => {
    try {
      //   const movieList = await axios.get<Movies[]>("");
      //   if (movieList.status === 200) {
      //     setMovieList(movieList.data);
      //   }
      setMovieList(moviesMock);
    } catch (error) {
      console.error(error);
      setMovieList([]);
    }
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const handleAddClick = (movieId: number) => {
    console.log("Adding movie Id", movieId);
  };
  const handleRemoveClick = (movieId: number) => {
    console.log("Removing movie id:", movieId);
  };

  return (
    <Container fluid style={{ margin: "2rem 5rem" }}>
      <Row xs={3} md={5} className="g-4">
        {movieList.map((movie, idx) => (
          <Col key={idx}>
            <MovieCard
              key={movie.id}
              img={movie.img}
              title={movie.title}
              handleAddClick={() => handleAddClick(movie.id)}
              handleRemoveClick={() => handleRemoveClick(movie.id)}
              cast={movie.cast}
              quantityAvailable={movie.quantityAvailable}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
