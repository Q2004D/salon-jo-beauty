import { Star, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  description: string;
  address: string;
  phone: string;
  distance: string;
  category: string;
}

const ServiceCard = ({ 
  name, 
  rating, 
  reviewCount, 
  description, 
  address, 
  phone, 
  distance,
  category 
}: ServiceCardProps) => {
  // Generate a simple ID for the service based on the name
  const serviceId = name.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <Card className="card-elevated p-6 hover:shadow-xl transition-all duration-300">
      <div className="space-y-4">
        {/* Header with rating */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              ({reviewCount}) {rating}
            </Badge>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Service Name */}
        <div>
          <Link to={`/service/${serviceId}`}>
            <h3 className="text-lg font-bold text-foreground mb-1 hover:text-primary cursor-pointer">
              {name}
            </h3>
          </Link>
          <Badge variant="outline" className="text-xs mb-2">
            {category}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span className="font-mono">{phone}</span>
          </div>
        </div>

        {/* Distance */}
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="text-xs">
            🏃‍♂️ {distance} كم من موقعك
          </Badge>
          <span className="text-xs text-muted-foreground">0</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-primary border-primary hover:bg-primary hover:text-white"
          >
            عيادة تجميل
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-primary border-primary hover:bg-primary hover:text-white"
          >
            صالون رجالي
          </Button>
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-2">
          <Link to={`/service/${serviceId}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs">
              اضغط للتفاصيل
            </Button>
          </Link>
          <Button className="btn-gradient flex-1">
            صالون نسائي
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;