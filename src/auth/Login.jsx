import { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Log in
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            className="w-full rounded-xl bg-gray-200 px-3 py-3 text-sm sm:text-base focus:bg-gray-600 focus:text-white outline-none transition-colors"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl bg-gray-200 px-3 py-3 text-sm sm:text-base focus:bg-gray-600 focus:text-white outline-none transition-colors"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-2 w-full py-2.5 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors text-sm sm:text-base"
          >
            Log in
          </button>
        </form>

        <div className="mt-4 text-center text-xs sm:text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?
          </span>{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-sky-600 hover:text-sky-700 font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
