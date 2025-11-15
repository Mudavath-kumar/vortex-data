import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Award, Target, Heart, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Countries", value: "120+", icon: Globe },
    { label: "Data Points", value: "1B+", icon: TrendingUp },
    { label: "Uptime", value: "99.9%", icon: Award }
  ];

  const testimonials = [
    {
      quote: "Vortex Analytics transformed how we understand our sales data. The insights are incredible and actionable!",
      author: "Sarah Johnson",
      role: "CEO, TechCorp",
      company: "TechCorp Inc."
    },
    {
      quote: "The real-time dashboards and predictive analytics have been game-changing for our quarterly planning.",
      author: "Michael Chen",
      role: "VP Sales, InnovateCo",
      company: "InnovateCo"
    },
    {
      quote: "Best analytics platform we've used. The team collaboration features are outstanding and intuitive.",
      author: "Emily Rodriguez",
      role: "Director of Analytics, DataFlow",
      company: "DataFlow Systems"
    },
    {
      quote: "Switched from our previous solution and never looked back. The ROI was clear within the first month.",
      author: "James Wilson",
      role: "CFO, GrowthHub",
      company: "GrowthHub"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description: "We constantly push boundaries to deliver cutting-edge analytics solutions."
    },
    {
      icon: Heart,
      title: "Customer Success",
      description: "Your success is our success. We're committed to helping you achieve your goals."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "We believe in the power of teamwork and building strong relationships."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from product to support."
    }
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
            <Badge className="mb-4 neon-glow">About Us</Badge>
            <h1 className="text-6xl font-bold mb-4 gradient-text">Empowering Data-Driven Decisions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make powerful analytics accessible to businesses of all sizes,
              helping them unlock insights that drive growth and innovation.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-20"
          >
            <Card className="glass-strong p-12 border-border/50">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Trusted by Industry Leaders</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05, duration: 0.4 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 neon-glow">
                      <stat.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="glass-strong p-6 text-center h-full border-border/50 hover:neon-glow transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 neon-glow">
                      <value.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="glass-strong p-8 h-full border-border/50 hover:neon-glow-accent transition-all duration-300">
                    <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="glass-strong p-12 text-center border-border/50">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Join Thousands of Happy Customers</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your journey with Vortex Analytics today and transform how you work with data
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="neon-glow">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Talk to Sales
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

export default About;