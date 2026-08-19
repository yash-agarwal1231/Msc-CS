// 1. Library Database
// a) Readers who recommended either book A, B, or C
MATCH (r:Reader)-[:RECOMMENDED]->(b:Book)
WHERE b.title IN ['Tinker, Tailor, Soldier, Spy', 'Our Man in Havana']
RETURN DISTINCT r.name AS ReaderName;

// b) Readers who haven't recommended any book
MATCH (r:Reader)
WHERE NOT (r)-[:RECOMMENDED]->(:Book)
RETURN r.name AS InactiveReader;

// c) Author who wrote a book read/issued by maximum number of readers
MATCH (a:Author)-[:WROTE]->(b:Book)<-[:IssuedBy|RECOMMENDED]-(r:Reader)
RETURN a.name AS AuthorName, count(DISTINCT r) AS TotalReaders
ORDER BY TotalReaders DESC LIMIT 1;

// d) Books recommended by 'Ian' and read by at least one reader
MATCH (r1:Reader {name: 'Ian'})-[:RECOMMENDED]->(b:Book)<-[:IssuedBy|RECOMMENDED]-(r2:Reader)
WHERE r1 <> r2
RETURN DISTINCT b.title AS BookTitle;

// e) Books recommended by 'Ian' and read by the maximum number of readers
MATCH (r1:Reader {name: 'Ian'})-[:RECOMMENDED]->(b:Book)<-[:IssuedBy|RECOMMENDED]-(r2:Reader)
WHERE r1 <> r2
RETURN b.title AS BookTitle, count(DISTINCT r2) AS ReaderCount
ORDER BY ReaderCount DESC LIMIT 1;

// f) Publishers who haven't published books written by authors from Pune and Mumbai
MATCH (p:Publisher)
WHERE NOT EXISTS {
  MATCH (p)<-[:PublishedBy]-(b:Book)<-[:WROTE]-(a:Author)
  WHERE a.city IN ['Pune', 'Mumbai']
}
RETURN p.name AS PublisherName;

// g) Voracious readers in our library (highest recommendations / issues)
MATCH (r:Reader)-[:RECOMMENDED|IssuedBy]->(b:Book)
RETURN r.name AS VoraciousReader, count(b) AS BooksHandled
ORDER BY BooksHandled DESC LIMIT 3;

// ----------------------------------------------------
// 2. Song Database
// a) Artists who have sung ONLY songs written by "Mithoon"
MATCH (art:Artist)-[:Performs]->(s:Song)-[:Written_by]->(sa:Song_author)
WITH art, collect(DISTINCT sa.name) AS authors
WHERE authors = ['Mithoon']
RETURN art.name AS Artist;

// b) Artists who have sung maximum songs recorded by "YRF Studios"
MATCH (art:Artist)-[:Performs]->(s:Song)-[:Recorded_in]->(st:Recording_studio {name: 'YRF Studios'})
RETURN art.name AS Artist, count(s) AS SongCount
ORDER BY SongCount DESC LIMIT 1;

// c) Songs financed by "T-Series" and sung by "Arijit Singh"
MATCH (rc:Recording_company {name: 'T-Series'})-[:Finances]->(s:Song)<-[:Performs]-(art:Artist {name: 'Arijit Singh'})
RETURN s.title AS SongTitle;

// ----------------------------------------------------
// 3. Employee Database
// a) Employees having the same skills as employee "Rohan"
MATCH (e1:Employee {name: 'Rohan'})-[:Has_acquired]->(s:Skillset)<-[:Has_acquired]-(e2:Employee)
WHERE e1 <> e2
RETURN e2.name AS EmployeeName, collect(s.skill) AS SharedSkills;

// b) Projects controlled by a department and have employees of the same department working in it
MATCH (d:Department)<-[:Controlled_by]-(p:Projects)<-[:Assigned_to]-(e:Employee)-[:Works_in]->(d)
RETURN DISTINCT d.name AS Department, p.name AS Project;

// c) Projects belonging to departments managed by employee "Vikram"
MATCH (e:Employee {name: 'Vikram'})-[:Project_manager]->(p:Projects)-[:Controlled_by]->(d:Department)
RETURN p.name AS ProjectName, d.name AS DepartmentName;

// ----------------------------------------------------
// 4. Practice: Movie Database
// a) Pairs of actors that paired in multiple movies together
MATCH (a1:Actor)-[:ACTED_IN]->(m:Movie)<-[:ACTED_IN]-(a2:Actor)
WHERE id(a1) < id(a2)
WITH a1, a2, count(m) AS MovieCount, collect(m.title) AS Movies
WHERE MovieCount > 1
RETURN a1.name, a2.name, MovieCount, Movies;

// b) Actor-movie subgraphs along with roles played
MATCH (a:Actor)-[r:ACTED_IN]->(m:Movie)
RETURN a.name AS Actor, r.role AS Role, m.title AS Movie;

// c) Reviewers and ones they follow directly or via a third reviewer (1 to 2 hops)
MATCH (r1:Reviewer)-[:FOLLOWS*1..2]->(r2:Reviewer)
WHERE r1 <> r2
RETURN DISTINCT r1.name AS Follower, r2.name AS FollowedReviewer;

// d) Movies that have the most number of reviews
MATCH (m:Movie)<-[:REVIEWED]-(r:Reviewer)
RETURN m.title AS Movie, count(r) AS ReviewCount
ORDER BY ReviewCount DESC LIMIT 1;

// ----------------------------------------------------
// 5. Practice: Social Network Database
// a) People who created maximum timeline messages
MATCH (p:Person)-[:CREATES]->(t:Timeline)-[:CONTAINS]->(m:Message)
RETURN p.name AS Person, count(m) AS MessageCount
ORDER BY MessageCount DESC LIMIT 1;

// b) All friends of John's friend, Tom
MATCH (p1:Person {name: 'John'})-[:FRIEND_OF]->(p2:Person {name: 'Tom'})-[:FRIEND_OF]->(f:Person)
WHERE f.name <> 'John'
RETURN DISTINCT f.name AS FriendsOfTom;

// c) People with maximum friends
MATCH (p:Person)-[:FRIEND_OF]-(f:Person)
RETURN p.name AS Person, count(DISTINCT f) AS FriendCount
ORDER BY FriendCount DESC LIMIT 1;

// d) People who are part of more than 3 groups
MATCH (p:Person)-[:BELONGS_TO]->(g:Groups)
WITH p, count(g) AS group_count
WHERE group_count > 3
RETURN p.name AS Person, group_count;