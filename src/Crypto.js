import React, { useState, useEffect } from "react";
import axios from "axios";

// This component uses the Binance API to fetch and display the current
// prices of multiple items.
export const BinanceTicker = () => {
    // This state variable stores the prices of the items fetched from the API.
    // It is initialized to an empty object.
    const [items, setItems] = useState({});

    // This hook is called when the component is mounted and whenever the
    // items state variable is updated.
    useEffect(() => {
        // This function fetches the prices of the items in the itemsToFetch array
        // from the Binance API and updates the items state variable with the new
        // prices.
        const fetchData = async () => {
            const itemsToFetch = ["BTCUSDT", "SHIBUSDT", "ETHUSDT", "LUNCUSDT"];

            for (const item of itemsToFetch) {
                // Fetch the price of the current item from the Binance API.
                const response = await axios.get(
                    `https://api.binance.com/api/v3/ticker/price?symbol=${item}`
                );

                // Update the items state variable with the new price.
                setItems((prevItems) => ({
                    ...prevItems,
                    [item]: response.data.price,
                }));
            }
        };

        // Fetch the data every second.
        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        // Clear the interval when the component is unmounted.
        return () => clearInterval(interval);
    }, []);

    // Render a list of the items and their prices in the HTML output.
    return (
        <div className="binance-ticker">
            <h1>Binance Ticker</h1>
            {Object.keys(items).map((item) => (
                <p>
                    {item}: $ {items[item]}
                </p>
            ))}
        </div>
    );
};
