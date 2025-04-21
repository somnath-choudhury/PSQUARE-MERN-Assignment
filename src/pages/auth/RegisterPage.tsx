import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserCircle } from "lucide-react";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { register, isAuthenticated, isLoading, error } = useAuth();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await register(name, email, password);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="inside-auth-left">
          <img
            src="dashboard.png"
            alt="Display Image"
            className="auth-image-container"
          />
          <h4 className="text-white">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </h4>
          <p>
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
            <h1 className="auth-title">Create an Account</h1>
            <p className="auth-subtitle">Sign up for HR Management System</p>
          </div>

          {error && (
            <div className="bg-error-light bg-opacity-10 text-error p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-inner">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${errors.name ? "border-error" : ""}`}
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${
                    errors.email ? "border-error" : ""
                  }`}
                  placeholder="Email Address"
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
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${errors.confirmPassword ? "border-error" : ""}`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-form-button"
                disabled={isLoading}
              >
                {isLoading ? <div className="spinner"></div> : "Register"}
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
