import React, { useState } from 'react';
import {
  Card, CardText, CardBody, CardTitle, Pagination, PaginationItem, PaginationLink, Container, Row, Col
} from 'reactstrap';

const PaginatedCardList = (postData) => {
  // Sample data for the cards
  const data = [
    { id: 1, title: 'Card 1', text: 'This is card 1.' },
    { id: 2, title: 'Card 2', text: 'This is card 2.' },
    { id: 3, title: 'Card 3', text: 'This is card 3.' },
    { id: 4, title: 'Card 4', text: 'This is card 4.' },
    { id: 5, title: 'Card 5', text: 'This is card 5.' },
    { id: 6, title: 'Card 6', text: 'This is card 6.' },
    { id: 7, title: 'Card 7', text: 'This is card 7.' },
    { id: 8, title: 'Card 8', text: 'This is card 8.' },
    { id: 9, title: 'Card 9', text: 'This is card 9.' },
  ];

  const cardsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row>
        {currentCards.map((item) => (
          <Col md="4" key={item.id}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">{item.title}</CardTitle>
                <CardText>{item.text}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination 
        aria-label="Page navigation example" 
        style={{ marginTop: '20px', justifyContent: 'center' }} // Inline styles for the entire pagination
        className="custom-pagination" >
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink
            first
            href="#"
            onClick={() => handlePageChange(1)}
            style={{ color: '#000' }} // Inline style for individual links
            className="custom-pagination-link" // Apply custom CSS class
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink
            previous
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            style={{ color: '#000' }}
            className="custom-pagination-link"
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem active={i + 1 === currentPage} key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i + 1)}
              style={i + 1 === currentPage ? { backgroundColor: 'gray', color: 'white' } : { color: '#000' }} // Inline style for active and non-active links
              className="custom-pagination-link"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink
            next
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
            style={{ color: '#000' }}
            className="custom-pagination-link"
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink
            last
            href="#"
            onClick={() => handlePageChange(totalPages)}
            style={{ color: '#000' }}
            className="custom-pagination-link"
          />
        </PaginationItem>
      </Pagination>
    </Container>
  );
};

export default PaginatedCardList;
