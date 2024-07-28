import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserExpenses } from "../firebase/firebaseUtils";
import Expense from "./Expense";
import Spinner from "react-bootstrap/Spinner";
import SearchExpense from "./SearchExpense";
import SortExpenses from "./SortExprenses";
import { sortExpenses } from "../helpers/helpers";
import DateRange from "./DateRange";
import { isWithinInterval } from "date-fns";
import { motion } from "framer-motion";
import { errorToast } from "../helpers/toastify";
function ExpensesList() {
  const { userData } = useSelector((state) => state.authentication);
  const [expenses, setExpenses] = useState([]);
  const [originalExpenses, setOriginalExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await fetchUserExpenses(userData?.uid);
        setExpenses(expenses);
        setOriginalExpenses(expenses);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch expenses.");
      }
    };
    fetchExpenses();
  }, [userData]);

  const handleSortExpenses = (sortBy) => {
    const sortedExpenses = sortExpenses(sortBy, expenses, originalExpenses);
    setExpenses(sortedExpenses);
  };

  const handleFilterExpensesByDate = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = originalExpenses.filter((expense) => {
      const expenseDate = expense.date.toDate();
      return isWithinInterval(expenseDate, { start, end });
    });
    setExpenses(filtered);
  };

  const handleFilterByName = (name) => {
    if (name.trim() === "") {
      setExpenses(originalExpenses);
      return;
    }

    const filteredExpenses = originalExpenses.filter((expense) =>
      expense.name.toLowerCase().includes(name.toLowerCase())
    );

    setExpenses(filteredExpenses);
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" variant="light" />
      ) : expenses.length > 0 ? (
        <Container>
          <SearchExpense onNameFilterChange={handleFilterByName} />
          <div style={{ display: "flex" }}>
            <SortExpenses onSortChange={handleSortExpenses} />
            <DateRange onDateRangeChange={handleFilterExpensesByDate} />
          </div>

          <Row className="expensesGrid">
            {expenses.map((expense) => (
              <Col key={expense.id} sm={12} md={6} lg={3} className="mb-3">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                  }}
                >
                  <Expense expense={expense} />
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <div style={{ textAlign: "center", color: "white", marginTop: "20px" }}>
          You don't have any expenses
        </div>
      )}
    </>
  );
}

export default ExpensesList;
