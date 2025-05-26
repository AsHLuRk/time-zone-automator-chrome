import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Clock, Globe, Plus, Trash2, Sparkles, Timer, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';
import AutofillManager from '@/components/AutofillManager';

interface ScheduledSite {
  id: string;
  url: string;
  time: string;
  enabled: boolean;
  siteName: string;
}

const Index = () => {
  const { isDark, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scheduledSites, setScheduledSites] = useState<ScheduledSite[]>([]);
  const [newSite, setNewSite] = useState({ url: '', time: '', siteName: '' });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check for scheduled sites to open
  useEffect(() => {
    const checkSchedules = () => {
      const now = new Date();
      const currentTimeString = now.toTimeString().slice(0, 5);
      
      scheduledSites.forEach(site => {
        if (site.enabled && site.time === currentTimeString) {
          // In a real Chrome extension, this would open a new tab
          toast.success(`Opening ${site.siteName || site.url}`, {
            description: `Scheduled for ${site.time}`
          });
          console.log(`Would open: ${site.url} at ${site.time}`);
        }
      });
    };

    const interval = setInterval(checkSchedules, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [scheduledSites]);

  const addScheduledSite = () => {
    if (!newSite.url || !newSite.time) {
      toast.error('Please fill in all fields');
      return;
    }

    const site: ScheduledSite = {
      id: Date.now().toString(),
      url: newSite.url.startsWith('http') ? newSite.url : `https://${newSite.url}`,
      time: newSite.time,
      enabled: true,
      siteName: newSite.siteName || new URL(newSite.url.startsWith('http') ? newSite.url : `https://${newSite.url}`).hostname
    };

    setScheduledSites([...scheduledSites, site]);
    setNewSite({ url: '', time: '', siteName: '' });
    toast.success('Website scheduled successfully!');
  };

  const toggleSite = (id: string) => {
    setScheduledSites(sites =>
      sites.map(site =>
        site.id === id ? { ...site, enabled: !site.enabled } : site
      )
    );
  };

  const deleteSite = (id: string) => {
    setScheduledSites(sites => sites.filter(site => site.id !== id));
    toast.success('Schedule removed');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-4 relative overflow-hidden">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-20">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-purple-200 dark:border-purple-700 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-purple-600" />
          )}
        </Button>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-xl">
                <Timer className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Website Scheduler
              </h1>
              <div className="flex items-center justify-center gap-2 text-purple-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-lg font-medium">Smart Auto-Launch Extension</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          {/* Live Clock */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 inline-block border border-white/30">
              <div className="text-4xl font-mono font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="absolute top-4 right-4">
                <Clock className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Add New Schedule Card */}
        <Card className="mb-8 shadow-2xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <CardTitle className="flex items-center gap-3 relative z-10 text-xl">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Plus className="w-6 h-6" />
              </div>
              <span className="font-semibold">Schedule New Website</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-3">
                <Label htmlFor="siteName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Site Name (Optional)
                </Label>
                <Input
                  id="siteName"
                  placeholder="e.g., IRCTC, Gmail"
                  value={newSite.siteName}
                  onChange={(e) => setNewSite({ ...newSite, siteName: e.target.value })}
                  className="border-2 border-purple-200 focus:border-purple-500 bg-white/50 backdrop-blur-sm rounded-xl transition-all duration-200 hover:bg-white/70"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="url" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  Website URL
                </Label>
                <Input
                  id="url"
                  placeholder="e.g., irctc.co.in"
                  value={newSite.url}
                  onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
                  className="border-2 border-indigo-200 focus:border-indigo-500 bg-white/50 backdrop-blur-sm rounded-xl transition-all duration-200 hover:bg-white/70"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="time" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newSite.time}
                  onChange={(e) => setNewSite({ ...newSite, time: e.target.value })}
                  className="border-2 border-blue-200 focus:border-blue-500 bg-white/50 backdrop-blur-sm rounded-xl transition-all duration-200 hover:bg-white/70"
                />
              </div>
            </div>
            <Button 
              onClick={addScheduledSite}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Autofill Manager */}
        <div className="mb-8">
          <AutofillManager />
        </div>

        {/* Scheduled Sites List */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Scheduled Websites
            </span>
            <span className="text-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {scheduledSites.length}
            </span>
          </h2>
          
          {scheduledSites.length === 0 ? (
            <Card className="shadow-2xl border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
              <CardContent className="p-16 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full blur-2xl opacity-30"></div>
                  <Clock className="w-20 h-20 text-purple-400 mx-auto relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">No schedules yet</h3>
                <p className="text-gray-500 text-lg">Add your first website schedule above to get started!</p>
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2 text-purple-500 font-medium">
                    <Sparkles className="w-5 h-5" />
                    <span>Your automation journey begins here</span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {scheduledSites.map((site, index) => (
                <Card 
                  key={site.id} 
                  className="shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/80 group overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl blur-sm opacity-75"></div>
                          <div className="relative p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                            <Globe className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800">{site.siteName}</h3>
                          <p className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer transition-colors duration-200">
                            {site.url}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            {site.time}
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            {new Date(`2000-01-01 ${site.time}`).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ml-6">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={site.enabled}
                            onCheckedChange={() => toggleSite(site.id)}
                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-indigo-600"
                          />
                          <span className={`text-sm font-medium ${site.enabled ? 'text-green-600' : 'text-gray-400'}`}>
                            {site.enabled ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSite(site.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <Card className="mt-8 shadow-xl border-0 bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:bg-gray-800/80 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-orange-100/20"></div>
          <CardContent className="p-8 relative">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur-sm opacity-75"></div>
                <div className="relative p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl text-amber-800 mb-3 flex items-center gap-2">
                  Chrome Extension Demo
                  <Timer className="w-5 h-5" />
                </h3>
                <p className="text-amber-700 text-base leading-relaxed">
                  This is a demo interface showcasing the extension's capabilities. In a real Chrome extension, 
                  this would automatically open the scheduled websites in new tabs at the specified times. 
                  The extension would run silently in the background, continuously monitoring your schedules.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
