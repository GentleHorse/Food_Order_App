import React, { useState, useEffect, useCallback } from "react";
import MealItem from "./MealItem/MealItem";

import Card from "../UI/Card";
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // useEffect must not return promise inside the scope!
    // ** async - await return promise!
    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://food-order-app-22f9a-default-rtdb.europe-west1.firebasedatabase.app/menu.json');

            // if some errors occur, it stops execution here
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        // You cannot use try() - catch() strategy 
        // because emerge of Error object rejects promise.
        // Hence you should make the logic like below
        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <h1>Loading ...</h1>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <h1>{httpError}</h1>
            </section>
        );
    }

    const mealsList = meals.map(meal => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card className={classes['meal-card']}>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;