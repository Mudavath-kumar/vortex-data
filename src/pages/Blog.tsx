import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, TrendingUp, Users, Zap } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "10 Tips for Better Data Analytics",
      excerpt: "Learn how to extract meaningful insights from your data with these proven strategies.",
      category: "Analytics",
      date: "Nov 10, 2025",
      readTime: "5 min read",
      gradient: "from-primary to-accent",
      icon: TrendingUp
    },
    {
      title: "Building High-Performance Teams",
      excerpt: "Discover the secrets to creating and maintaining productive, engaged teams.",
      category: "Team",
      date: "Nov 8, 2025",
      readTime: "7 min read",
      gradient: "from-accent to-secondary",
      icon: Users
    },
    {
      title: "The Future of Business Intelligence",
      excerpt: "Explore emerging trends and technologies shaping the future of BI.",
      category: "Technology",
      date: "Nov 5, 2025",
      readTime: "6 min read",
      gradient: "from-secondary to-primary",
      icon: Zap
    },
    {
      title: "Maximizing ROI with Analytics",
      excerpt: "Practical strategies for getting the most value from your analytics investment.",
      category: "Business",
      date: "Nov 2, 2025",
      readTime: "4 min read",
      gradient: "from-primary to-secondary",
      icon: TrendingUp
    },
    {
      title: "Data-Driven Decision Making",
      excerpt: "Transform your organization with evidence-based decision-making processes.",
      category: "Strategy",
      date: "Oct 30, 2025",
      readTime: "8 min read",
      gradient: "from-accent to-primary",
      icon: Zap
    },
    {
      title: "Scaling Your Analytics Infrastructure",
      excerpt: "Best practices for growing your analytics capabilities as your business expands.",
      category: "Infrastructure",
      date: "Oct 28, 2025",
      readTime: "6 min read",
      gradient: "from-secondary to-accent",
      icon: Users
    }
  ];

  const categories = ["All", "Analytics", "Team", "Technology", "Business", "Strategy", "Infrastructure"];

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
            className="text-center mb-12"
          >
            <Badge className="mb-4 neon-glow">Our Blog</Badge>
            <h1 className="text-6xl font-bold mb-4 gradient-text">Latest Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and best practices in analytics and business intelligence
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

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="glass-strong h-full flex flex-col border-border/50 hover:neon-glow transition-all duration-300">
                  <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center rounded-t-lg`}>
                    <post.icon className="w-16 h-16 text-primary-foreground opacity-50" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <Card className="glass-strong p-12 text-center border-border/50">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Get the latest insights delivered straight to your inbox. No spam, unsubscribe anytime.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg glass border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="lg" className="neon-glow">
                  Subscribe
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Blog;