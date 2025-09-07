import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: "", password: "" });

    // Basic validation
    let hasErrors = false;
    if (!email) {
      setErrors(prev => ({ ...prev, email: "البريد الإلكتروني مطلوب" }));
      hasErrors = true;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, password: "كلمة المرور مطلوبة" }));
      hasErrors = true;
    }

    if (!hasErrors) {
      // Simulate API call
      setTimeout(() => {
        console.log("Login attempt:", { email, password });
        setIsLoading(false);
        // Here you would integrate with your PHP API
        // For now, just show success or error
        if (email === "admin@example.com" && password === "password") {
          window.location.href = "/admin";
        } else {
          setErrors({ email: "", password: "بيانات الدخول غير صحيحة" });
        }
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary p-3 rounded-lg">
              <span className="text-2xl">👑</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Body Care</h1>
          </div>
          <p className="text-muted-foreground">مرحباً بك مرة أخرى</p>
        </div>

        {/* Login Form */}
        <Card className="card-elevated p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right">
                  البريد الإلكتروني
                </Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="أدخل بريدك الإلكتروني"
                  className={`text-right ${errors.email ? 'border-red-500' : ''}`}
                  dir="rtl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500 text-right">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-right">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    className={`text-right pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    dir="rtl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 text-right">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link 
                to="/forgot-password" 
                className="text-primary hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-muted-foreground">تذكرني</span>
              </label>
            </div>

            <Button 
              type="submit" 
              className="btn-gradient w-full h-12 font-medium" 
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              ليس لديك حساب؟{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </Card>

        {/* Alternative Login */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm mb-4">أو تسجيل الدخول باستخدام</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="flex-1">
              <span className="ml-2">📱</span>
              Google
            </Button>
            <Button variant="outline" className="flex-1">
              <span className="ml-2">📘</span>
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;