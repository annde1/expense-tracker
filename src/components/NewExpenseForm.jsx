import DatePicker from "./DatePicker";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useSelector } from "react-redux";
import { createNewExpense } from "../firebase/firebaseUtils";
import { validateCreateExpense } from "../validation/validation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { success } from "../helpers/toastify";
function NewExpenseForm() {
  const [date, setDate] = useState(null);
  const [expenseName, setExpenseName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const { userData } = useSelector((state) => state.authentication);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const expense = {
        name: expenseName,
        value: parseFloat(parseFloat(expenseValue).toFixed(2)),
        description: expenseDescription,
        date: date?._d,
        userId: userData.uid,
      };
      const error = validateCreateExpense(expense);

      if (Object.keys(error).length > 0) {
        setError(error);
        return;
      }
      await createNewExpense(expense);
      success("Expense created 💰");
      setDate(null);
      setExpenseName("");
      setExpenseDescription("");
      setExpenseValue("");
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addExpenseContainer">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 className="addExpenseHeading">Add Expense</h2>

        <Form className="addExpenseForm" onSubmit={handleAddExpense}>
          <Form.Group
            className="mb-3"
            controlId="formExpenseName"
            style={{ flexBasis: "90%" }}
          >
            <Form.Control
              type="text"
              placeholder="Expense name"
              value={expenseName}
              className="input"
              onChange={(e) => setExpenseName(e.target.value)}
            />
            {error && error.expenseName && (
              <p style={{ color: "white" }}>{error.expenseName}</p>
            )}
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Form.Group
              className={error?.expenseDate ? "mb-1" : "mb-3"}
              controlId="formExpenseValue"
              style={{ flexBasis: "90%" }}
            >
              <Form.Control
                type="text"
                className="input"
                placeholder="Expense value"
                value={expenseValue}
                onChange={(e) => setExpenseValue(e.target.value)}
              />
              {error && error.expenseValue && (
                <p style={{ color: "white" }}>{error.expenseValue}</p>
              )}
              {error && error.expenseDate && (
                <p style={{ color: "white" }}>{error.expenseDate}</p>
              )}
            </Form.Group>
            <div style={{ flexBasis: "10%" }}>
              <DatePicker onDateChange={handleDateChange} date={date} />
            </div>
          </div>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              className="mb-3 input"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
            />
            {error && error.expenseDescription && (
              <p style={{ color: "white" }}>{error.expenseDescription}</p>
            )}
          </FloatingLabel>
          <Button className="button" type="submit">
            Add Expense
          </Button>
        </Form>

        <NavLink className="goToDashboardIcon" to="/dashboard">
          <div className="goToDashboardLinkContainer">
            <RiMoneyDollarCircleFill />
            <p className="goToDashboardLinkText">Go to dashboard</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
export default NewExpenseForm;
