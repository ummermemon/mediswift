import React, { useState } from "react";
import {
  Card,
  TextField,
  Label,
  InputGroup,
  Checkbox,
  Button,
  Link,
  Separator,
  Chip,
} from "@heroui/react";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import logo from "../../assets/images/logo/horizontal/horizontal-erased.png";
import { useNavigate } from "react-router-dom";



export default function SuperadminLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/superadmin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save token
      localStorage.setItem("superadmin_token", data.token);

      // Save user
      localStorage.setItem(
        "superadmin",
        JSON.stringify(data.user)
      );

      // Redirect
      navigate("/superadmin/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00A896_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />

      {/* Main Login Card */}
      <Card className="w-full max-w-md shadow-xl border border-slate-100 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden p-0">

        {/* Card Header Section */}
        <div className="flex flex-col items-center pt-8 pb-4 px-8 text-center gap-3">
          <img
            src={logo}
            alt="MediSwift Logo"
            className="h-12 w-auto object-contain mb-1"
          />


          <div className="space-y-1">
            <h1 className="text-xl font-bold text-[#0B2545]">
              Sign in to your account
            </h1>
            <p className="text-xs text-slate-500">
              Enter your admin credentials to access platform oversight
            </p>
          </div>
        </div>

        {/* Card Body / Form Section */}
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField isRequired name="email" type="email">
              <Label className="text-xs font-semibold text-[#0B2545] mb-1.5 block uppercase tracking-wider">
                Email Address
              </Label>
              <InputGroup className="rounded-lg border-slate-200 focus-within:border-[#028090] focus-within:ring-1 focus-within:ring-[#028090]">
                <InputGroup.Prefix isDecorative>
                  <Mail size={18} className="text-slate-400 ml-1" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="admin@mediswift.com"
                  className="text-slate-800 placeholder:text-slate-400"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </InputGroup>
            </TextField>

            <TextField isRequired name="password" type={isVisible ? "text" : "password"}>
              <Label className="text-xs font-semibold text-[#0B2545] mb-1.5 block uppercase tracking-wider">
                Password
              </Label>
              <InputGroup className="rounded-lg border-slate-200 focus-within:border-[#028090] focus-within:ring-1 focus-within:ring-[#028090]">
                <InputGroup.Prefix isDecorative>
                  <Lock size={18} className="text-slate-400 ml-1" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="••••••••••••"
                  className="text-slate-800"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
                <InputGroup.Suffix>
                  <button
                    type="button"
                    onClick={() => setIsVisible((v) => !v)}
                    className="focus:outline-none text-slate-400 hover:text-slate-600 mr-1"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                  >
                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            <div className="flex items-center justify-between pt-1">
              <Checkbox
                id="remember-device"
                isSelected={form.remember}
                onChange={(v) => setForm((f) => ({ ...f, remember: v }))}
              >
                <Checkbox.Content className="text-xs font-medium text-[#0B2545]">
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  Remember this device
                </Checkbox.Content>
              </Checkbox>

              <Link
                href="#forgot-password"
                className="text-xs font-semibold text-[#028090] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              isPending={isSubmitting}
              className="bg-gradient-to-r from-[#0B2545] to-[#028090] hover:opacity-95 text-white font-semibold py-3 rounded-xl shadow-md transition-all mt-2 w-100"
            >
              {({ isPending }) => (
                <div className="flex items-center justify-center gap-2">
                  <span>{isPending ? "Authenticating..." : "Sign In"}</span>
                  {!isPending && <ArrowRight size={18} />}
                </div>
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}