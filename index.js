const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let hotels = [
  {
    id: 1,
    name: 'Romantic Getaway',
    category: 'Resort',
    rating: 2.2,
    reviews: 4572,
    amenity: 'Spa',
    price: 10464,
    country: 'South Africa',
  },
  {
    id: 2,
    name: 'Wellness Retreat',
    category: 'Family',
    rating: 2.8,
    reviews: 2114,
    amenity: 'Pool',
    price: 13243,
    country: 'Australia',
  },
  {
    id: 3,
    name: 'Romantic Getaway',
    category: 'Luxury',
    rating: 3.1,
    reviews: 4359,
    amenity: 'Restaurant',
    price: 3299,
    country: 'Germany',
  },
  {
    id: 4,
    name: 'Luxury Suites',
    category: 'Family',
    rating: 4.9,
    reviews: 3651,
    amenity: 'Bar',
    price: 16359,
    country: 'United Kingdom',
  },
  {
    id: 5,
    name: 'Luxury Suites',
    category: 'Budget',
    rating: 4.6,
    reviews: 688,
    amenity: 'Gym',
    price: 15570,
    country: 'France',
  },
  {
    id: 6,
    name: 'Cultural Heritage Hotel',
    category: 'Boutique',
    rating: 2.0,
    reviews: 219,
    amenity: 'Pet Friendly',
    price: 2321,
    country: 'USA',
  },
  {
    id: 7,
    name: 'Business Hotel',
    category: 'Mid-Range',
    rating: 3.7,
    reviews: 1040,
    amenity: 'Free WiFi',
    price: 4523,
    country: 'India',
  },
  {
    id: 8,
    name: 'Historic Plaza Hotel',
    category: 'Mid-Range',
    rating: 3.5,
    reviews: 300,
    amenity: 'Parking',
    price: 8543,
    country: 'Australia',
  },
  {
    id: 9,
    name: 'Adventure Resort',
    category: 'Boutique',
    rating: 4.2,
    reviews: 1222,
    amenity: 'Gym',
    price: 11894,
    country: 'South Africa',
  },
  {
    id: 10,
    name: 'Mountain Retreat',
    category: 'Resort',
    rating: 4.8,
    reviews: 4015,
    amenity: 'Spa',
    price: 17560,
    country: 'India',
  },
  {
    id: 11,
    name: 'Eco Friendly Lodge',
    category: 'Family',
    rating: 2.4,
    reviews: 528,
    amenity: 'Restaurant',
    price: 3124,
    country: 'Germany',
  },
  {
    id: 12,
    name: 'Urban Boutique Hotel',
    category: 'Mid-Range',
    rating: 3.9,
    reviews: 1401,
    amenity: 'Free WiFi',
    price: 9245,
    country: 'France',
  },
  {
    id: 13,
    name: 'Beachfront Hotel',
    category: 'Luxury',
    rating: 4.5,
    reviews: 489,
    amenity: 'Pool',
    price: 14567,
    country: 'USA',
  },
  {
    id: 14,
    name: 'Ocean View Resort',
    category: 'Budget',
    rating: 3.3,
    reviews: 783,
    amenity: 'Spa',
    price: 7432,
    country: 'United Kingdom',
  },
  {
    id: 15,
    name: 'City Central Hotel',
    category: 'Boutique',
    rating: 4.1,
    reviews: 2133,
    amenity: 'Bar',
    price: 9823,
    country: 'Australia',
  },
  {
    id: 16,
    name: 'Casino Resort',
    category: 'Luxury',
    rating: 4.9,
    reviews: 5000,
    amenity: 'Bar',
    price: 18900,
    country: 'South Africa',
  },
  {
    id: 17,
    name: 'Golf Resort',
    category: 'Mid-Range',
    rating: 4.7,
    reviews: 789,
    amenity: 'Gym',
    price: 16340,
    country: 'France',
  },
  {
    id: 18,
    name: 'Family Fun Hotel',
    category: 'Family',
    rating: 3.2,
    reviews: 1322,
    amenity: 'Pool',
    price: 7500,
    country: 'Germany',
  },
  {
    id: 19,
    name: 'Spa and Relaxation Hotel',
    category: 'Luxury',
    rating: 4.4,
    reviews: 2314,
    amenity: 'Spa',
    price: 14900,
    country: 'United Kingdom',
  },
  {
    id: 20,
    name: 'Country House Hotel',
    category: 'Budget',
    rating: 3.6,
    reviews: 1876,
    amenity: 'Parking',
    price: 6234,
    country: 'Australia',
  },
];

