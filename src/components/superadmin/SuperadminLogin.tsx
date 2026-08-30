import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo-horizontal.png";

export function SuperadminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    navigate({ to: "/superadmin" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[oklch(0.93_0.01_250)] px-4">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 sm:p-8">
        <img
          src={logo}
          alt="MediSwift"
          className="mx-auto mb-5 h-14 w-52 object-contain"
          width={208}
          height={56}
        />
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Sign in</h1>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="superadmin-email" className="block text-[11px] font-medium text-ink">
              Work email
            </label>
            <input
              id="superadmin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@mediswift.in"
              autoComplete="email"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[12px] text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </div>
          <div>
            <label htmlFor="superadmin-password" className="block text-[11px] font-medium text-ink">
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                id="superadmin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-[12px] text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-soft hover:text-brand"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-[11px] font-medium text-ink">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-border accent-brand"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-[10px] font-medium text-brand hover:text-brand-dark"
              >
                Forgot password?
              </button>
            </div>
          </div>
          {error && <p className="text-[11px] text-destructive">{error}</p>}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-[12px] font-semibold text-brand-foreground shadow-pill transition-colors hover:bg-brand-dark"
          >
            Sign in to dashboard
          </button>
        </form>
      </section>
    </main>
  );
}
