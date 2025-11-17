import { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Palette, Bell, Mail, Database } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useBranding } from '../../contexts/BrandingContext';
import { toast } from 'sonner';

interface SettingsProps {
  onNavigate: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Settings({ onNavigate, darkMode, setDarkMode }: SettingsProps) {
  const { brandColors, updateBrandColor, resetBrandColors } = useBranding();
  const [tempColors, setTempColors] = useState({
    realEstate: brandColors.realEstate,
    businessSetup: brandColors.businessSetup,
  });

  const handleColorChange = (brand: 'realEstate' | 'businessSetup', color: string) => {
    setTempColors(prev => ({
      ...prev,
      [brand]: color
    }));
  };

  const handleSaveBranding = () => {
    updateBrandColor('realEstate', tempColors.realEstate);
    updateBrandColor('businessSetup', tempColors.businessSetup);
    toast.success('Brand colors updated successfully!');
  };

  const handleResetColors = () => {
    resetBrandColors();
    setTempColors({
      realEstate: '#3b82f6',
      businessSetup: '#10b981',
    });
    toast.success('Brand colors reset to default!');
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader
        title="Settings"
        description="Configure your CRM preferences"
      />

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-gray-600">Enable dark mode interface</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-assign Leads</Label>
                  <p className="text-sm text-gray-600">Automatically distribute new leads</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive email for important updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label>Default Currency</Label>
                <Input defaultValue="AED" className="mt-2" />
              </div>
              <div>
                <Label>Time Zone</Label>
                <Input defaultValue="Asia/Dubai (UTC+4)" className="mt-2" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Brand Colors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Real Estate Brand Color</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input 
                    type="color" 
                    value={tempColors.realEstate} 
                    className="w-20 h-10" 
                    onChange={(e) => handleColorChange('realEstate', e.target.value)} 
                  />
                  <Input 
                    value={tempColors.realEstate} 
                    onChange={(e) => handleColorChange('realEstate', e.target.value)} 
                  />
                </div>
              </div>
              <div>
                <Label>Business Setup Brand Color</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input 
                    type="color" 
                    value={tempColors.businessSetup} 
                    className="w-20 h-10" 
                    onChange={(e) => handleColorChange('businessSetup', e.target.value)} 
                  />
                  <Input 
                    value={tempColors.businessSetup} 
                    onChange={(e) => handleColorChange('businessSetup', e.target.value)} 
                  />
                </div>
              </div>
              <div>
                <Label>Company Logo</Label>
                <Button variant="outline" className="mt-2">Upload Logo</Button>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSaveBranding}>Save Branding</Button>
                <Button variant="outline" onClick={handleResetColors}>Reset to Default</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Lead Assignment</Label>
                  <p className="text-sm text-gray-600">Notify when a lead is assigned</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Task Reminders</Label>
                  <p className="text-sm text-gray-600">Remind about upcoming tasks</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Deal Updates</Label>
                  <p className="text-sm text-gray-600">Notify on deal status changes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Document Uploads</Label>
                  <p className="text-sm text-gray-600">Notify when documents are uploaded</p>
                </div>
                <Switch />
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-sm mb-1">Email Integration</div>
                    <div className="text-xs text-gray-600">Connect your email account</div>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-sm mb-1">WhatsApp Business API</div>
                    <div className="text-xs text-gray-600">Send messages via WhatsApp</div>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}