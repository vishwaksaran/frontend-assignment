import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSet, setCurrentPageSet] = useState(0);
  const [theme, setTheme] = useState('light'); 
  const itemsPerPage = 5;
  const pageNumbersPerSet = 10;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const totalPagesSets = Math.ceil(totalPages / pageNumbersPerSet);
  const offset = currentPage * itemsPerPage;
  const currentItems = projects.slice(offset, offset + itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentPageSet(Math.floor(pageNumber / pageNumbersPerSet));
  };

  const handlePrevPageSet = () => {
    if (currentPageSet > 0) {
      setCurrentPageSet(currentPageSet - 1);
      setCurrentPage((currentPageSet - 1) * pageNumbersPerSet);
    }
  };

  const handleNextPageSet = () => {
    if (currentPageSet < totalPagesSets - 1) {
      setCurrentPageSet(currentPageSet + 1);
      setCurrentPage((currentPageSet + 1) * pageNumbersPerSet);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const startPage = currentPageSet * pageNumbersPerSet;
    const endPage = Math.min(startPage + pageNumbersPerSet, totalPages);

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

    return (
      <div className="pagination">
        <button
          onClick={handlePrevPageSet}
          disabled={currentPageSet === 0}
          className="arrow"
        >
          &lt;
        </button>
        {pageNumbers}
        <button
          onClick={handleNextPageSet}
          disabled={currentPageSet === totalPagesSets - 1}
          className="arrow"
        >
          &gt;
        </button>
      </div>
    );
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <button onClick={toggleTheme} className="theme-toggle">
        Toggle Theme
      </button>
      <h1>Project Funding</h1>
      <table className="project-table">
        <thead>
          <tr className="table-heading">
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((project, index) => (
            <tr key={index}>
              <td>{project['s.no']}</td>
              <td>{project['percentage.funded']}%</td>
              <td>${project['amt.pledged'].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default App;