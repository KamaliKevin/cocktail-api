import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./components/SearchBar";
import ApiData from "./components/ApiData";
import logo from "./logo.svg";
import "./App.css";
import "./css/main.css";

function App() {
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            // Check if "searchTerm" is not empty before making the API call:
            if (searchTerm.trim() !== "") {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
                if (!response.ok) {
                    throw new Error("Error fetching data from the API");
                }
                const data = await response.json();
                setApiData(data.drinks || []);
                setFilteredData(data.drinks || []);
            }
            else {
                // If "searchTerm" is empty, reset data:
                setApiData([]);
                setFilteredData([]);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    // Call the fetchData function
    fetchData();
  }, [searchTerm]);

  function handleSearch(filteredDrinks){
      setFilteredData(filteredDrinks);
  }

  return (
      <div className="App bg-violet text-white d-flex flex-column min-vh-100">
        <div className="d-flex justify-content-center align-content-center py-3 px-5 mb-5 bg-dark">
          <h1 className="text-warning">
              <FontAwesomeIcon icon="cocktail" className="me-2" />Land of Cocktails
          </h1>
        </div>
        <Container className="flex-grow-1">
            <SearchBar
                drinks={apiData}
                onSearch={handleSearch}
                setSearchTerm={setSearchTerm} // Pass setSearchTerm to update the search term
            />
            <ApiData data={filteredData} searchTerm={searchTerm} />
        </Container>
      </div>
  );
}

export default App;