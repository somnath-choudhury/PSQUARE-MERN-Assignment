import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserCircle } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { login, isAuthenticated, isLoading, error } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await login(email, password);
    }
  };

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="inside-auth-left">
          <div className="">
            <img
              src="dashboard.png"
              alt="Display Image"
              className="auth-image-container"
            />
          </div>
          <h4 className="text-white">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </h4>
          <p className="">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
            adipisci veniam magni doloremque similique eum suscipit porro ut.
            Minus, voluptatem.
          </p>
        </div>
      </div>

      <div className="auth-card-form">
        <div className="bg-white slide-in">
          <div className="auth-header">
            <div className="flex justify-center mb-4">
              <UserCircle size={48} className="text-primary" />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to your HR Management account
            </p>
          </div>

          {error && (
            <div className="bg-error-light bg-opacity-10 text-error p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-inner">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${errors.email ? "border-error" : ""}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${errors.password ? "border-error" : ""}`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-form-button"
                disabled={isLoading}
              >
                {isLoading ? <div className="spinner"></div> : "Sign In"}
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
