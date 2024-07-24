export const formatError = (error) => {
  console.log(error);
  const arr = error.split("/").filter((word) => word !== "auth")[0];

  const formatted = arr
    .split("-")
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join(" ");
  return formatted;
};
