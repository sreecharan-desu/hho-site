"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
    
    if (result.success) {
      localStorage.setItem("token", result.token);
      router.push("/admin/dashboard");
    } else {
      setError(result.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-50 to-blue-50 p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        // @ts-ignore
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Admin Sign In
        </h2>
        {error && (
          <motion.p
            className="text-red-500 text-center mb-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {error}
          </motion.p>
        )}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Lock className="w-4 h-4" /> Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>
          <div className="text-right">
            <a
              href="/admin/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Forgot Password?
            </a>
          </div>
          <motion.button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-all"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}