import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary p-3 rounded-lg">
              <span className="text-2xl">👑</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Body Care</h1>
          </Link>
          <p className="text-muted-foreground">إنشاء حساب جديد</p>
        </div>

        {/* Register Form */}
        <Card className="card-elevated p-8">
          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-right">
                  الاسم الأخير *
                </Label>
                <Input 
                  id="lastName"
                  type="text" 
                  placeholder="الاسم الأخير"
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-right">
                  الاسم الأول *
                </Label>
                <Input 
                  id="firstName"
                  type="text" 
                  placeholder="الاسم الأول"
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right">
                البريد الإلكتروني *
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

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-right">
                رقم الهاتف *
              </Label>
              <Input 
                id="phone"
                type="tel" 
                placeholder="07xxxxxxxx"
                className="text-right font-mono"
                dir="rtl"
                required
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-right">
                  تأكيد كلمة المرور *
                </Label>
                <Input 
                  id="confirmPassword"
                  type="password" 
                  placeholder="تأكيد كلمة المرور"
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-right">
                  كلمة المرور *
                </Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="كلمة المرور"
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Birth Date and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-right">الجنس *</Label>
                <Select dir="rtl" required>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الجنس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-right">
                  تاريخ الميلاد *
                </Label>
                <Input 
                  id="birthDate"
                  type="date" 
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="rounded" required />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                أوافق على <Link to="/terms" className="text-primary hover:underline">الشروط والأحكام</Link>
              </Label>
            </div>

            <Button className="btn-gradient w-full h-12 font-medium">
              إنشاء حساب
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;