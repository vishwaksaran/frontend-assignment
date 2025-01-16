import React, { useState, useEffect } from 'react';

const Pagination = ({ totalPages, currentPage, handlePageClick, handlePrevPageSet, handleNextPageSet }) => {
  const[pageNumbersPerSet, setPageNumbersPerSet] = useState(0);
  const totalPagesSets = Math.ceil(totalPages / pageNumbersPerSet);

  const halfSetSize = Math.floor(pageNumbersPerSet / 2);
  let startPage = Math.max(0, currentPage - halfSetSize);
  let endPage = startPage + pageNumbersPerSet;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(0, endPage - pageNumbersPerSet);
  }

  const pageNumbers = [];
  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => handlePageClick(i)}
        className={currentPage === i ? 'active' : ''}
      >
        {i + 1}
      </button>
    );
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPageNumbersPerSet(5);
      } else {
        setPageNumbersPerSet(10);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="pagination">
      <button
        onClick={handlePrevPageSet}
        disabled={startPage === 0}
        className="arrow"
      >
        &lt;
      </button>
      {pageNumbers}
      <button
        onClick={handleNextPageSet}
        disabled={endPage === totalPages}
        className="arrow"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;