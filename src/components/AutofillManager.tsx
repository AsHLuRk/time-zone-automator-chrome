
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { UserCheck, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface AutofillData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
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
      pincode: ''
    };
  });

  const saveAutofillData = () => {
    localStorage.setItem('autofillData', JSON.stringify(autofillData));
    toast.success('Autofill data saved successfully!');
  };

  const clearAutofillData = () => {
    const emptyData = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: ''
    };
    setAutofillData(emptyData);
    localStorage.removeItem('autofillData');
    toast.success('Autofill data cleared!');
  };

  const updateField = (field: keyof AutofillData, value: string) => {
    setAutofillData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <CardTitle className="flex items-center gap-3 relative z-10 text-xl">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <UserCheck className="w-6 h-6" />
          </div>
          <span className="font-semibold">Autofill Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 relative">
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
              className="border-2 border-green-200 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
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
              className="border-2 border-green-200 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl"
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
        <div className="flex gap-4">
          <Button 
            onClick={saveAutofillData}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border-0"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Autofill Data
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
