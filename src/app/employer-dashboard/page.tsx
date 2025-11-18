import { logoutUserAction } from "@/features/auth/server/auth.action";

const EmployerDashboard = () => {
  return (
    <>
      <div>Employer Dashboard</div>
      <button onClick={logoutUserAction}>Logout</button>
    </>
  );
};

export default EmployerDashboard;
