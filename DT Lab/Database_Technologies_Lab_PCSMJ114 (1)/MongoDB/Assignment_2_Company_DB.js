// Database Creation / Selection
use Company;

// Q1: Insert at least 5 documents in Employee collection
db.Employee.insertMany([
  {
    emp_id: 101,
    first_name: "Karan",
    last_name: "Sharma",
    email: "karan@company.com",
    phone: "9822011111",
    address: { house_no: "12A", street: "FC Road", city: "Pune", state: "MH", country: "India", pincode: "411004" },
    salary: 45000,
    designation: "supervisor",
    experience: 4,
    doj: ISODate("2020-01-15"),
    dob: ISODate("1995-03-22")
  },
  {
    emp_id: 102,
    first_name: "Rahul",
    last_name: "Verma",
    email: "rahul@company.com",
    phone: "9822022222",
    address: { house_no: "404", street: "MG Road", city: "Pune", state: "MH", country: "India", pincode: "411001" },
    salary: 60000,
    designation: "manager",
    experience: 7,
    doj: ISODate("2018-06-01"),
    dob: ISODate("1990-11-05")
  },
  {
    emp_id: 103,
    first_name: "Kavita",
    last_name: "Patil",
    email: "kavita@company.com",
    phone: "9822033333",
    address: { house_no: "5B", street: "Baner Rd", city: "Pune", state: "MH", country: "India", pincode: "411045" },
    salary: 42000,
    designation: "floor supervisor",
    experience: 3,
    doj: ISODate("2021-03-10"),
    dob: ISODate("1996-08-14")
  },
  {
    emp_id: 104,
    first_name: "Amit",
    last_name: "Deshmukh",
    email: "amit@company.com",
    phone: "9822044444",
    address: { house_no: "101", street: "Kothrud", city: "Pune", state: "MH", country: "India", pincode: "411038" },
    salary: 55000,
    designation: "lead engineer",
    experience: 6,
    doj: ISODate("2019-09-20"),
    dob: ISODate("1992-12-30")
  },
  {
    emp_id: 105,
    first_name: "Pooja",
    last_name: "Joshi",
    email: "pooja@company.com",
    phone: "9822055555",
    address: { house_no: "7", street: "Viman Nagar", city: "Pune", state: "MH", country: "India", pincode: "411014" },
    salary: 38000,
    designation: "cashier",
    experience: 2,
    doj: ISODate("2022-07-01"),
    dob: ISODate("1998-05-19")
  }
]);

// Q2: Insert at least 10 documents into Transaction collection
db.Transaction.insertMany([
  { trans_id: 201, trans_date: ISODate("2026-01-10"), emp_name: "Karan", trans_details: [{ item_id: "I1", item_name: "Mouse", qty: 2, price: 300 }], payment: { type: "Cash", total_amt: 600, status: true }, remark: "Old item" },
  { trans_id: 202, trans_date: ISODate("2026-01-11"), emp_name: "Rahul", trans_details: [{ item_id: "I2", item_name: "Keyboard", qty: 1, price: 800 }], payment: { type: "Debit", total_amt: 800, status: true }, remark: "" },
  { trans_id: 203, trans_date: ISODate("2026-01-12"), emp_name: "Kavita", trans_details: [{ item_id: "I3", item_name: "Monitor", qty: 1, price: 5000 }], payment: { type: "Credit", total_amt: 5000, status: true }, remark: "Bulk discount" },
  { trans_id: 204, trans_date: ISODate("2026-01-13"), emp_name: "Amit", trans_details: [{ item_id: "I1", item_name: "Mouse", qty: 5, price: 300 }], payment: { type: "Cash", total_amt: 1500, status: true }, remark: "" },
  { trans_id: 205, trans_date: ISODate("2026-01-14"), emp_name: "Pooja", trans_details: [{ item_id: "I4", item_name: "USB Cable", qty: 3, price: 100 }], payment: { type: "Cash", total_amt: 300, status: true }, remark: "" },
  { trans_id: 206, trans_date: ISODate("2026-01-15"), emp_name: "Karan", trans_details: [{ item_id: "I2", item_name: "Keyboard", qty: 2, price: 800 }], payment: { type: "Debit", total_amt: 1600, status: true }, remark: "" },
  { trans_id: 207, trans_date: ISODate("2026-01-16"), emp_name: "Rahul", trans_details: [{ item_id: "I5", item_name: "Headset", qty: 1, price: 1200 }], payment: { type: "Credit", total_amt: 1200, status: true }, remark: "" },
  { trans_id: 208, trans_date: ISODate("2026-01-17"), emp_name: "Kavita", trans_details: [{ item_id: "I1", item_name: "Mouse", qty: 1, price: 300 }], payment: { type: "Cash", total_amt: 300, status: true }, remark: "" },
  { trans_id: 209, trans_date: ISODate("2026-01-18"), emp_name: "Amit", trans_details: [{ item_id: "I6", item_name: "RAM 8GB", qty: 2, price: 2200 }], payment: { type: "Debit", total_amt: 4400, status: true }, remark: "Urgent delivery" },
  { trans_id: 210, trans_date: ISODate("2026-01-19"), emp_name: "Pooja", trans_details: [{ item_id: "I7", item_name: "Webcam", qty: 1, price: 950 }], payment: { type: "Credit", total_amt: 950, status: true }, remark: "" }
]);

// Q3: Display all formatted documents
db.Employee.find().pretty();
db.Transaction.find().pretty();

// Q4: Update salary of all employees by increment of 4000
db.Employee.updateMany({}, { $inc: { salary: 4000 } });

// Q5: Update remark for transaction id 201
db.Transaction.updateOne({ trans_id: 201 }, { $set: { remark: "Transaction verified and closed." } });

// Q6: Update designation of 'Karan' from supervisor to manager
db.Employee.updateOne(
  { first_name: "Karan", designation: "supervisor" },
  { $set: { designation: "manager" } }
);

// Q7: Update designation of employee having emp_id 103
db.Employee.updateOne({ emp_id: 103 }, { $set: { designation: "senior floor supervisor" } });

// Q8: Change address of employee having emp_id 104
db.Employee.updateOne(
  { emp_id: 104 },
  { $set: { "address.house_no": "202", "address.street": "Aundh", "address.pincode": "411007" } }
);

// Q9: Delete transaction made by employee "Pooja" on given date
db.Transaction.deleteOne({ emp_name: "Pooja", trans_date: ISODate("2026-01-14") });

// Q10: Delete all employees whose first name starts with 'K'
db.Employee.deleteMany({ first_name: { $regex: "^K", $options: "i" } });