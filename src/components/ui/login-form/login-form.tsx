import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, PrimaryButton, FeedbackModal } from "@/components/ui";
import { useAuth } from "@/services";

export function LoginForm() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const handleLogin = async () => {
    const usernameEmpty = !username.trim();
    const passwordEmpty = !password.trim();

    if (usernameEmpty || passwordEmpty) {
      setErrors({
        username: usernameEmpty,
        password: passwordEmpty,
      });

      setTimeout(() => {
        setErrors({ username: false, password: false });
      }, 500);
      return;
    }

    try {
      setError("");
      await login({ username, password });
      setUsername("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-10">
      <InputField
        label="Username"
        type="text"
        value={username}
        isInvalid={errors.username}
        onChange={(val) => {
          setUsername(val);
          if (errors.username) setErrors((prev) => ({ ...prev, username: false }));
        }}
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        isInvalid={errors.password}
        onChange={(val) => {
          setPassword(val);
          if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
        }}
      />

      <div className="flex flex-col justify-center items-center gap-1">
        <PrimaryButton
          className="text-base w-fit py-1"
          onClick={handleLogin}
          isDisabled={loading}>
          Log in
        </PrimaryButton>

        <PrimaryButton
          className="text-base"
          border={false}
          onClick={() => navigate("/register")}
        >
          Register
        </PrimaryButton>
      </div>

      <FeedbackModal
        isLoading={loading}
        isOpen={loading || !!error}
        type={error.includes("Too many requests") ? "timedOut" : "error"}
        message={error}
        onClose={() => setError("")}
      />
    </div>
  );
}