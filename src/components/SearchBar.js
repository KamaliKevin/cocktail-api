import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

function SearchBar ({ drinks, onSearch, setSearchTerm }) {
    const [searchTermLocal, setSearchTermLocal] = useState("");

    function handleInputChange (event) {
        setSearchTermLocal(event.target.value);
    }

    function handleSearch () {
        // Update the search term in the parent component:
        setSearchTerm(searchTermLocal);

        // Convert both the search term and drink names to lowercase for case-insensitive comparison:
        const searchTermLocalLower = searchTermLocal.toLowerCase();
        const filteredDrinks = drinks.filter((drink) =>
            drink.strDrink.toLowerCase().includes(searchTermLocalLower)
        );

        if (onSearch) {
            onSearch(filteredDrinks);
        }
    }

    return (
        <div className="mb-5">
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Search for a drink..."
                    value={searchTermLocal}
                    onChange={handleInputChange}
                />
                <Button variant="primary" className="btn-dark-warning" onClick={handleSearch}>
                    Search
                </Button>
            </InputGroup>
        </div>
    );
}

export default SearchBar;