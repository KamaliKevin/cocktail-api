import React, {useState} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ApiData({ data, searchTerm }) {

    function combineIngredientsAndMeasurements(drink) {
        const ingredientsAndMeasurements = [];

        for (let i = 1; i <= 15; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;

            const ingredient = drink[ingredientKey];
            const measurement = drink[measureKey];

            if (ingredient && measurement) {
                ingredientsAndMeasurements.push(`${measurement} ${ingredient}`);
            }
            else if (ingredient) {
                ingredientsAndMeasurements.push(`${ingredient}`);
            }
        }

        return ingredientsAndMeasurements;
    }

    return (
        <div className="mb-5">
            {searchTerm ? (
                <div>
                    <h2 className="mb-4 fw-bold">
                        Results for "{searchTerm.trim()}":
                    </h2>
                    {data && data.length ? (
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {data.map(drink => (
                                <Col key={drink.idDrink} className="mb-4">
                                    <Card className="h-100 d-flex flex-column">
                                        <Card.Img variant="top" src={drink.strDrinkThumb} alt="Drink Image" />
                                        <Card.Body className="flex-grow-1 bg-palegrey">
                                            <Card.Title className="bg-lightyellow py-2 px-5 rounded">
                                                <span className="fw-bold text-dark">{drink.strDrink}</span>
                                            </Card.Title>
                                            <Card.Text>
                                                <p>
                                                    <span className="fw-bold me-1">
                                                        <FontAwesomeIcon icon="fa-solid fa-champagne-glasses" className="me-1"/>
                                                        Alcoholic?:
                                                    </span>
                                                    {drink.strAlcoholic === "Alcoholic" ? "Yes" : "No"}
                                                </p>
                                                <p>
                                                    <span className="fw-bold me-1">
                                                        <FontAwesomeIcon icon="fa-solid fa-note-sticky" className="me-1"/>
                                                        Category:
                                                    </span>
                                                    {drink.strCategory}
                                                </p>
                                                <p>
                                                    <span className="fw-bold me-1">
                                                        <FontAwesomeIcon icon="fa-solid fa-users" className="me-1"/>
                                                        IBA:
                                                    </span>
                                                    {drink.strIBA === null ? <i>TBD</i> : drink.strIBA}
                                                </p>
                                                <p>
                                                    <span className="fw-bold me-1">
                                                        <FontAwesomeIcon icon="fa-solid fa-whiskey-glass" className="me-1" />
                                                        Fitting glass:
                                                    </span>
                                                    {drink.strGlass}
                                                </p>
                                                <p>
                                                    <span className="fw-bold me-1">
                                                        <FontAwesomeIcon icon="fa-solid fa-apple-whole" className="me-1"/>
                                                        Ingredients:
                                                    </span>
                                                    <p>{combineIngredientsAndMeasurements(drink).join(", ")}</p>
                                                </p>
                                                <p>
                                                    <span className="fw-bold me-1">
                                                        <FontAwesomeIcon icon="fa-solid fa-list" className="me-1"/>
                                                        Serving instructions:
                                                    </span>
                                                    <p>{drink.strInstructions}</p>
                                                </p>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p className="text-white fw-bold">
                            <FontAwesomeIcon icon="fa-solid fa-circle-xmark" className="me-1"/>
                            We are sorry! There are no results for "{searchTerm}". Are you sure you wrote the drink correctly?
                        </p>
                    )}
                </div>
            ) : (
                <p className="text-white fw-bold">
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" className="me-1"/>
                    Enter a search term to find cocktails.
                </p>
            )}
        </div>
    );
}

export default ApiData;