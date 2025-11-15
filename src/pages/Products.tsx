import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Zap, Shield, Rocket, Star, Check, TrendingUp, Users, Globe } from "lucide-react";

const Products = () => {
  const products = [
    {
      name: "Analytics Pro",
      tagline: "Advanced analytics for growth",
      price: "$49",
      period: "/month",
      icon: TrendingUp,
      gradient: "from-primary to-accent",
      features: [
        "Real-time data tracking",
        "Custom dashboards",
        "Advanced reporting",
        "API access",
        "Priority support",
        "Unlimited users"
      ],
      popular: true
    },
    {
      name: "Team Collaboration",
      tagline: "Work together seamlessly",
      price: "$99",
      period: "/month",
      icon: Users,
      gradient: "from-accent to-secondary",
      features: [
        "Team workspaces",
        "Role-based access",
        "Activity tracking",
        "Video conferencing",
        "File sharing",
        "Integration hub"
      ],
      popular: false
    },
    {
      name: "Enterprise Suite",
      tagline: "Scale without limits",
      price: "$299",
      period: "/month",
      icon: Globe,
      gradient: "from-secondary to-primary",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security",
        "Custom training"
      ],
      popular: false
    }
  ];

  const benefits = [
    { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance" },
    { icon: Shield, title: "Secure & Safe", desc: "Enterprise-grade security" },
    { icon: Rocket, title: "Easy to Scale", desc: "Grows with your business" },
    { icon: Star, title: "Award Winning", desc: "Trusted by thousands" }
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
            <Badge className="mb-4 neon-glow">Our Products</Badge>
            <h1 className="text-6xl font-bold mb-4 gradient-text">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to help you grow your business faster
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative"
              >
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="neon-glow-accent">Most Popular</Badge>
                  </div>
                )}
                <Card className={`glass-strong p-8 h-full border-border/50 ${product.popular ? 'border-primary/50 neon-glow' : ''}`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 neon-glow`}>
                    <product.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-6">{product.tagline}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold gradient-text">{product.price}</span>
                    <span className="text-muted-foreground">{product.period}</span>
                  </div>
                  <Button className="w-full mb-6 neon-glow" size="lg">
                    Get Started
                  </Button>
                  <div className="space-y-3">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass p-6 text-center hover:neon-glow transition-all duration-300 border-border/50">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 neon-glow">
                      <benefit.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Products;