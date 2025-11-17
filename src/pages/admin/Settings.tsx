import { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Palette, Bell, Mail, Database } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useBranding } from '../../contexts/BrandingContext';
import { useSettings } from '../../contexts/SettingsContext';
import { toast } from 'sonner';

interface SettingsProps {
  onNavigate: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Settings({ onNavigate, darkMode, setDarkMode }: SettingsProps) {
  const { brandColors, updateBrandColor, resetBrandColors } = useBranding();
  const { currency, timezone, updateCurrency, updateTimezone } = useSettings();
  const [tempColors, setTempColors] = useState({
    realEstate: brandColors.realEstate,
    businessSetup: brandColors.businessSetup,
  });
  const [localCurrency, setLocalCurrency] = useState(currency);
  const [localTimezone, setLocalTimezone] = useState(timezone);

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

  const handleSaveGeneralSettings = () => {
    updateCurrency(localCurrency);
    updateTimezone(localTimezone);
    toast.success('Settings Saved!', {
      description: `Currency: ${localCurrency}, Timezone: ${localTimezone}`
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1200px] mx-auto">
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
              
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <p className="text-sm text-gray-600 mb-2">Select your preferred currency for transactions and reports</p>
                <Select value={localCurrency} onValueChange={setLocalCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AED">AED - UAE Dirham (د.إ)</SelectItem>
                    <SelectItem value="USD">USD - US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">EUR - Euro (€)</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound (£)</SelectItem>
                    <SelectItem value="SAR">SAR - Saudi Riyal (﷼)</SelectItem>
                    <SelectItem value="QAR">QAR - Qatari Riyal (ر.ق)</SelectItem>
                    <SelectItem value="KWD">KWD - Kuwaiti Dinar (د.ك)</SelectItem>
                    <SelectItem value="BHD">BHD - Bahraini Dinar (د.ب)</SelectItem>
                    <SelectItem value="OMR">OMR - Omani Rial (ر.ع.)</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee (₹)</SelectItem>
                    <SelectItem value="PKR">PKR - Pakistani Rupee (₨)</SelectItem>
                    <SelectItem value="EGP">EGP - Egyptian Pound (£)</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen (¥)</SelectItem>
                    <SelectItem value="CNY">CNY - Chinese Yuan (¥)</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar ($)</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar ($)</SelectItem>
                    <SelectItem value="CHF">CHF - Swiss Franc (Fr)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Zone</Label>
                <p className="text-sm text-gray-600 mb-2">Set your local timezone for scheduling and notifications</p>
                <Select value={localTimezone} onValueChange={setLocalTimezone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Middle East & Gulf Region */}
                    <SelectItem value="Asia/Dubai">Dubai, UAE (UTC+4)</SelectItem>
                    <SelectItem value="Asia/Abu_Dhabi">Abu Dhabi, UAE (UTC+4)</SelectItem>
                    <SelectItem value="Asia/Riyadh">Riyadh, Saudi Arabia (UTC+3)</SelectItem>
                    <SelectItem value="Asia/Qatar">Doha, Qatar (UTC+3)</SelectItem>
                    <SelectItem value="Asia/Kuwait">Kuwait City (UTC+3)</SelectItem>
                    <SelectItem value="Asia/Bahrain">Manama, Bahrain (UTC+3)</SelectItem>
                    <SelectItem value="Asia/Muscat">Muscat, Oman (UTC+4)</SelectItem>
                    <SelectItem value="Asia/Beirut">Beirut, Lebanon (UTC+2)</SelectItem>
                    <SelectItem value="Asia/Amman">Amman, Jordan (UTC+2)</SelectItem>
                    <SelectItem value="Asia/Jerusalem">Jerusalem (UTC+2)</SelectItem>
                    
                    {/* Europe */}
                    <SelectItem value="Europe/London">London, UK (UTC+0)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris, France (UTC+1)</SelectItem>
                    <SelectItem value="Europe/Berlin">Berlin, Germany (UTC+1)</SelectItem>
                    <SelectItem value="Europe/Rome">Rome, Italy (UTC+1)</SelectItem>
                    <SelectItem value="Europe/Madrid">Madrid, Spain (UTC+1)</SelectItem>
                    <SelectItem value="Europe/Amsterdam">Amsterdam, Netherlands (UTC+1)</SelectItem>
                    <SelectItem value="Europe/Brussels">Brussels, Belgium (UTC+1)</SelectItem>
                    <SelectItem value="Europe/Zurich">Zurich, Switzerland (UTC+1)</SelectItem>
                    <SelectItem value="Europe/Vienna">Vienna, Austria (UTC+1)</SelectItem>
                    <SelectItem value="Europe/Moscow">Moscow, Russia (UTC+3)</SelectItem>
                    <SelectItem value="Europe/Istanbul">Istanbul, Turkey (UTC+3)</SelectItem>
                    
                    {/* Asia */}
                    <SelectItem value="Asia/Karachi">Karachi, Pakistan (UTC+5)</SelectItem>
                    <SelectItem value="Asia/Kolkata">Mumbai, India (UTC+5:30)</SelectItem>
                    <SelectItem value="Asia/Dhaka">Dhaka, Bangladesh (UTC+6)</SelectItem>
                    <SelectItem value="Asia/Bangkok">Bangkok, Thailand (UTC+7)</SelectItem>
                    <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                    <SelectItem value="Asia/Hong_Kong">Hong Kong (UTC+8)</SelectItem>
                    <SelectItem value="Asia/Shanghai">Shanghai, China (UTC+8)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo, Japan (UTC+9)</SelectItem>
                    <SelectItem value="Asia/Seoul">Seoul, South Korea (UTC+9)</SelectItem>
                    
                    {/* Americas */}
                    <SelectItem value="America/New_York">New York, USA (UTC-5)</SelectItem>
                    <SelectItem value="America/Chicago">Chicago, USA (UTC-6)</SelectItem>
                    <SelectItem value="America/Denver">Denver, USA (UTC-7)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Los Angeles, USA (UTC-8)</SelectItem>
                    <SelectItem value="America/Toronto">Toronto, Canada (UTC-5)</SelectItem>
                    <SelectItem value="America/Vancouver">Vancouver, Canada (UTC-8)</SelectItem>
                    <SelectItem value="America/Mexico_City">Mexico City (UTC-6)</SelectItem>
                    <SelectItem value="America/Sao_Paulo">São Paulo, Brazil (UTC-3)</SelectItem>
                    
                    {/* Africa */}
                    <SelectItem value="Africa/Cairo">Cairo, Egypt (UTC+2)</SelectItem>
                    <SelectItem value="Africa/Johannesburg">Johannesburg, South Africa (UTC+2)</SelectItem>
                    <SelectItem value="Africa/Lagos">Lagos, Nigeria (UTC+1)</SelectItem>
                    <SelectItem value="Africa/Nairobi">Nairobi, Kenya (UTC+3)</SelectItem>
                    
                    {/* Oceania */}
                    <SelectItem value="Australia/Sydney">Sydney, Australia (UTC+10)</SelectItem>
                    <SelectItem value="Australia/Melbourne">Melbourne, Australia (UTC+10)</SelectItem>
                    <SelectItem value="Pacific/Auckland">Auckland, New Zealand (UTC+12)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
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
              <Button onClick={() => {
                toast.success('Notification Preferences Saved!', {
                  description: 'Your notification settings have been updated'
                });
              }}>Save Preferences</Button>
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