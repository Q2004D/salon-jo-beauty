import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
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
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right">
                  البريد الإلكتروني
                </Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="أدخل بريدك الإلكتروني"
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-right">
                  كلمة المرور
                </Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="أدخل كلمة المرور"
                  className="text-right"
                  dir="rtl"
                  required
                />
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

            <Button className="btn-gradient w-full h-12 font-medium">
              تسجيل الدخول
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