"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings2, X, Cookie, Shield } from "lucide-react";
import Cookies from 'js-cookie';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const defaultSettings: CookieSettings = {
  necessary: true, // Always true and cannot be changed
  analytics: false,
  marketing: false,
  preferences: false,
};

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      setSettings(JSON.parse(consent));
    }
  }, []);

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    Cookies.set('cookie-consent', JSON.stringify(allEnabled), { expires: 365 });
    setSettings(allEnabled);
    setShowBanner(false);
    setIsOpen(false);
  };

  const handleSaveSettings = () => {
    Cookies.set('cookie-consent', JSON.stringify(settings), { expires: 365 });
    setShowBanner(false);
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    Cookies.set('cookie-consent', JSON.stringify(defaultSettings), { expires: 365 });
    setSettings(defaultSettings);
    setShowBanner(false);
    setIsOpen(false);
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner && !isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 h-10 w-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(true)}
      >
        <Cookie className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 p-4 bg-background/80 backdrop-blur-sm border-t z-50 animate-in slide-in-from-bottom-5">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Votre vie privée</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                  Vous pouvez personnaliser vos préférences ou accepter l'utilisation par défaut.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(true)}
                  className="w-full sm:w-auto"
                >
                  <Settings2 className="w-4 h-4 mr-2" />
                  Personnaliser
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="w-full sm:w-auto"
                >
                  Refuser tout
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto"
                >
                  Accepter tout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isOpen && (
        <Card className="fixed bottom-4 left-4 w-[380px] shadow-xl animate-in slide-in-from-bottom-5 bg-background/95 backdrop-blur-sm border-primary/10">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Préférences des cookies</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Gérez vos préférences de cookies pour notre site web.
            </p>
          </div>

          <ScrollArea className="h-[300px] p-4">
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="necessary" className="font-medium">Cookies nécessaires</Label>
                  <Switch
                    id="necessary"
                    checked={settings.necessary}
                    disabled
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics" className="font-medium">Cookies analytiques</Label>
                  <Switch
                    id="analytics"
                    checked={settings.analytics}
                    onCheckedChange={() => toggleSetting('analytics')}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Nous permettent de comprendre comment vous utilisez le site pour l'améliorer.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing" className="font-medium">Cookies marketing</Label>
                  <Switch
                    id="marketing"
                    checked={settings.marketing}
                    onCheckedChange={() => toggleSetting('marketing')}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Utilisés pour vous montrer des publicités pertinentes sur d'autres sites.
                </p>
              </div>

              {/* Preferences Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="preferences" className="font-medium">Cookies de préférences</Label>
                  <Switch
                    id="preferences"
                    checked={settings.preferences}
                    onCheckedChange={() => toggleSetting('preferences')}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Permettent de mémoriser vos préférences pour une meilleure expérience.
                </p>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-muted/50">
            <div className="flex flex-col gap-2">
              <Button onClick={handleSaveSettings} className="w-full">
                Enregistrer les préférences
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="flex-1"
                >
                  Tout refuser
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAcceptAll}
                  className="flex-1"
                >
                  Tout accepter
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}