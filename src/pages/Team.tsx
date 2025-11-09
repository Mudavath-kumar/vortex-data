import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github } from "lucide-react";

const Team = () => {
  const team = [
    { name: "Alex Morgan", role: "CEO & Founder", department: "Executive", initials: "AM" },
    { name: "Sarah Chen", role: "Head of Analytics", department: "Data Science", initials: "SC" },
    { name: "Marcus Reid", role: "Sales Director", department: "Sales", initials: "MR" },
    { name: "Emma Wilson", role: "Product Lead", department: "Product", initials: "EW" },
    { name: "James Park", role: "Engineering Lead", department: "Engineering", initials: "JP" },
    { name: "Sofia Rodriguez", role: "Marketing Director", department: "Marketing", initials: "SR" },
    { name: "David Kim", role: "Data Scientist", department: "Data Science", initials: "DK" },
    { name: "Lisa Zhang", role: "UX Designer", department: "Design", initials: "LZ" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">Our Team</h1>
            <p className="text-muted-foreground text-lg">Meet the people behind Vortex Analytics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-strong rounded-3xl p-6 text-center neon-glow cursor-pointer"
              >
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/50">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                <Badge className="mb-4">{member.department}</Badge>

                <div className="flex justify-center gap-3">
                  <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Github className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
