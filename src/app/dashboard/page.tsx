import { logoutUserAction } from "@/features/auth/server/auth.action";

const ApplicantDashboard = () => {
  return (
    <>
      <div>Applicant Dashboard</div>
      <button onClick={logoutUserAction}>Logout</button>
    </>
  );
};

export default ApplicantDashboard;
