import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Upload, MapPin } from "lucide-react";

const ServiceProviderRegister = () => {
  return (
    <div className="min-h-screen bg-background p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-primary p-3 rounded-lg">
              <span className="text-2xl">👑</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Body Care</h1>
          </Link>
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg mb-8">
            <Building className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">انضم إلى شبكتنا</h2>
            <p className="text-lg text-white/90">سجل صالونك أو مركزك واستقبل المزيد من العملاء</p>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="card-elevated p-8">
          <form className="space-y-8">
            {/* Business Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground">معلومات المنشأة</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-right">
                    اسم المنشأة *
                  </Label>
                  <Input 
                    id="businessName"
                    type="text" 
                    placeholder="اسم الصالون أو المركز"
                    className="text-right"
                    dir="rtl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-right">نوع الخدمة *</Label>
                  <Select dir="rtl" required>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الخدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beauty-salon">صالون تجميل نسائي</SelectItem>
                      <SelectItem value="men-salon">صالون رجالي</SelectItem>
                      <SelectItem value="spa">مركز سبا</SelectItem>
                      <SelectItem value="medical-clinic">عيادة تجميل طبية</SelectItem>
                      <SelectItem value="mixed">مختلط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="text-right">
                    وصف المنشأة *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="وصف مختصر عن خدماتكم والمميزات التي تقدمونها..."
                    className="text-right min-h-[100px] resize-none"
                    dir="rtl"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground">معلومات الاتصال</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right">
                    البريد الإلكتروني *
                  </Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="info@business.com"
                    className="text-right"
                    dir="rtl"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-right">
                    العنوان الكامل *
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="العنوان التفصيلي للمنشأة مع المعالم القريبة..."
                    className="text-right min-h-[80px] resize-none"
                    dir="rtl"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground">ساعات العمل</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weekdayHours" className="text-right">
                    الأحد - الخميس
                  </Label>
                  <Input 
                    id="weekdayHours"
                    type="text" 
                    placeholder="9:00 ص - 9:00 م"
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekendHours" className="text-right">
                    الجمعة - السبت
                  </Label>
                  <Input 
                    id="weekendHours"
                    type="text" 
                    placeholder="10:00 ص - 8:00 م"
                    className="text-right"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Services Offered */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground">الخدمات المقدمة</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "قص الشعر",
                  "صبغ الشعر",
                  "تصفيف الشعر",
                  "عناية بالبشرة",
                  "مكياج",
                  "تدليك",
                  "علاج بالليزر",
                  "حلاقة",
                  "عناية باليدين",
                  "عناية بالقدمين",
                  "إزالة الشعر",
                  "خدمات أخرى"
                ].map((service) => (
                  <label key={service} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Documents Upload */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground">الوثائق المطلوبة</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-right">رخصة المهنة</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">اضغط لرفع الملف أو اسحب الملف هنا</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-right">صور المكان</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">يمكنك رفع عدة صور</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="border-t pt-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" className="rounded" required />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    أوافق على <Link to="/terms" className="text-primary hover:underline">الشروط والأحكام</Link> وسياسة الخصوصية
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="marketing" className="rounded" />
                  <Label htmlFor="marketing" className="text-sm text-muted-foreground">
                    أوافق على تلقي رسائل تسويقية وإشعارات حول الخدمات الجديدة
                  </Label>
                </div>

                <div className="flex gap-4">
                  <Button className="btn-gradient flex-1 h-12 font-medium">
                    <Building className="ml-2 h-4 w-4" />
                    تسجيل المنشأة
                  </Button>
                  <Link to="/">
                    <Button variant="outline" className="h-12 px-8">
                      إلغاء
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Card>

        {/* Additional Info */}
        <Card className="card-elevated p-6 mt-6 bg-accent/50">
          <div className="text-center">
            <h3 className="font-bold mb-2">ماذا بعد التسجيل؟</h3>
            <p className="text-sm text-muted-foreground">
              سيتم مراجعة طلبكم من قبل فريقنا خلال 24-48 ساعة، وسنتواصل معكم عبر الهاتف أو البريد الإلكتروني لتأكيد التفاصيل.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ServiceProviderRegister;