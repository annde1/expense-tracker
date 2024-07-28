import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { IoAddCircleSharp } from "react-icons/io5";
import ExpensesList from "../components/ExpensesList";

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboardPageContainer">
      <h1 className="pageTitle">Dashboard</h1>
      <ExpensesList />
      <button
        className="expenseButton"
        onClick={() => {
          navigate(ROUTES.NEWEXPENSE);
        }}
      >
        <IoAddCircleSharp className="addExpenseButton" />
      </button>
    </div>
  );
}
export default DashboardPage;
