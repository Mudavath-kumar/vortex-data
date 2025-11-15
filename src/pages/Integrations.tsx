import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Integrations = () => {
  const integrations = [
    {
      name: "Salesforce",
      category: "CRM",
      description: "Sync customer data and track sales pipeline performance in real-time.",
      features: ["Bi-directional sync", "Custom fields", "Automated workflows"],
      gradient: "from-[#00A1E0] to-[#0070D2]"
    },
    {
      name: "HubSpot",
      category: "Marketing",
      description: "Connect marketing campaigns with analytics for better ROI tracking.",
      features: ["Lead tracking", "Campaign analytics", "Email integration"],
      gradient: "from-[#FF7A59] to-[#FF5C35]"
    },
    {
      name: "Slack",
      category: "Communication",
      description: "Get real-time notifications and insights delivered to your team channels.",
      features: ["Smart notifications", "Custom alerts", "Team collaboration"],
      gradient: "from-[#611F69] to-[#4A154B]"
    },
    {
      name: "Google Analytics",
      category: "Analytics",
      description: "Combine web analytics with business data for complete visibility.",
      features: ["Traffic insights", "Conversion tracking", "Audience data"],
      gradient: "from-[#FFA000] to-[#F57C00]"
    },
    {
      name: "Shopify",
      category: "E-commerce",
      description: "Track store performance, inventory, and customer behavior seamlessly.",
      features: ["Order tracking", "Inventory sync", "Customer insights"],
      gradient: "from-[#95BF47] to-[#7AB55C]"
    },
    {
      name: "Stripe",
      category: "Payments",
      description: "Monitor payment flows, revenue, and financial metrics in one place.",
      features: ["Payment analytics", "Revenue tracking", "Churn analysis"],
      gradient: "from-[#635BFF] to-[#5469D4]"
    },
    {
      name: "Zendesk",
      category: "Support",
      description: "Analyze customer support metrics and improve service quality.",
      features: ["Ticket tracking", "Response times", "Customer satisfaction"],
      gradient: "from-[#03363D] to-[#017374]"
    },
    {
      name: "Jira",
      category: "Project Management",
      description: "Track project progress and team productivity with detailed insights.",
      features: ["Sprint analytics", "Team velocity", "Issue tracking"],
      gradient: "from-[#0052CC] to-[#2684FF]"
    },
    {
      name: "Microsoft Teams",
      category: "Communication",
      description: "Share reports and insights directly within your team conversations.",
      features: ["Report sharing", "Bot commands", "Team updates"],
      gradient: "from-[#5059C9] to-[#464EB8]"
    },
    {
      name: "Mailchimp",
      category: "Email Marketing",
      description: "Analyze email campaign performance and audience engagement.",
      features: ["Campaign analytics", "Audience insights", "A/B testing"],
      gradient: "from-[#FFE01B] to-[#F8C903]"
    },
    {
      name: "QuickBooks",
      category: "Accounting",
      description: "Connect financial data for comprehensive business intelligence.",
      features: ["Financial reports", "Expense tracking", "Revenue analysis"],
      gradient: "from-[#2CA01C] to-[#228B15]"
    },
    {
      name: "Asana",
      category: "Project Management",
      description: "Monitor project timelines and team productivity metrics.",
      features: ["Task tracking", "Project analytics", "Team performance"],
      gradient: "from-[#F06A6A] to-[#E74747]"
    }
  ];

  const categories = ["All", "CRM", "Marketing", "Communication", "Analytics", "E-commerce", "Payments"];

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
            <Badge className="mb-4 neon-glow">Integrations</Badge>
            <h1 className="text-6xl font-bold mb-4 gradient-text">Connect Your Tools</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seamlessly integrate with your favorite tools and platforms. One-click setup, automatic syncing.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "neon-glow" : ""}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="glass-strong p-6 h-full border-border/50 hover:neon-glow transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${integration.gradient} flex items-center justify-center mb-4 text-white font-bold text-xl`}>
                    {integration.name.charAt(0)}
                  </div>
                  
                  <div className="mb-3">
                    <Badge variant="secondary" className="mb-2">{integration.category}</Badge>
                    <h3 className="text-xl font-bold">{integration.name}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{integration.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {integration.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" className="w-full group" asChild>
                    <Link to="/contact">
                      Connect
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Custom Integration CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-strong p-12 text-center border-border/50">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 neon-glow">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-4xl font-bold mb-4 gradient-text">Need a Custom Integration?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our Enterprise plan includes custom integrations tailored to your specific needs. Let's build something amazing together.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="neon-glow">
                    Contact Sales
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline">
                    View Plans
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

export default Integrations;