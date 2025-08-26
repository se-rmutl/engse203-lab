import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MealCard from './components/MealCard';
// import './App.css';

function App() {
  // 2.2.1 สร้าง state
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2.2.2 สร้าง useEffect เพื่อ fetch ข้อมูล
  useEffect(() => {
    if (!searchTerm) {
      setMeals([]);
      return;
    }

    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      setMeals([]);

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setMeals(data.meals || []); // data.meals อาจเป็น null
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm]); // ทำงานใหม่ทุกครั้งที่ searchTerm เปลี่ยน

  // 2.2.3 State Lifting
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="status-message">Loading...</p>;
    }
    if (error) {
      return <p className="status-message">{error}</p>;
    }
    if (meals.length === 0 && searchTerm) {
      return <p className="status-message">No recipes found.</p>;
    }
    if (meals.length === 0 && !searchTerm) {
      return <p className="placeholder">Type something in the search box to find recipes!</p>
    }
    return meals.map(meal => <MealCard key={meal.idMeal} meal={meal} />);
  };

  return (
    <div className="container">
      <header>
        <h1>🍳 Recipe Finder (React)</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        <div className="results-grid">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;