import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./sections/user_pages/Home";
import Dashboard from "./sections/admin_pages/Dashboard";
import UserLayout from "./layouts/UserLayout";
import Profile from "./sections/user_pages/Profile";
import Loans from "./sections/user_pages/Loans";
import ProtectedRoute from "./ProtectedRoute";
import Action from "./sections/admin_pages/Action";
import User from "./sections/admin_pages/User";
import AdminProfile from "./sections/admin_pages/AdminProfile";
import LoanBook from "./sections/admin_pages/LoanBook";
import AdminLayout from "./layouts/AdminLayout";
import CreateBook from "./sections/admin_pages/CreateBook";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        {/** the user side */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/** the admin side */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/action/:role" element={<Action />} />
          <Route path="/ind/:id/:role" element={<User />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/loanbook/:id" element={<LoanBook />} />
          <Route path="/addBook/:type" element={<CreateBook />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
