import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Brain,
  Home,
  Phone,
  MessageCircle as WhatsApp,
  Heart, 
  Calendar, 
  BookOpen, 
  Users, 
  Timer,
  Menu,
  LogIn,
  Gamepad2,
  MapPin,
  ClipboardCheck,
  Info,
  User,
  IndianRupee,
  Languages
} from "lucide-react";

const navItems = [
  { name: "nav.home", href: "/", icon: Home },
  { name: "nav.mood", href: "/mood", icon: Heart },
  { name: "nav.ai", href: "/ai-chat", icon: WhatsApp },
  { name: "nav.booking", href: "/booking", icon: Calendar },
  { name: "nav.resources", href: "/resources", icon: BookOpen },
  { name: "nav.community", href: "/community", icon: Users },
  { name: "nav.pomodoro", href: "/pomodoro", icon: Timer },
  { name: "nav.journal", href: "/journal", icon: BookOpen },
  { name: "nav.activities", href: "/activities", icon: Gamepad2 },
  { name: "nav.local", href: "/local-support", icon: MapPin },
  { name: "nav.assessment", href: "/assessment", icon: ClipboardCheck },
  { name: "nav.donation", href: "/donation", icon: IndianRupee },
  { name: "nav.about", href: "/about", icon: Info },
  { name: "nav.profile", href: "/profile", icon: User },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Hamburger Menu and Logo */}
          <div className="flex items-center space-x-3">
            {/* Hamburger Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-primary/10 transition-colors duration-200"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 flex flex-col p-0">
                <div className="p-6 border-b border-border">
                <div className="text-lg font-semibold text-foreground">{t('common.navigation')}</div>
                <p className="text-sm text-muted-foreground mt-1">{language === 'hindi' ? 'आपकी कल्याण यात्रा यहां शुरू होती है' : 'Your wellness journey starts here'}</p>
                </div>
                <ScrollArea className="flex-1 px-2 pb-6">
                  <div className="flex flex-col space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 p-3 mx-2 rounded-lg transition-all duration-200",
                            isActive 
                              ? "bg-primary/10 text-primary border border-primary/20" 
                              : "hover:bg-muted/50 text-foreground"
                          )}
                        >
                          <Icon className={cn(
                            "h-5 w-5", 
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          )} />
                          <span className={cn(
                            "text-sm font-medium", 
                            isActive ? 'text-primary font-semibold' : 'text-foreground'
                          )}>
                            {t(item.name)}
                          </span>
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Brain className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                MindMatters
              </span>
            </Link>
          </div>

          {/* Right: Sign In, Language, Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            {/* Sign In Button */}
            <Link to="/signin">
                <Button
                variant="default"
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {t('nav.signin')}
              </Button>
            </Link>
            
            {/* Language Dropdown */}
            <Select value={language} onValueChange={(value) => setLanguage(value as 'english' | 'hindi')}>
              <SelectTrigger className="w-32 h-9 border-border bg-background/50 backdrop-blur-sm">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="english">{t('common.english')}</SelectItem>
                <SelectItem value="hindi">{t('common.hindi')}</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;