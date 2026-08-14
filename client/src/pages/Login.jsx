import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Login=()=>{
  const [form,setForm]=useState({
    email:"",
    password:""
  });
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const {login}=useAuth();
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);

    try{
      await login(form.email,form.password);
      navigate("/dashboard");
    }catch(error){
      setError(error.response?.data?.message||"Login failed");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div>
      <h1>Welcome Back</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error&&<p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading?"Signing In...":"Sign In"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;