import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProductedRoute from "./components/ProductedRoute";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import NotFound from "./components/NotFound";
import JobDetailsItem from "./components/JobDetailsItem";

// Replace your code here
const App = () => (
  <>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route element={<ProductedRoute />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/jobs" element={<Jobs />} />
        <Route exact path="/jobs/:id" element={<JobDetailsItem />} />
      </Route>
      <Route component={NotFound} />
    </Routes>
  </>
);

export default App;
