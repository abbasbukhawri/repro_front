import { useState } from 'react';
import { User, Mail, Phone, Building2, MapPin, Calendar, Shield, Camera, Edit2, Save, X, Globe, DollarSign } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@crm.com',
    phone: '+971 50 123 4567',
    role: 'Super Admin',
    department: 'Management',
    company: 'ReproLeaders & Probiz Corporate',
    location: 'Dubai, UAE',
    bio: 'Experienced CRM administrator with a focus on real estate and business setup services. Passionate about streamlining operations and improving team efficiency.',
    joinDate: '2024-01-15',
    currency: 'AED',
    timezone: 'Asia/Dubai',
  });

  const [editedData, setEditedData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(profileData);
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    toast.success('Profile Updated', {
      description: 'Your profile information has been saved successfully'
    });
  };

  const handleChange = (field: string, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: 'Total Leads', value: '248', change: '+12%' },
    { label: 'Closed Deals', value: '67', change: '+8%' },
    { label: 'Tasks Completed', value: '432', change: '+15%' },
    { label: 'Active Cases', value: '23', change: '+5%' },
  ];

  const recentActivity = [
    { action: 'Created lead for Mohammed Al-Rashid', time: '2 hours ago', type: 'lead' },
    { action: 'Closed deal worth AED 2.5M', time: '5 hours ago', type: 'deal' },
    { action: 'Completed renewal task for Tech Solutions LLC', time: '1 day ago', type: 'task' },
    { action: 'Added new property listing in Dubai Marina', time: '2 days ago', type: 'property' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="My Profile"
        description="Manage your personal information and account settings"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Picture & Basic Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative group mb-4">
                  <Avatar className="h-32 w-32 ring-4 ring-gray-100">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Name & Role */}
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Shield className="w-3 h-3 mr-1" />
                  {profileData.role}
                </Badge>
                
                <p className="text-sm text-gray-600 mb-4">
                  {profileData.department} • {profileData.company}
                </p>

                <Separator className="my-4" />

                {/* Quick Info */}
                <div className="w-full space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    <span className="text-gray-600">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    <span className="text-gray-600">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    <span className="text-gray-600">{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    <span className="text-gray-600">
                      Joined {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {stat.change}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={isEditing ? editedData.firstName : profileData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={isEditing ? editedData.lastName : profileData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editedData.email : profileData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={isEditing ? editedData.phone : profileData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={isEditing ? editedData.department : profileData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={isEditing ? editedData.location : profileData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* Currency */}
                <div className="space-y-2">
                  <Label htmlFor="currency">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Preferred Currency
                  </Label>
                  <Select
                    value={isEditing ? editedData.currency : profileData.currency}
                    onValueChange={(value) => handleChange('currency', value)}
                    disabled={!isEditing}
                  >
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
                      <SelectItem value="INR">INR - Indian Rupee (₹)</SelectItem>
                      <SelectItem value="PKR">PKR - Pakistani Rupee (₨)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                  <Label htmlFor="timezone">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Time Zone
                  </Label>
                  <Select
                    value={isEditing ? editedData.timezone : profileData.timezone}
                    onValueChange={(value) => handleChange('timezone', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Dubai">Dubai, UAE (UTC+4)</SelectItem>
                      <SelectItem value="Asia/Riyadh">Riyadh, Saudi Arabia (UTC+3)</SelectItem>
                      <SelectItem value="Asia/Qatar">Doha, Qatar (UTC+3)</SelectItem>
                      <SelectItem value="Asia/Kuwait">Kuwait City (UTC+3)</SelectItem>
                      <SelectItem value="Asia/Muscat">Muscat, Oman (UTC+4)</SelectItem>
                      <SelectItem value="Europe/London">London, UK (UTC+0)</SelectItem>
                      <SelectItem value="America/New_York">New York, USA (UTC-5)</SelectItem>
                      <SelectItem value="Asia/Kolkata">Mumbai, India (UTC+5:30)</SelectItem>
                      <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bio */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={isEditing ? editedData.bio : profileData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg mt-0.5">
                      <User className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Password</p>
                  <p className="text-xs text-gray-600 mt-1">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-600 mt-1">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable 2FA
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Active Sessions</p>
                  <p className="text-xs text-gray-600 mt-1">Manage your active sessions</p>
                </div>
                <Button variant="outline" size="sm">
                  View Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}