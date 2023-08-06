import React from "react";

import classes from './MealsSummary.module.css';

const MealsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Authentic Japanese Ramen, Delivered To You</h2>
            <p>
                Choose your favorite ramen from our broad selection
                and enjoy a delicious Japanese ramen at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients, just-in-time and
                of course by experienced master ramen chefs!
            </p>
        </section>
    );
};

export default MealsSummary;