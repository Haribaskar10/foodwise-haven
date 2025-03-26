
import { useState } from 'react';
import { useSupabase } from './use-supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';

export interface PantryItem {
  id?: string;
  user_id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiry_date: string;
  purchase_date: string;
  created_at?: string;
}

export function usePantry() {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPantryItems = async () => {
    if (!user) return [];
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('pantry_items')
        .select('*')
        .eq('user_id', user.id)
        .order('expiry_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching pantry items",
        description: error.message || "Something went wrong"
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const addPantryItem = async (item: Omit<PantryItem, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;
    
    setIsLoading(true);
    try {
      const newItem = {
        ...item,
        user_id: user.id,
      };
      
      const { data, error } = await supabase
        .from('pantry_items')
        .insert([newItem])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Item added",
        description: `${item.name} has been added to your pantry`
      });
      
      return data?.[0] || null;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding item",
        description: error.message || "Something went wrong"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePantryItem = async (id: string, updates: Partial<PantryItem>) => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('pantry_items')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Item updated",
        description: "The item has been updated successfully"
      });
      
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating item",
        description: error.message || "Something went wrong"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePantryItem = async (id: string) => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('pantry_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Item deleted",
        description: "The item has been removed from your pantry"
      });
      
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting item",
        description: error.message || "Something went wrong"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchPantryItems,
    addPantryItem,
    updatePantryItem,
    deletePantryItem,
    isLoading
  };
}
