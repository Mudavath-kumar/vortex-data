import { NavLink } from "@/components/NavLink";
import { Moon, Sun, Home, FileText, BarChart3, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

export const Navigation = () => {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/reports", label: "Reports", icon: FileText },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/team", label: "Team", icon: Users },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">Vortex Analytics</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="px-4 py-2 rounded-xl transition-all hover:bg-secondary/50"
                activeClassName="bg-secondary text-primary font-semibold neon-glow"
              >
                <item.icon className="w-4 h-4 inline mr-2" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
