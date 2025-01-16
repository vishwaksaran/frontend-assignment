import React, { useState, useEffect } from 'react';
import './App.css';
import Pagination from './Pagination';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light'); 
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = projects.slice(offset, offset + itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPageSet = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageSet = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  let tableBodyContent;

  if (loading) {
    tableBodyContent = (
      <tr>
        <td colSpan="3" className="loading-message">
          Loading...
        </td>
      </tr>
    );
  } else if (error) {
    tableBodyContent = (
      <tr>
        <td colSpan="3" className="error-message">
          {error}
        </td>
      </tr>
    );
  } else if (projects.length === 0) {
    tableBodyContent = (
      <tr>
        <td colSpan="3" className="no-data-message">
          No data available
        </td>
      </tr>
    );
  } else {
    tableBodyContent = currentItems.map((project) => (
      <tr key={project['s.no']}>
        <td>{project['s.no']}</td>
        <td>{project['percentage.funded']}%</td>
        <td>${project['amt.pledged'].toLocaleString()}</td>
      </tr>
    ));
  }

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
        <tbody>{tableBodyContent}</tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          handlePrevPageSet={handlePrevPageSet}
          handleNextPageSet={handleNextPageSet}
        />
      )}
    </div>
  );
};

export default App;