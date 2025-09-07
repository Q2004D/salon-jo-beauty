import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = {
    length: formData.password.length >= 8,
    match: formData.password === formData.confirmPassword && formData.confirmPassword.length > 0
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "الاسم الأول مطلوب";
    if (!formData.lastName.trim()) newErrors.lastName = "الاسم الأخير مطلوب";
    if (!formData.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formData.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب";
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    if (formData.password.length < 8) newErrors.password = "كلمة المرور يجب أن تكون 8 خانات على الأقل";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمات المرور غير متطابقة";
    if (!formData.birthDate) newErrors.birthDate = "تاريخ الميلاد مطلوب";
    if (!formData.gender) newErrors.gender = "اختيار الجنس مطلوب";
    if (!formData.acceptTerms) newErrors.terms = "يجب الموافقة على الشروط والأحكام";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Registration data:", formData);
      setIsLoading(false);
      // Here you would integrate with your PHP API
      alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
      window.location.href = "/login";
    }, 1500);
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className={`text-right ${errors.lastName ? 'border-red-500' : ''}`}
                  dir="rtl"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 text-right">{errors.lastName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-right">
                  الاسم الأول *
                </Label>
                <Input 
                  id="firstName"
                  type="text" 
                  placeholder="الاسم الأول"
                  className={`text-right ${errors.firstName ? 'border-red-500' : ''}`}
                  dir="rtl"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 text-right">{errors.firstName}</p>
                )}
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
                className={`text-right ${errors.email ? 'border-red-500' : ''}`}
                dir="rtl"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500 text-right">{errors.email}</p>
              )}
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
                className={`text-right font-mono ${errors.phone ? 'border-red-500' : ''}`}
                dir="rtl"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
              {errors.phone && (
                <p className="text-sm text-red-500 text-right">{errors.phone}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-right">
                  تأكيد كلمة المرور *
                </Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="تأكيد كلمة المرور"
                    className={`text-right pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    dir="rtl"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 text-right">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-right">
                  كلمة المرور *
                </Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة المرور"
                    className={`text-right pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    dir="rtl"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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

            {/* Password Requirements */}
            {formData.password && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-right">متطلبات كلمة المرور:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 justify-end">
                    <span className={`text-sm ${passwordRequirements.length ? 'text-green-600' : 'text-muted-foreground'}`}>
                      8 خانات على الأقل
                    </span>
                    <CheckCircle className={`h-4 w-4 ${passwordRequirements.length ? 'text-green-600' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <span className={`text-sm ${passwordRequirements.match ? 'text-green-600' : 'text-muted-foreground'}`}>
                      كلمات المرور متطابقة
                    </span>
                    <CheckCircle className={`h-4 w-4 ${passwordRequirements.match ? 'text-green-600' : 'text-muted-foreground'}`} />
                  </div>
                </div>
              </div>
            )}

            {/* Birth Date and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-right">الجنس *</Label>
                <Select 
                  dir="rtl" 
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  required
                >
                  <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر الجنس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-red-500 text-right">{errors.gender}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-right">
                  تاريخ الميلاد *
                </Label>
                <Input 
                  id="birthDate"
                  type="date" 
                  className={`text-right ${errors.birthDate ? 'border-red-500' : ''}`}
                  dir="rtl"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  required
                />
                {errors.birthDate && (
                  <p className="text-sm text-red-500 text-right">{errors.birthDate}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="rounded" 
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  required 
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  أوافق على <Link to="/terms" className="text-primary hover:underline">الشروط والأحكام</Link>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500 text-right">{errors.terms}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="btn-gradient w-full h-12 font-medium" 
              disabled={isLoading || !passwordRequirements.length || !passwordRequirements.match}
            >
              {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
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