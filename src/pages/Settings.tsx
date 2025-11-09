import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Shield, Database, Palette } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your dashboard preferences</p>
          </div>

          <div className="glass-strong rounded-3xl p-8 space-y-8">
            {/* Appearance */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Appearance</h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </div>

            <Separator />

            {/* Notifications */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email updates</p>
                  </div>
                  <Switch id="email-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notif">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                  </div>
                  <Switch id="push-notif" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            {/* Account */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <SettingsIcon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Account</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Admin User" className="rounded-xl mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@vortex.com" className="rounded-xl mt-2" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Data */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Data Management</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                  </div>
                  <Switch id="auto-refresh" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cache">Enable Caching</Label>
                    <p className="text-sm text-muted-foreground">Cache data for better performance</p>
                  </div>
                  <Switch id="cache" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            {/* Security */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch id="2fa" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <Button variant="secondary" className="rounded-xl">Cancel</Button>
              <Button className="rounded-xl neon-glow">Save Changes</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
