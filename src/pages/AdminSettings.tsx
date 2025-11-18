import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { ArrowLeft, Save, Mail } from "lucide-react";

interface AdminSetting {
  setting_key: string;
  setting_value: string;
}

const AdminSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    checkAdminAndFetchSettings();
  }, [user, navigate]);

  const checkAdminAndFetchSettings = async () => {
    const { data, error } = await supabase.rpc('is_admin');
    
    if (error || !data) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/dashboard");
      return;
    }

    setIsAdmin(data);
    if (data) {
      await fetchSettings();
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("*")
        .eq("setting_key", "notification_email")
        .single();

      if (error) throw error;

      if (data) {
        setNotificationEmail(data.setting_value);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!notificationEmail) {
      toast.error("Notification email is required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(notificationEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("admin_settings")
        .update({ setting_value: notificationEmail })
        .eq("setting_key", "notification_email");

      if (error) throw error;

      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/orders")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure system-wide settings and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure email addresses for system notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification-email">Admin Notification Email</Label>
              <Input
                id="notification-email"
                type="email"
                placeholder="admin@healinton.com"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                className="max-w-md"
              />
              <p className="text-sm text-muted-foreground">
                This email will receive notifications for new orders and bookings
              </p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleSaveSettings} 
                disabled={saving}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Resend Email Setup</CardTitle>
            <CardDescription>
              Instructions for configuring email notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <p className="font-medium">To receive email notifications, complete these steps:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  Sign up for a free account at{" "}
                  <a 
                    href="https://resend.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    resend.com
                  </a>
                </li>
                <li>
                  Verify your domain at{" "}
                  <a 
                    href="https://resend.com/domains" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    resend.com/domains
                  </a>
                  {" "}(required to send emails)
                </li>
                <li>
                  Create an API key at{" "}
                  <a 
                    href="https://resend.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    resend.com/api-keys
                  </a>
                </li>
                <li>
                  Add the API key to your Supabase project secrets as{" "}
                  <code className="bg-muted px-2 py-1 rounded">RESEND_API_KEY</code>
                </li>
              </ol>
              <div className="bg-muted p-4 rounded-lg mt-4">
                <p className="font-medium mb-2">Current Status:</p>
                <p className="text-muted-foreground">
                  ✓ Edge function deployed<br />
                  ✓ Email configured: {notificationEmail}<br />
                  {/* User needs to verify if Resend is connected */}
                  ⚠️ Make sure Resend API key is configured in Supabase secrets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
