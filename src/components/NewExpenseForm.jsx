import DatePicker from "./DatePicker";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function NewExpenseForm() {
  const [date, setDate] = useState(null); //for submiting I need date._d
  const [expenseName, setExpenseName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  const handleDateChange = (date) => {
    setDate(date);
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

        <Form style={{ width: "80%" }}>
          <Form.Group
            className="mb-3"
            controlId="formExpenseName"
            style={{ flexBasis: "90%" }}
          >
            <Form.Control type="text" placeholder="Expense name" />
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
