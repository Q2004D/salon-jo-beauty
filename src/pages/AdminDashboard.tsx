import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building, 
  Calendar,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  // Sample data
  const stats = [
    { title: "إجمالي المستخدمين", value: "1,234", icon: Users, color: "text-blue-600", change: "+12%" },
    { title: "مقدمي الخدمة", value: "89", icon: Building, color: "text-green-600", change: "+5%" },
    { title: "الحجوزات اليوم", value: "45", icon: Calendar, color: "text-purple-600", change: "+18%" },
    { title: "الإيرادات الشهرية", value: "15,670 د.أ", icon: TrendingUp, color: "text-orange-600", change: "+25%" }
  ];

  const recentUsers = [
    { id: 1, name: "أحمد محمد", email: "ahmed@example.com", phone: "0791234567", joinDate: "2024-01-15", status: "نشط" },
    { id: 2, name: "فاطمة علي", email: "fatima@example.com", phone: "0791234568", joinDate: "2024-01-14", status: "نشط" },
    { id: 3, name: "محمد حسن", email: "mohammed@example.com", phone: "0791234569", joinDate: "2024-01-13", status: "معلق" },
    { id: 4, name: "سارة أحمد", email: "sara@example.com", phone: "0791234570", joinDate: "2024-01-12", status: "نشط" }
  ];

  const recentServices = [
    { id: 1, name: "صالون الجمال الملكي", provider: "منى عبدالله", category: "صالون نسائي", status: "مفعل", rating: 4.8 },
    { id: 2, name: "عيادة النور للتجميل", provider: "د. سمير احمد", category: "عيادة تجميل", status: "قيد المراجعة", rating: 4.9 },
    { id: 3, name: "مركز الأناقة للرجال", provider: "خالد محمد", category: "صالون رجالي", status: "مفعل", rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">لوحة تحكم الأدمن</h1>
                <p className="text-muted-foreground">مرحباً بك في لوحة التحكم الإدارية</p>
              </div>
              <div className="flex gap-3">
                <Button className="btn-gradient">
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة جديد
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="card-elevated p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className={`p-3 rounded-lg bg-accent`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card className="card-elevated p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">المستخدمون الجدد</h2>
                  <Button variant="outline" size="sm">
                    <Eye className="ml-2 h-4 w-4" />
                    عرض الكل
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === "نشط" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Recent Services */}
              <Card className="card-elevated p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">الخدمات الحديثة</h2>
                  <Button variant="outline" size="sm">
                    <Eye className="ml-2 h-4 w-4" />
                    عرض الكل
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">اسم الخدمة</TableHead>
                      <TableHead className="text-right">المقدم</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-xs text-muted-foreground">{service.category}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{service.provider}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={service.status === "مفعل" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="destructive" size="icon" className="h-8 w-8">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="card-elevated p-6 mt-6">
              <h2 className="text-xl font-bold mb-6">إجراءات سريعة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>إدارة المستخدمين</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Building className="h-6 w-6" />
                  <span>إدارة الخدمات</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>إدارة الحجوزات</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>التقارير والإحصائيات</span>
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;