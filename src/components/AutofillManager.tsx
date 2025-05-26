
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { UserCheck, Save, Trash2, Train, Download } from 'lucide-react';
import { toast } from 'sonner';

interface AutofillData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  // IRCTC specific fields
  irctcUsername: string;
  irctcPassword: string;
  aadhaarNumber: string;
  panNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
}

const AutofillManager: React.FC = () => {
  const [autofillData, setAutofillData] = useState<AutofillData>(() => {
    const saved = localStorage.getItem('autofillData');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      irctcUsername: '',
      irctcPassword: '',
      aadhaarNumber: '',
      panNumber: '',
      dateOfBirth: '',
      gender: '',
      nationality: 'Indian'
    };
  });

  const saveAutofillData = () => {
    localStorage.setItem('autofillData', JSON.stringify(autofillData));
    toast.success('IRCTC autofill data saved successfully!');
  };

  const clearAutofillData = () => {
    const emptyData = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      irctcUsername: '',
      irctcPassword: '',
      aadhaarNumber: '',
      panNumber: '',
      dateOfBirth: '',
      gender: '',
      nationality: 'Indian'
    };
    setAutofillData(emptyData);
    localStorage.removeItem('autofillData');
    toast.success('Autofill data cleared!');
  };

  const simulateIRCTCFill = () => {
    // In a real Chrome extension, this would use content scripts to fill IRCTC forms
    console.log('IRCTC Autofill Data:', autofillData);
    toast.success('IRCTC form auto-filled!', {
      description: 'In a real extension, this would fill the IRCTC booking form automatically'
    });
  };

  const updateField = (field: keyof AutofillData, value: string) => {
    setAutofillData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <CardTitle className="flex items-center gap-3 relative z-10 text-xl">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Train className="w-6 h-6" />
          </div>
          <span className="font-semibold">IRCTC Autofill Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 relative">
        {/* Personal Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-500" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={autofillData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={autofillData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={autofillData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={autofillData.dateOfBirth}
                onChange={(e) => updateField('dateOfBirth', e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Gender
              </Label>
              <Input
                id="gender"
                placeholder="Male/Female/Other"
                value={autofillData.gender}
                onChange={(e) => updateField('gender', e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="nationality" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nationality
              </Label>
              <Input
                id="nationality"
                placeholder="Indian"
                value={autofillData.nationality}
                onChange={(e) => updateField('nationality', e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* IRCTC Credentials Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <Train className="w-5 h-5 text-indigo-500" />
            IRCTC Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <Label htmlFor="irctcUsername" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                IRCTC Username
              </Label>
              <Input
                id="irctcUsername"
                placeholder="Enter your IRCTC username"
                value={autofillData.irctcUsername}
                onChange={(e) => updateField('irctcUsername', e.target.value)}
                className="border-2 border-indigo-200 focus:border-indigo-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="irctcPassword" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                IRCTC Password
              </Label>
              <Input
                id="irctcPassword"
                type="password"
                placeholder="Enter your IRCTC password"
                value={autofillData.irctcPassword}
                onChange={(e) => updateField('irctcPassword', e.target.value)}
                className="border-2 border-indigo-200 focus:border-indigo-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Document Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-purple-500" />
            Document Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <Label htmlFor="aadhaarNumber" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Aadhaar Number
              </Label>
              <Input
                id="aadhaarNumber"
                placeholder="Enter 12-digit Aadhaar number"
                value={autofillData.aadhaarNumber}
                onChange={(e) => updateField('aadhaarNumber', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="panNumber" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                PAN Number
              </Label>
              <Input
                id="panNumber"
                placeholder="Enter PAN number"
                value={autofillData.panNumber}
                onChange={(e) => updateField('panNumber', e.target.value)}
                className="border-2 border-purple-200 focus:border-purple-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="address" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Address
              </Label>
              <Input
                id="address"
                placeholder="Enter your address"
                value={autofillData.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="border-2 border-green-200 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="city" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                City
              </Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={autofillData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="border-2 border-green-200 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="pincode" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Pincode
              </Label>
              <Input
                id="pincode"
                placeholder="Enter pincode"
                value={autofillData.pincode}
                onChange={(e) => updateField('pincode', e.target.value)}
                className="border-2 border-green-200 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={saveAutofillData}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border-0"
          >
            <Save className="w-5 h-5 mr-2" />
            Save IRCTC Data
          </Button>
          <Button 
            onClick={simulateIRCTCFill}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border-0"
          >
            <Train className="w-5 h-5 mr-2" />
            Fill IRCTC Form
          </Button>
          <Button 
            onClick={clearAutofillData}
            variant="outline"
            className="px-6 py-3 rounded-xl border-2 border-red-200 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-all duration-300"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutofillManager;
