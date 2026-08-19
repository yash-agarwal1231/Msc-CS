// 1. Library Database
// a) List all people who have issued a book "Our Man in Havana"
MATCH (p:Person)-[:IssuedBy]->(b:Book {title: 'Our Man in Havana'})
RETURN p.name AS Borrower;

// b) Count the number of people who have read "Tinker, Tailor, Soldier, Spy"
MATCH (p:Person)-[:RECOMMENDED|IssuedBy|ReviewedBy]->(b:Book {title: 'Tinker, Tailor, Soldier, Spy'})
RETURN count(DISTINCT p) AS TotalReaders;

// c) Add a property "Number of books issued" for Mr. Joshi and set its value as the count
MATCH (p:Person {name: 'Mr. Joshi'})-[r:IssuedBy]->(:Book)
WITH p, count(r) AS issueCount
SET p.number_of_books_issued = issueCount
RETURN p.name, p.number_of_books_issued;

// d) List the names of publishers from Pune city
MATCH (pub:Publisher)
WHERE toLower(pub.city) = 'pune'
RETURN pub.name AS PunePublishers;

// ----------------------------------------------------
// 2. Song Database
// a) List the names of songs written by "Mithoon"
MATCH (s:Song)-[:Written_by]->(sa:Song_author {name: 'Mithoon'})
RETURN s.title AS SongTitle;

// b) List the names of record companies who have financed for the song "Tum Hi Ho"
MATCH (rc:Recording_company)-[:Finances]->(s:Song {title: 'Tum Hi Ho'})
RETURN rc.name AS RecordCompany;

// c) List the names of artists performing the song "Tum Hi Ho"
MATCH (a:Artist)-[:Performs]->(s:Song {title: 'Tum Hi Ho'})
RETURN a.name AS ArtistName;

// d) Name the songs recorded by the studio "YRF Studios"
MATCH (s:Song)-[:Recorded_in]->(st:Recording_studio {name: 'YRF Studios'})
RETURN s.title AS SongTitle;

// ----------------------------------------------------
// 3. Employee Database
// a) List the names of employees in the department "IT"
MATCH (e:Employee)-[:Works_in]->(d:Department {name: 'IT'})
RETURN e.name AS EmployeeName;

// b) List the projects along with their properties, controlled by department "IT"
MATCH (p:Projects)-[:Controlled_by]->(d:Department {name: 'IT'})
RETURN properties(p) AS ProjectDetails;

// c) List the departments along with the count of employees in it
MATCH (e:Employee)-[:Works_in]->(d:Department)
RETURN d.name AS Department, count(e) AS EmployeeCount;

// d) List the skillset for an employee "Rohan"
MATCH (e:Employee {name: 'Rohan'})-[:Has_acquired]->(s:Skillset)
RETURN s.skill AS Skills;

// ----------------------------------------------------
// 4. Movie Database
// a) Find all actors who have acted in a movie "The Matrix Resurrections"
MATCH (a:Actor)-[:ACTED_IN]->(m:Movie {title: 'The Matrix Resurrections'})
RETURN a.name AS Actor;

// b) Find reviewer pairs, one following the other and both reviewing the same movie
MATCH (r1:Reviewer)-[:FOLLOWS]->(r2:Reviewer),
      (r1)-[:REVIEWED]->(m:Movie)<-[:REVIEWED]-(r2)
RETURN r1.name AS Reviewer1, r2.name AS Reviewer2, m.title AS Movie;

// c) Find actors that acted in a movie together after 2010
MATCH (a1:Actor)-[:ACTED_IN]->(m:Movie)<-[:ACTED_IN]-(a2:Actor)
WHERE a1 <> a2 AND m.release_year > 2010
RETURN a1.name, a2.name, m.title, m.release_year;

// d) Find all movies produced by "Warner Bros"
MATCH (p:Producer {name: 'Warner Bros'})-[:PRODUCED]->(m:Movie)
RETURN m.title AS Movie;

// ----------------------------------------------------
// 5. Social Network Database
// a) Find all friends of "John", along with the year since when John knows them
MATCH (p:Person {name: 'John'})-[r:FRIEND_OF]->(f:Person)
RETURN f.name AS Friend, r.since AS KnownSince;

// b) List out the affiliations of John
MATCH (p:Person {name: 'John'})-[:AFFILIATED_TO]->(aff:Affiliations)
RETURN aff.name AS Affiliation;

// c) Find all friends of John who are born in the same year as John
MATCH (p:Person {name: 'John'})-[:FRIEND_OF]->(f:Person)
WHERE p.birth_year = f.birth_year
RETURN f.name AS FriendName, f.birth_year;

// d) List out the messages posted by John in his timeline during the year 2015
MATCH (p:Person {name: 'John'})-[:CREATES]->(t:Timeline {year: 2015})-[:CONTAINS]->(m:Message)
RETURN m.text AS Message;