
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Clock, Globe, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ScheduledSite {
  id: string;
  url: string;
  time: string;
  enabled: boolean;
  siteName: string;
}

const Index = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Website Scheduler</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            Automatically open websites at your scheduled times
          </p>
          
          {/* Live Clock */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 inline-block">
            <div className="text-3xl font-mono font-bold text-blue-600">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Add New Schedule Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Schedule New Website
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="siteName" className="text-sm font-medium text-gray-700 mb-2 block">
                  Site Name (Optional)
                </Label>
                <Input
                  id="siteName"
                  placeholder="e.g., IRCTC, Gmail"
                  value={newSite.siteName}
                  onChange={(e) => setNewSite({ ...newSite, siteName: e.target.value })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="url" className="text-sm font-medium text-gray-700 mb-2 block">
                  Website URL
                </Label>
                <Input
                  id="url"
                  placeholder="e.g., irctc.co.in"
                  value={newSite.url}
                  onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-sm font-medium text-gray-700 mb-2 block">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newSite.time}
                  onChange={(e) => setNewSite({ ...newSite, time: e.target.value })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            <Button 
              onClick={addScheduledSite}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Sites List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-500" />
            Scheduled Websites ({scheduledSites.length})
          </h2>
          
          {scheduledSites.length === 0 ? (
            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-12 text-center">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No schedules yet</h3>
                <p className="text-gray-500">Add your first website schedule above to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {scheduledSites.map((site) => (
                <Card key={site.id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{site.siteName}</h3>
                          <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {site.url}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-mono font-bold text-gray-900">
                            {site.time}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(`2000-01-01 ${site.time}`).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <Switch
                          checked={site.enabled}
                          onCheckedChange={() => toggleSite(site.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSite(site.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
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
        <Card className="mt-8 shadow-lg border-0 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Chrome Extension Note</h3>
                <p className="text-sm text-amber-700">
                  This is a demo interface. In a real Chrome extension, this would automatically open 
                  the scheduled websites in new tabs at the specified times. The extension would run 
                  in the background and check your schedules continuously.
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
