// Database Creation / Selection
use Movie;

// Q1: Insert at least 10 documents in the collection Film
db.Film.insertMany([
  {
    film_id: 101,
    title: "Titanic",
    year: 1997,
    genres: ["Drama", "Romance"],
    actors: [{ first_name: "Leonardo", last_name: "DiCaprio" }, { first_name: "Kate", last_name: "Winslet" }],
    directors: [{ first_name: "James", last_name: "Cameron" }],
    release_details: [
      { place: "USA", date: ISODate("1997-12-19"), rating: 7.9 },
      { place: "India", date: ISODate("1998-03-20"), rating: 8.0 }
    ]
  },
  {
    film_id: 102,
    title: "Avatar",
    year: 2009,
    genres: ["Action", "Sci-Fi"],
    actors: [{ first_name: "Sam", last_name: "Worthington" }],
    directors: [{ first_name: "James", last_name: "Cameron" }],
    release_details: [{ place: "Worldwide", date: ISODate("2009-12-18"), rating: 7.9 }]
  },
  {
    film_id: 103,
    title: "Devdas",
    year: 2002,
    genres: ["Drama", "Romance"],
    actors: [{ first_name: "Shahrukh", last_name: "Khan" }, { first_name: "Madhuri", last_name: "Dixit" }],
    directors: [{ first_name: "Sanjay", last_name: "Bhansali" }],
    release_details: [{ place: "India", date: ISODate("2002-07-12"), rating: 7.5 }]
  },
  {
    film_id: 104,
    title: "Hum Tumhare Hain Sanam",
    year: 2002,
    genres: ["Drama", "Romance"],
    actors: [{ first_name: "Shahrukh", last_name: "Khan" }, { first_name: "Madhuri", last_name: "Dixit" }],
    directors: [{ first_name: "K. S.", last_name: "Adiyaman" }],
    release_details: [{ place: "India", date: ISODate("2002-05-24"), rating: 5.5 }]
  },
  {
    film_id: 105,
    title: "The Matrix",
    year: 1999,
    genres: ["Sci-Fi", "Action"],
    actors: [{ first_name: "Keanu", last_name: "Reeves" }],
    directors: [{ first_name: "Lana", last_name: "Wachowski" }],
    release_details: [{ place: "USA", date: ISODate("1999-03-31"), rating: 8.7 }]
  },
  {
    film_id: 106,
    title: "Inception",
    year: 2010,
    genres: ["Sci-Fi", "Action"],
    actors: [{ first_name: "Leonardo", last_name: "DiCaprio" }],
    directors: [{ first_name: "Christopher", last_name: "Nolan" }],
    release_details: [{ place: "USA", date: ISODate("2010-07-16"), rating: 8.8 }]
  },
  {
    film_id: 107,
    title: "Interstellar",
    year: 2014,
    genres: ["Sci-Fi", "Drama"],
    actors: [{ first_name: "Matthew", last_name: "McConaughey" }],
    directors: [{ first_name: "Christopher", last_name: "Nolan" }],
    release_details: [{ place: "USA", date: ISODate("2014-11-07"), rating: 8.7 }]
  },
  {
    film_id: 108,
    title: "Tenet",
    year: 2020,
    genres: ["Sci-Fi", "Action"],
    actors: [{ first_name: "John David", last_name: "Washington" }],
    directors: [{ first_name: "Christopher", last_name: "Nolan" }],
    release_details: [{ place: "UK", date: ISODate("2020-08-26"), rating: 7.3 }]
  },
  {
    film_id: 109,
    title: "The Dark Knight",
    year: 2008,
    genres: ["Action", "Crime"],
    actors: [{ first_name: "Christian", last_name: "Bale" }],
    directors: [{ first_name: "Christopher", last_name: "Nolan" }],
    release_details: [{ place: "USA", date: ISODate("2008-07-18"), rating: 9.0 }]
  },
  {
    film_id: 110,
    title: "The Godfather",
    year: 1972,
    genres: ["Crime", "Drama"],
    actors: [{ first_name: "Marlon", last_name: "Brando" }, { first_name: "Al", last_name: "Pacino" }],
    directors: [{ first_name: "Francis", last_name: "Coppola" }],
    release_details: [{ place: "USA", date: ISODate("1972-03-24"), rating: 9.2 }]
  }
]);

