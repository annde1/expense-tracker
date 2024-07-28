import { format } from "date-fns";

export const formatError = (error) => {
  const arr = error.split("/").filter((word) => word !== "auth")[0];

  const formatted = arr
    .split("-")
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join(" ");
  return formatted;
};

export const formatDate = (dateStr) => {
  return format(new Date(dateStr * 1000), "dd/MM/yyyy");
};

export const sortExpenses = (sortBy, expensesList, originalExpenses) => {
  let sorted = [...expensesList];
  switch (sortBy) {
    case "value-asc":
      sorted.sort((a, b) => a.value - b.value);
      break;
    case "value-desc":
      sorted.sort((a, b) => b.value - a.value);
      break;
    case "o-t-n":
      sorted.sort((a, b) => a.date.seconds - b.date.seconds);
      break;
    case "n-t-o":
      sorted.sort((a, b) => b.date.seconds - a.date.seconds);
      break;
    case "show-all":
      return originalExpenses;
    default:
      break;
  }
  return sorted;
};
