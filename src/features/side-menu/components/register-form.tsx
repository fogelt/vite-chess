import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, PrimaryButton, FeedbackModal } from "@/components/ui";
import { useAuth } from "@/services";

export function RegisterForm() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Track API errors for the modal

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleRegister = async () => {
    const newErrors = {
      username: !form.username.trim(),
      email: !form.email.trim(),
      password: !form.password.trim(),
    };

    setErrors(newErrors);

    // If any field is empty, trigger the shake and stop
    if (Object.values(newErrors).some(isError => isError)) {
      // Reset the errors after 500ms to allow for repeated shake animations
      setTimeout(() => {
        setErrors({ username: false, email: false, password: false });
      }, 500);
      return;
    }

    try {
      setError("");
      await register(form);
      // Registration successful is often a good time for a success modal, 
      // but for now, we'll navigate back to login as requested.
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <InputField
        label="Username"
        value={form.username}
        isInvalid={errors.username}
        onChange={(val) => updateField("username", val)}
      />

      <InputField
        label="Email"
        type="text"
        value={form.email}
        isInvalid={errors.email}
        onChange={(val) => updateField("email", val)}
      />

      <InputField
        label="Password"
        type="password"
        value={form.password}
        isInvalid={errors.password}
        onChange={(val) => updateField("password", val)}
      />

      <div className="flex flex-col gap-3 mt-4">
        <PrimaryButton onClick={handleRegister}>
          {loading ? "Creating..." : "Sign Up"}
        </PrimaryButton>

        <button
          onClick={() => navigate("/")}
          className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          Already have an account? Log in
        </button>
      </div>

      {/* Reusing the FeedbackModal for a consistent brand feel */}
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