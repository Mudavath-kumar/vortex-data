import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Target, Globe, Shield, TrendingUp, Users, Smartphone, Lock, BarChart3, Cloud, RefreshCw, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const mainFeatures = [
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Get instant insights with live data updates and real-time monitoring of your sales metrics.",
      details: ["Live dashboard updates", "Instant notifications", "Real-time collaboration", "Zero latency"],
      gradient: "from-primary to-accent"
    },
    {
      icon: Target,
      title: "Predictive Insights",
      description: "Leverage AI-powered predictions to forecast trends and make data-driven decisions.",
      details: ["ML-powered forecasting", "Trend analysis", "Smart recommendations", "Automated insights"],
      gradient: "from-accent to-secondary"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Track performance across multiple regions and markets with comprehensive global analytics.",
      details: ["Multi-region support", "Currency conversion", "Localization", "Global reporting"],
      gradient: "from-secondary to-primary"
    }
  ];

  const additionalFeatures = [
    { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and security protocols" },
    { icon: TrendingUp, title: "Advanced Analytics", description: "Deep dive into your data with custom reports" },
    { icon: Users, title: "Team Collaboration", description: "Work together seamlessly with your team" },
    { icon: Smartphone, title: "Mobile Friendly", description: "Access your data anywhere, anytime" },
    { icon: Lock, title: "Data Privacy", description: "GDPR & SOC2 compliant data handling" },
    { icon: BarChart3, title: "Custom Dashboards", description: "Build personalized views for your needs" },
    { icon: Cloud, title: "Cloud Native", description: "Scalable infrastructure that grows with you" },
    { icon: RefreshCw, title: "Auto Sync", description: "Automatic data synchronization across platforms" },
    { icon: Bell, title: "Smart Alerts", description: "Get notified about important changes instantly" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 neon-glow">Platform Features</Badge>
            <h1 className="text-6xl font-bold mb-4 gradient-text">Everything You Need</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features designed to help you analyze, understand, and grow your business with data-driven insights
            </p>
          </motion.div>

          {/* Main Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="glass-strong p-8 h-full border-border/50 hover:neon-glow transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 neon-glow`}>
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary neon-glow" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">And Much More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass p-6 text-center hover:neon-glow transition-all duration-300 border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 neon-glow">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-strong p-12 text-center border-border/50">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of companies already using Vortex Analytics to transform their business
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="neon-glow">
                    View Pricing
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Features;