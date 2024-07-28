import { Button } from "react-bootstrap";
import DatePicker from "./DatePicker";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  deleteExpense,
  editExpense,
  fetchExpenseById,
} from "../firebase/firebaseUtils";
import { validateCreateExpense } from "../validation/validation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { success, errorToast } from "../helpers/toastify";

function EditExpenseForm() {
  const [date, setDate] = useState(null);
  const [expenseName, setExpenseName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const expense = await fetchExpenseById(id);
        const expenseDate = moment(expense.date.toDate());
        setDate(expenseDate);
        setExpenseName(expense.name);
        setExpenseDescription(expense.description);
        setExpenseValue(expense.value);
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch expense data.");
      }
    };
    fetchExpenseData();
  }, [id]);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleEditExpense = async (e) => {
    e.preventDefault();
    try {
      const expense = {
        name: expenseName,
        value: parseFloat(parseFloat(expenseValue).toFixed(2)),
        description: expenseDescription,
        date: date ? date.toDate() : null,
      };

      const error = validateCreateExpense(expense);
      if (Object.keys(error).length > 0) {
        setError(error);
        return;
      }

      await editExpense(id, expense);
      success("Expense updated 💰");
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not edit expense.");
    }
  };

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense(id);
      success("Expense deleted 💰");
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="addExpenseContainer">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 className="addExpenseHeading">Edit Expense</h2>

          <Form className="addExpenseForm" onSubmit={handleEditExpense}>
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
            <Button className="button editExpenseBtn" type="submit">
              Save Expense
            </Button>
            <Button
              className="button editExpenseBtn deleteBtn"
              onClick={handleDeleteExpense}
            >
              Delete Expense
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
    </>
  );
}
export default EditExpenseForm;
