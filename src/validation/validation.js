export const validateRegister = (email, password, repeatPassword) => {
  const error = {};
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{7,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!passwordRegex.test(password)) {
    error.password =
      "Password must contain at least one uppercase letter, one special character and be 7 characters long.";
  }
  if (password !== repeatPassword) {
    error.password = "Passwords must match.";
  }
  if (!emailRegex.test(email)) {
    error.email = " Email must be a valid email.";
  }
  return error;
};

export const validateCreateExpense = (expense) => {
  const error = {};
  if (!expense.name) {
    error.expenseName = "Expense name is required.";
  }

  if (!expense.value) {
    error.expenseValue = "Expense value is required and must be a number.";
  }
  if (!expense.date) {
    error.expenseDate = "Date is required.";
  }
  if (expense.description.length > 100) {
    error.expenseDescription = "Description must be below 100 characters.";
  }
  return error;
};
