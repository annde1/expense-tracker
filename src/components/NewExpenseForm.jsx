import DatePicker from "./DatePicker";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useSelector } from "react-redux";
import { createNewExpense } from "../firebase/firebaseUtils";
function NewExpenseForm() {
  const [date, setDate] = useState(null); //for submiting I need date._d
  const [expenseName, setExpenseName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const { userData } = useSelector((state) => state.authentication); //TODO: for submiting new expense
  useEffect(() => {
    console.log(userData);
  }, [userData]);
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
        date: date._d,
        userId: userData.uid,
        //todo: add validation
      };
      const data = await createNewExpense(expense);
      console.log(data);
      //todo: clear fields
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2.5rem",
      }}
    >
      <div className="login-container">
        <h2
          style={{
            color: "white",
            marginTop: "3rem",
            marginBottom: "2rem",
          }}
        >
          Add Expense
        </h2>

        <Form style={{ width: "80%" }} onSubmit={handleAddExpense}>
          <Form.Group
            className="mb-3"
            controlId="formExpenseName"
            style={{ flexBasis: "90%" }}
          >
            <Form.Control
              type="text"
              placeholder="Expense name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Form.Group
              className="mb-3"
              controlId="formExpenseValue"
              style={{ flexBasis: "90%" }}
            >
              <Form.Control
                type="text"
                placeholder="Expense value"
                value={expenseValue}
                onChange={(e) => setExpenseValue(e.target.value)}
              />
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
              className="mb-3"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
            />
          </FloatingLabel>
          <Button
            color="primary"
            style={{ color: "white" }}
            type="submit"
            variant="info"
          >
            Add Expense
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default NewExpenseForm;
