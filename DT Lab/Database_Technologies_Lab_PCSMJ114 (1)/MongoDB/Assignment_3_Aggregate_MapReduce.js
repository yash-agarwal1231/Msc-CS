use Company;

// Q1: Find employees having designation as either 'manager' or 'floor supervisor'
db.Employee.find({
  designation: { $in: ["manager", "floor supervisor", "senior floor supervisor"] }
}).pretty();

// Q2: Find employee whose name ends with 'a' and print output in JSON format
printjson(db.Employee.find({ first_name: { $regex: "a$", $options: "i" } }).toArray());

// Q3: Display name of employee whose salary is greater than 50000 using cursor
var empCursor = db.Employee.find({ salary: { $gt: 50000 } }, { first_name: 1, last_name: 1, salary: 1, _id: 0 });
while (empCursor.hasNext()) {
  printjson(empCursor.next());
}

// Q4: Sort employees in descending order of designation
db.Employee.find().sort({ designation: -1 }).pretty();

// Q5: Count total number of employees
db.Employee.countDocuments();

// Q6: Calculate sum of total amount paid for all transactions
db.Transaction.aggregate([
  {
    $group: {
      _id: null,
      total_revenue: { $sum: "$payment.total_amt" }
    }
  }
]);

// Q7: Calculate sum of total amount paid for each payment type
db.Transaction.aggregate([
  {
    $group: {
      _id: "$payment.type",
      total_amount: { $sum: "$payment.total_amt" },
      count: { $sum: 1 }
    }
  }
]);

// Q8: Find transaction id of the latest transaction
db.Transaction.find({}, { trans_id: 1, trans_date: 1, _id: 0 }).sort({ trans_date: -1 }).limit(1);

// Q9: Find designation of employees who have made transactions > Rs. 500
db.Transaction.aggregate([
  { $match: { "payment.total_amt": { $gt: 500 } } },
  {
    $lookup: {
      from: "Employee",
      localField: "emp_name",
      foreignField: "first_name",
      as: "emp_info"
    }
  },
  { $unwind: "$emp_info" },
  {
    $project: {
      _id: 0,
      employee_name: "$emp_name",
      designation: "$emp_info.designation",
      amount: "$payment.total_amt"
    }
  }
]);

// Q10: Total quantity of a particular item sold using Map-Reduce
var mapFunction = function() {
  for (var i = 0; i < this.trans_details.length; i++) {
    emit(this.trans_details[i].item_name, this.trans_details[i].qty);
  }
};

var reduceFunction = function(keyItem, valuesQty) {
  return Array.sum(valuesQty);
};

db.Transaction.mapReduce(
  mapFunction,
  reduceFunction,
  { out: "total_item_quantities" }
);

db.total_item_quantities.find().pretty();