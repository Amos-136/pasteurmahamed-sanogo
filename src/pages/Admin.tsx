import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LogOut, MessageSquare, Heart, Mail, Users } from 'lucide-react';

const Admin = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    prayers: 0,
    testimonials: 0,
    contacts: 0,
    subscribers: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [prayersRes, testimonialsRes, contactsRes, subscribersRes] = await Promise.all([
        supabase.from('prayer_intentions').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        prayers: prayersRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        contacts: contactsRes.count || 0,
        subscribers: subscribersRes.count || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Administration VDH</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Intentions de prière</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.prayers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Témoignages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.testimonials}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contacts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abonnés newsletter</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.subscribers}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion du contenu</CardTitle>
            <CardDescription>
              Gérez les demandes de prière, témoignages, messages de contact et abonnés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="prayers" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="prayers">Prières</TabsTrigger>
                <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
                <TabsTrigger value="contacts">Messages</TabsTrigger>
                <TabsTrigger value="subscribers">Abonnés</TabsTrigger>
              </TabsList>

              <TabsContent value="prayers" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  Interface de gestion des intentions de prière à venir
                </div>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  Interface de gestion des témoignages à venir
                </div>
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  Interface de gestion des messages de contact à venir
                </div>
              </TabsContent>

              <TabsContent value="subscribers" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  Interface de gestion des abonnés newsletter à venir
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
