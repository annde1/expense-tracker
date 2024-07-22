import { useEffect } from "react";
import { useSelector } from "react-redux";
function DashboardPage() {
  const userData = useSelector((store) => store.authenticationSlice.userData);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return <p>Hello user</p>;
}
export default DashboardPage;
