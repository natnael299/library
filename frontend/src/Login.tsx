import { LoginForm } from "./components/login-form";
import api from "./api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <LoginForm
        onLogin={(email: string, password: string) => {
          api
            .post("/login", {
              email,
              password,
            })
            .then((res) => {
              if (res.status == 200) {
                if (res.data.role === "user") navigate("/");
                else navigate("/dashboard");
              } else {
                setError("Login valid please try again!!");
              }
            });
        }}
        error={error}
      />
    </div>
  );
}

export default Login;
