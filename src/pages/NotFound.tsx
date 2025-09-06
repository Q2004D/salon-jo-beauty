import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <Card className="card-elevated p-12 text-center max-w-md w-full">
        <div className="mb-6">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
          <p className="text-xl text-muted-foreground mb-4">عذراً! الصفحة غير موجودة</p>
          <p className="text-sm text-muted-foreground">
            لم نتمكن من العثور على الصفحة التي تبحث عنها
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="btn-gradient w-full" 
            onClick={() => window.location.href = '/'}
          >
            العودة للصفحة الرئيسية
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.history.back()}
          >
            العودة للصفحة السابقة
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
