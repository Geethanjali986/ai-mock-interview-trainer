import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Register=()=>{
  const [form,setForm]=useState({
    name:"",
    email:"",
    password:""
  });
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const {register}=useAuth();
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);

    try{
      await register(form.name,form.email,form.password);
      navigate("/dashboard");
    }catch(error){
      setError(error.response?.data?.message||"Registration failed");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          minLength="6"
          required
        />

        {error&&<p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading?"Creating Account...":"Create Account"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;