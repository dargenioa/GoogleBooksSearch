import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

function Books() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   getBooks();
  // }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.getBooks(query)
      .then((res) => {
      console.log(res);
      setBooks(res.data.items)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // const handleBookSave = (id) => {
  //   const book = books.find((book) => book.id === id);

  //   API.saveBook({
  //     googleId: book.items.id,
  //     title: book.items.volumeInfo.title,
  //     link: book.items.volumeInfo.infoLink,
  //     authors: book.items.volumeInfo.authors,
  //     description: book.items.volumeInfo.description,
  //     image: book.items.volumeInfo.imageLinks.thumbnail,
  //   }).then(() => getBooks(query));
  // };

  return (
    <Container>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1 className="text-center">
              <strong>(React) Google Books Search</strong>
            </h1>
            <h2 className="text-center">
              Search for and Save Books of Interest.
            </h2>
          </Jumbotron>
        </Col>
        <Col size="md-12">
          <Card title="Book Search" icon="far fa-book">
            <Form
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              query={query}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <Card title="Results">
              <List>
                {books.map((book) => (
                  <Book
                    key={book.id}
                    title={book.volumeInfo.title}
                    link={book.volumeInfo.infoLink}
                    authors={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    Button={() => (
                      <button
                        // onClick={() => handleBookSave(book.id)}
                        className="btn btn-primary ml-2"
                      >
                        Save
                      </button>
                    )}
                  />
                ))}
              </List>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Books;
