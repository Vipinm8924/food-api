const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simulated data retrieval functions
const func1 = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Biryani', description: 'A flavorful rice dish with spices and meat', price: '$10' },
                { name: 'Paneer Tikka', description: 'Grilled paneer cubes marinated in spices', price: '$8' }
            ]);
        }, 115); // 115 milliseconds
    });
};

const func2 = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { location: 'Restaurant A', address: '123 Beach Road, Goa' },
                { location: 'Restaurant B', address: '456 Hill Street, Goa' }
            ]);
        }, 120000); // 2 minutes in milliseconds
    });
};

const func3 = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Biryani', nutritionalInfo: '500 calories' },
                { name: 'Paneer Tikka', nutritionalInfo: '300 calories' }
            ]);
        }, 300); // 300 milliseconds
    });
};

const func4 = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Samosa', reason: 'Out of stock' },
                { name: 'Lassi', reason: 'Out of stock' }
            ]);
        }, 100); // 100 milliseconds
    });
};

// API endpoint
app.get('/food-info', async (req, res) => {
    try {
        const [foodList, locations, nutritionalInfo, stockOutFoods] = await Promise.all([
            func1(),
            func2(),
            func3(),
            func4()
        ]);

        // Merging all data into a single object
        const responseData = {
            foods: foodList,
            locations: locations,
            nutritionalInfo: nutritionalInfo,
            stockOut: stockOutFoods
        };

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:3000/food-info`);
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}/food-info`);
});
