import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/account" element={<Account/>} />
      </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
