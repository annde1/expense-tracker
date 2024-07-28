import Card from "react-bootstrap/Card";
import { formatDate } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";

function Expense({ expense }) {
  const navigate = useNavigate();
  const formatedDate = formatDate(expense.date.seconds);

  const handleRedirectExpense = () => {
    navigate(`${ROUTES.EDITEXPENSE}/${expense?.id}`);
  };

  return (
    <>
      <Card
        className="expenseCard"
        variant="dark"
        onClick={handleRedirectExpense}
      >
        <Card.Body>
          <Card.Title>{expense.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted ">
            {formatedDate}
          </Card.Subtitle>
          <Card.Text className="expenseCardText">$ {expense.value}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
export default Expense;
