import React, { useState } from 'react';
import { X, Globe, Bell, Shield, Moon, Sun, Volume2, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface SettingsPanelProps {
  onClose: () => void;
  theme: string;
  onThemeChange: () => void;
}

interface Setting {
  id: string;
  title: string;
  description: string;
  icon: any;
  type: 'toggle' | 'select';
  options?: string[];
}

export function SettingsPanel({ onClose, theme, onThemeChange }: SettingsPanelProps) {
  const [settingValues, setSettingValues] = useState({
    notifications: true,
    language: 'English',
    units: 'Metric',
    privacy: false,
    sound: true,
  });

  const settings: Setting[] = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Get real-time updates about your journey',
      icon: Bell,
      type: 'toggle',
    },
    {
      id: 'language',
      title: 'Language',
      description: 'Choose your preferred language',
      icon: Languages,
      type: 'select',
      options: ['English', 'Spanish', 'French', 'German'],
    },
    {
      id: 'units',
      title: 'Distance Units',
      description: 'Choose your preferred measurement system',
      icon: Globe,
      type: 'select',
      options: ['Metric', 'Imperial'],
    },
    {
      id: 'privacy',
      title: 'Privacy Mode',
      description: 'Control your location sharing settings',
      icon: Shield,
      type: 'toggle',
    },
    {
      id: 'sound',
      title: 'Sound Effects',
      description: 'Enable or disable app sounds',
      icon: Volume2,
      type: 'toggle',
    },
  ];

  const handleToggle = (settingId: string) => {
    setSettingValues(prev => ({
      ...prev,
      [settingId]: !prev[settingId as keyof typeof settingValues]
    }));
  };

  const handleSelect = (settingId: string, value: string) => {
    setSettingValues(prev => ({
      ...prev,
      [settingId]: value
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          'fixed z-modal',
          'top-[var(--header-height)] right-4 md:right-8',
          'w-[calc(100vw-2rem)] md:w-96',
          'max-h-[calc(100vh-var(--header-height)-2rem)]',
          'glass-panel'
        )}
      >
        <div className="panel-header">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="icon-button">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="panel-content space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-purple-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
                <div>
                  <h3 className="text-white font-medium">Theme</h3>
                  <p className="text-white/60 text-sm">Switch between light and dark mode</p>
                </div>
              </div>
              <button
                onClick={onThemeChange}
                className={cn(
                  'toggle-switch',
                  theme === 'dark' ? 'bg-purple-500/50' : 'bg-white/20'
                )}
              >
                <div
                  className={cn(
                    'toggle-switch-thumb',
                    theme === 'dark'
                      ? 'translate-x-6 bg-purple-400'
                      : 'bg-yellow-400'
                  )}
                />
              </button>
            </div>
          </motion.div>

          {settings.map((setting, index) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0">
                  <setting.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h3 className="text-white font-medium truncate">{setting.title}</h3>
                    <p className="text-white/60 text-sm truncate">{setting.description}</p>
                  </div>
                </div>
                {setting.type === 'toggle' ? (
                  <button
                    onClick={() => handleToggle(setting.id)}
                    className={cn(
                      'toggle-switch flex-shrink-0',
                      settingValues[setting.id as keyof typeof settingValues]
                        ? 'bg-blue-500/50'
                        : 'bg-white/20'
                    )}
                  >
                    <div
                      className={cn(
                        'toggle-switch-thumb bg-white',
                        settingValues[setting.id as keyof typeof settingValues] && 'translate-x-6'
                      )}
                    />
                  </button>
                ) : (
                  <select
                    value={settingValues[setting.id as keyof typeof settingValues] as string}
                    onChange={(e) => handleSelect(setting.id, e.target.value)}
                    className={cn(
                      'bg-white/10 text-white rounded-lg px-3 py-1 text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                      'appearance-none cursor-pointer'
                    )}
                  >
                    {setting.options?.map((option) => (
                      <option key={option} value={option} className="bg-gray-900">
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}