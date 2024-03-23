import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

interface MovieCardProps {
  img: string;
  title: string;
  handleAddClick: () => void;
  handleRemoveClick: () => void;
  cast: string[];
  quantityAvailable: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  img,
  title,
  cast,
  quantityAvailable,
  handleAddClick,
  handleRemoveClick,
}) => {
  const [isMovieSelected, setIsMovieSelected] = useState<boolean>(false);
  const isAvailable = quantityAvailable > 0;
  const handelSelectClick = () => {
    if (isMovieSelected) {
      setIsMovieSelected(false);
      handleRemoveClick();
    } else {
      setIsMovieSelected(true);
      handleAddClick();
    }
  };

  const truncate = (text: string) => {
    return text.length > 46 ? text.substring(0, 43) + "..." : text;
  };

  return (
    <Container style={{ width: "18rem" }}>
      <Card border="secondary">
        <Card.Img
          variant="top"
          src={img}
          style={{ maxHeight: "15rem", maxWidth: "18rem" }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Elenco: {truncate(cast.join(", "))}</Card.Text>
          <Card.Text>Quantidade Disponível: {quantityAvailable}</Card.Text>
          <div className="d-grid gap-2">
            <Button
              size="lg"
              variant={isMovieSelected ? "outline-danger" : "primary"}
              onClick={handelSelectClick}
              disabled={!isAvailable}
            >
              {isMovieSelected ? "Remover" : "Adicionar"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
