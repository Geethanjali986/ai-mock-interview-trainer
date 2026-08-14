import {useAuth} from "../context/AuthContext";

const Dashboard=()=>{
  const {user,logout}=useAuth();

  return(
    <div>
      <h1>AI Mock Interview Trainer</h1>
      <h2>Welcome, {user?.name}</h2>

      <button>Start New Interview</button>

      <section>
        <h3>Interview History</h3>
        <p>No interviews yet.</p>
      </section>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;