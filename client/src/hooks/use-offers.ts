import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type OfferInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useOffers(filters?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: [api.offers.list.path, filters],
    queryFn: async () => {
      // Handle optional query params
      const params: Record<string, string> = {};
      if (filters?.category && filters.category !== "all") params.category = filters.category;
      if (filters?.search) params.search = filters.search;
      
      const queryString = new URLSearchParams(params).toString();
      const url = `${api.offers.list.path}${queryString ? `?${queryString}` : ''}`;

      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch offers");
      return api.offers.list.responses[200].parse(await res.json());
    },
  });
}

export function useOffer(id: number) {
  return useQuery({
    queryKey: [api.offers.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.offers.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch offer");
      return api.offers.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateOffer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: OfferInput) => {
      const res = await fetch(api.offers.create.path, {
        method: api.offers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.offers.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create offer");
      }
      return api.offers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.offers.list.path] });
      toast({
        title: "تمت الإضافة بنجاح",
        description: "تم نشر العرض الجديد بنجاح",
        variant: "default",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateOffer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<OfferInput>) => {
      const url = buildUrl(api.offers.update.path, { id });
      const res = await fetch(url, {
        method: api.offers.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.offers.update.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to update offer");
      }
      return api.offers.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.offers.list.path] });
      toast({
        title: "تم التحديث",
        description: "تم تحديث بيانات العرض بنجاح",
        className: "bg-primary text-primary-foreground border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteOffer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.offers.delete.path, { id });
      const res = await fetch(url, { 
        method: api.offers.delete.method, 
        credentials: "include" 
      });
      
      if (!res.ok) throw new Error("Failed to delete offer");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.offers.list.path] });
      toast({
        title: "تم الحذف",
        description: "تم حذف العرض بنجاح",
        variant: "destructive",
      });
    },
  });
}