app.get('/', (req, res) => {
  res.send('Welcome to TripWithUs app!!!!');
});

// Endpoint 1: Get the hotels sorted by pricing
// /hotels/sort/pricing?pricing=low-to-high
function sortByPrice(query) {
  if (query === 'low-to-high') {
    return function (hotel1, hotel2) {
      return hotel1.price - hotel2.price;
    };
  } else {
    return function (hotel1, hotel2) {
      return hotel2.price - hotel1.price;
    };
  }
}
app.get('/hotels/sort/pricing', (req, res) => {
  let sortQuery = req?.query?.pricing;
  let hotelCopy = hotels.slice();
  hotelCopy.sort(sortByPrice(sortQuery));
  res.json({ hotels: hotelCopy });
});

// Endpoint 2: Get the hotels sorted based on their Ratings
// /hotels/sort/rating?rating=low-to-high
function sortByRating(query) {
  if (query === 'low-to-high') {
    return function (hotel1, hotel2) {
      return hotel1.rating - hotel2.rating;
    };
  } else {
    return function (hotel1, hotel2) {
      return hotel2.rating - hotel1.rating;
    };
  }
}
app.get('/hotels/sort/rating', (req, res) => {
  let ratingSortQuery = req?.query?.rating;
  let hotelCopy = hotels.slice();
  hotelCopy.sort(sortByRating(ratingSortQuery));
  res.json({ hotels: hotelCopy });
});

// Endpoint 3: Get the Hotels sorted based on their Reviews
// /hotels/sort/reviews?reviews=least-to-most
function sortByReviews(query) {
  if (query === 'least-to-most') {
    return function (hotel1, hotel2) {
      return hotel1.reviews - hotel2.reviews;
    };
  } else {
    return function (hotel1, hotel2) {
      return hotel2.reviews - hotel1.reviews;
    };
  }
}

app.get('/hotels/sort/reviews', (req, res) => {
  let sortQuery = req?.query?.reviews;
  let hotelCopy = hotels.slice();
  hotelCopy.sort(sortByReviews(sortQuery));
  res.json({ hotels: hotelCopy });
});

// Endpoint 4: Filter the hotels based on the Hotel Amenity
// /hotels/filter/amenity?amenity=spa
function filterByAmenity(query, amenity) {
  return query.toLowerCase() === amenity.toLowerCase();
}
app.get('/hotels/filter/amenity', (req, res) => {
  const amenity = req?.query?.amenity;
  let filterHotles = hotels.filter((hotel) =>
    filterByAmenity(amenity, hotel.amenity)
  );
  res.json({ hotels: filterHotles });
});

// Endpoint 5: Filter the hotels based on the selected Country
//  /hotels/filter/country?country=india
function filterByCountry(query, country) {
  return query.toLowerCase() === country.toLowerCase();
}
app.get('/hotels/filter/country', (req, res) => {
  const country = req.query?.country;
  const filterHotles = hotels.filter((hotel) =>
    filterByCountry(hotel.country, country)
  );
  res.json({ hotels: filterHotles });
});

// Endpoint 6: Filter the hotels based on the selected Category
// /hotels/filter/category?category=luxury
function filterByCategory(query, category) {
  return query.toLowerCase() === category.toLowerCase();
}

app.get('/hotels/filter/category', (req, res) => {
  const category = req.query?.category;
  const filterHotles = hotels.filter((hotel) =>
    filterByCategory(hotel.category, category)
  );
  res.json({ hotels: filterHotles });
});

// Endpoint 7: Send all hotels
// /hotels
app.get('/hotels', (req, res) => {
  res.json({ hotels });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
