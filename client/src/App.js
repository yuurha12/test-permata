import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";

//page
import Home from "./pages/Home";
import Landing from "./pages/Landing";

//context
import { UserContext } from "./components/contexts/UserContexts";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate()

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  useEffect(() => {
    if (state.isLogin === false && isLoading) {
      navigate("/")
    }else {
        navigate("/home");
      } 
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/checkAuth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
      <Routes>
          <Route path='/home' element={<Home />} />
          <Route exact path="/" element={<Landing />} />
      </Routes>
  );
}

export default App;