// Q2: Insert at least 10 documents in the collection Actor
db.Actor.insertMany([
  { actor_id: 1, first_name: "Shahrukh", last_name: "Khan", address: { street: "Bandstand", city: "Mumbai", state: "Maharashtra", country: "India", pincode: "400050" }, contact: { email: "srk@redchillies.com", phone: "9876543210" }, age: 58 },
  { actor_id: 2, first_name: "Madhuri", last_name: "Dixit", address: { street: "Juhu", city: "Mumbai", state: "Maharashtra", country: "India", pincode: "400049" }, contact: { email: "madhuri@dixit.com", phone: "9876543211" }, age: 56 },
  { actor_id: 3, first_name: "Leonardo", last_name: "DiCaprio", address: { street: "Sunset Blvd", city: "Los Angeles", state: "California", country: "USA", pincode: "90001" }, contact: { email: "leo@dicaprio.org", phone: "1234567890" }, age: 49 },
  { actor_id: 4, first_name: "Kate", last_name: "Winslet", address: { street: "High St", city: "Reading", state: "Berkshire", country: "UK", pincode: "RG1" }, contact: { email: "kate@winslet.com", phone: "1234567891" }, age: 48 },
  { actor_id: 5, first_name: "Sam", last_name: "Worthington", address: { street: "George St", city: "Sydney", state: "NSW", country: "Australia", pincode: "2000" }, contact: { email: "sam@worthington.com", phone: "1234567892" }, age: 47 },
  { actor_id: 6, first_name: "Keanu", last_name: "Reeves", address: { street: "Hollywood Blvd", city: "Los Angeles", state: "California", country: "USA", pincode: "90028" }, contact: { email: "keanu@reeves.com", phone: "1234567893" }, age: 59 },
  { actor_id: 7, first_name: "Christian", last_name: "Bale", address: { street: "Piccadilly", city: "London", state: "Greater London", country: "UK", pincode: "W1J" }, contact: { email: "bale@bale.com", phone: "1234567894" }, age: 50 },
  { actor_id: 8, first_name: "Marlon", last_name: "Brando", address: { street: "Mulholland Dr", city: "Los Angeles", state: "California", country: "USA", pincode: "90210" }, contact: { email: "brando@legacy.com", phone: "1234567895" }, age: 80 },
  { actor_id: 9, first_name: "Al", last_name: "Pacino", address: { street: "5th Ave", city: "New York", state: "New York", country: "USA", pincode: "10001" }, contact: { email: "al@pacino.com", phone: "1234567896" }, age: 83 },
  { actor_id: 10, first_name: "Matthew", last_name: "McConaughey", address: { street: "Congress Ave", city: "Austin", state: "Texas", country: "USA", pincode: "78701" }, contact: { email: "matthew@greenlights.com", phone: "1234567897" }, age: 54 }
]);

// Q3: Display all documents
db.Film.find().pretty();
db.Actor.find().pretty();

// Q4: Add a value to the rating of the film whose title starts with 'T'
db.Film.updateMany(
  { title: { $regex: "^T", $options: "i" } },
  { $inc: { "release_details.$[].rating": 0.5 } }
);

// Q5: Add an actor and corresponding film
db.Actor.insertOne({
  actor_id: 11,
  first_name: "Tom",
  last_name: "Hanks",
  address: { street: "Ocean Ave", city: "Los Angeles", state: "California", country: "USA", pincode: "90401" },
  contact: { email: "tom@hanks.com", phone: "1234567899" },
  age: 67
});

db.Film.insertOne({
  film_id: 111,
  title: "Forrest Gump",
  year: 1994,
  genres: ["Drama", "Romance"],
  actors: [{ first_name: "Tom", last_name: "Hanks" }],
  directors: [{ first_name: "Robert", last_name: "Zemeckis" }],
  release_details: [{ place: "USA", date: ISODate("1994-07-06"), rating: 8.8 }]
});

// Q6: Delete a specific film
db.Film.deleteOne({ title: "Tenet" });

// Q7: Delete a specific actor
db.Actor.deleteOne({ first_name: "Tom", last_name: "Hanks" });

// Q8: Delete all actors with age greater than 70
db.Actor.deleteMany({ age: { $gt: 70 } });

// Q9: Update actor's address where actor_id is 1
db.Actor.updateOne(
  { actor_id: 1 },
  { $set: { "address.street": "Mannat, Bandstand", "address.city": "Mumbai", "address.pincode": "400050" } }
);

// Q10: Update genre of the film directed by James Cameron
db.Film.updateMany(
  { "directors.first_name": "James", "directors.last_name": "Cameron" },
  { $push: { genres: "Blockbuster" } }
);