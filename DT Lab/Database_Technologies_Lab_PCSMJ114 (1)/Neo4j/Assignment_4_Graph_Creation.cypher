// 1. Library Database Setup
CREATE (b1:Book {title: 'Tinker, Tailor, Soldier, Spy', tags: ['thriller', 'espionage'], status: 'in library', condition: 'old', cost: 450, type: 'Novel', published: 1974})
CREATE (b2:Book {title: 'Our Man in Havana', tags: ['satire', 'espionage'], status: 'issued', condition: 'new', cost: 600, type: 'Novel', published: 1958})
CREATE (b3:Book {title: 'The Spy Who Came in from the Cold', tags: ['espionage', 'cold war'], status: 'in library', condition: 'new', cost: 500, type: 'Novel', published: 1963})

CREATE (a1:Person:Author {name: 'John Le Carre', born: '19-10-1932', city: 'London'})
CREATE (a2:Person:Author {name: 'Graham Greene', born: '02-10-1904', died: '02-04-1991', city: 'Pune'})

CREATE (r1:Person:Reader {name: 'Alan', city: 'Pune'})
CREATE (r2:Person:Reader:Author {name: 'Ian', city: 'Mumbai'})
CREATE (r3:Person:Reader {name: 'Mr. Joshi', city: 'Pune'})

CREATE (p1:Publisher {name: 'Penguin Books', city: 'Pune'})
CREATE (p2:Publisher {name: 'HarperCollins', city: 'Mumbai'})

CREATE (a1)-[:WROTE]->(b1)
CREATE (a2)-[:WROTE]->(b2)
CREATE (a1)-[:WROTE]->(b3)

CREATE (r1)-[:RECOMMENDED {date: '05-07-2011'}]->(b1)
CREATE (r2)-[:RECOMMENDED {date: '09-09-2011'}]->(b1)
CREATE (r2)-[:RECOMMENDED {date: '03-02-2011'}]->(b2)

CREATE (b1)-[:PublishedBy]->(p1)
CREATE (b2)-[:PublishedBy]->(p2)
CREATE (r3)-[:IssuedBy {date: '01-08-2026'}]->(b2)
CREATE (r1)-[:ReviewedBy {remark: 'Classic spy fiction'}]->(b1);

// 2. Song Database Setup
CREATE (art1:Artist {name: 'Arijit Singh'})
CREATE (art2:Artist {name: 'Shreya Ghoshal'})
CREATE (s1:Song {title: 'Tum Hi Ho', genre: 'Romantic', year: 2013})
CREATE (s2:Song {title: 'Sunn Raha Hai', genre: 'Romantic', year: 2013})
CREATE (sa1:Song_author {name: 'Mithoon'})
CREATE (sa2:Song_author {name: 'Ankit Tiwari'})
CREATE (st1:Recording_studio {name: 'YRF Studios'})
CREATE (rc1:Recording_company {name: 'T-Series'})

CREATE (art1)-[:Performs]->(s1)
CREATE (s1)-[:Written_by]->(sa1)
CREATE (s1)-[:Recorded_in]->(st1)
CREATE (st1)-[:Managed_by]->(rc1)
CREATE (rc1)-[:Finances]->(s1)

CREATE (art2)-[:Performs]->(s2)
CREATE (s2)-[:Written_by]->(sa2)
CREATE (s2)-[:Recorded_in]->(st1)
CREATE (rc1)-[:Finances]->(s2);

// 3. Employee Database Setup
CREATE (e1:Employee {name: 'Rohan', age: 30})
CREATE (e2:Employee {name: 'Sneha', age: 28})
CREATE (e3:Employee {name: 'Vikram', age: 40})

CREATE (d1:Department {name: 'IT', location: 'Building A'})
CREATE (d2:Department {name: 'Analytics', location: 'Building B'})

CREATE (sk1:Skillset {skill: 'Graph DB'})
CREATE (sk2:Skillset {skill: 'Python'})

CREATE (prj1:Projects {name: 'Big Data Pipeline', budget: 50000})

CREATE (e1)-[:Works_in]->(d1)
CREATE (e2)-[:Works_in]->(d1)
CREATE (e3)-[:Works_in]->(d2)
CREATE (e1)-[:Has_acquired]->(sk1)
CREATE (e2)-[:Has_acquired]->(sk1)
CREATE (e1)-[:Has_acquired]->(sk2)
CREATE (e1)-[:Assigned_to]->(prj1)
CREATE (prj1)-[:Controlled_by]->(d1)
CREATE (e3)-[:Project_manager]->(prj1);

// 4. Movie Database Setup
CREATE (m_act1:Actor {name: 'Keanu Reeves'})
CREATE (m_act2:Actor {name: 'Laurence Fishburne'})
CREATE (mov1:Movie {title: 'The Matrix Resurrections', release_year: 2021})
CREATE (rev1:Person:Reviewer {name: 'Alice'})
CREATE (rev2:Person:Reviewer {name: 'Bob'})
CREATE (prod1:Producer {name: 'Warner Bros'})

CREATE (m_act1)-[:ACTED_IN {role: 'Neo'}]->(mov1)
CREATE (m_act2)-[:ACTED_IN {role: 'Morpheus'}]->(mov1)
CREATE (rev1)-[:FOLLOWS]->(rev2)
CREATE (rev1)-[:REVIEWED]->(mov1)
CREATE (rev2)-[:REVIEWED]->(mov1)
CREATE (prod1)-[:PRODUCED]->(mov1);

// 5. Social Network Database Setup
CREATE (p_john:Person {name: 'John', birth_year: 1995})
CREATE (p_tom:Person {name: 'Tom', birth_year: 1995})
CREATE (p_mike:Person {name: 'Mike', birth_year: 1996})
CREATE (aff1:Affiliations {name: 'IEEE'})
CREATE (g1:Groups {name: 'Tech Enthusiasts'})
CREATE (tm1:Timeline {year: 2015})
CREATE (msg1:Message {text: 'Hello World 2015!'})

CREATE (p_john)-[:FRIEND_OF {since: 2012}]->(p_tom)
CREATE (p_tom)-[:FRIEND_OF {since: 2014}]->(p_mike)
CREATE (p_john)-[:AFFILIATED_TO]->(aff1)
CREATE (p_john)-[:BELONGS_TO]->(g1)
CREATE (p_john)-[:CREATES]->(tm1)
CREATE (tm1)-[:CONTAINS]->(msg1);