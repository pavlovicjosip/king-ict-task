import React from 'react';
import { Pagination } from 'react-bootstrap';

const KingPagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
      {renderPaginationItems()}
      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default KingPagination;