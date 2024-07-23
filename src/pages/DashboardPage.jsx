import { useEffect } from "react";
import { useSelector } from "react-redux";
function DashboardPage() {
  const { userData } = useSelector((state) => state.authentication);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return <p>Hello user</p>;
}
export default DashboardPage;
