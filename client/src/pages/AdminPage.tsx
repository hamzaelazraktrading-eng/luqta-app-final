import { useQuery, useMutation } from "@tanstack/react-query";
import { Offer, insertOfferSchema } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Loader2 } from "lucide-react";

export default function AdminPage() {
  const { toast } = useToast();
  const { data: offers, isLoading } = useQuery<Offer[]>({
    queryKey: ["/api/offers"],
  });

  const form = useForm({
    resolver: zodResolver(insertOfferSchema),
    defaultValues: {
      title: "",
      description: "",
      oldPrice: "",
      newPrice: "",
      discount: 0,
      imageUrl: "",
      category: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiRequest("POST", "/api/offers", values);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
      form.reset();
      toast({ title: "تمت إضافة العرض بنجاح" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/offers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
      toast({ title: "تم حذف العرض بنجاح" });
    },
  });

  return (
    <div className="min-h-screen bg-[#0a192f] text-white p-8 dir-rtl" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <Card className="bg-[#112240] border-[#d4af37]/20 text-white">
            <CardHeader>
              <CardTitle className="text-[#d4af37]">إضافة عرض جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((v) => createMutation.mutate(v))} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>العنوان</FormLabel>
                        <FormControl>
                          <Input className="bg-[#0a192f] border-[#d4af37]/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="oldPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>السعر القديم</FormLabel>
                          <FormControl>
                            <Input className="bg-[#0a192f] border-[#d4af37]/30" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>السعر الجديد</FormLabel>
                          <FormControl>
                            <Input className="bg-[#0a192f] border-[#d4af37]/30" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نسبة الخصم</FormLabel>
                        <FormControl>
                          <Input type="number" className="bg-[#0a192f] border-[#d4af37]/30" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رابط الصورة</FormLabel>
                        <FormControl>
                          <Input className="bg-[#0a192f] border-[#d4af37]/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>التصنيف</FormLabel>
                        <FormControl>
                          <Input className="bg-[#0a192f] border-[#d4af37]/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الوصف</FormLabel>
                        <FormControl>
                          <Textarea className="bg-[#0a192f] border-[#d4af37]/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#d4af37] hover:bg-[#b8962f] text-[#0a192f] font-bold"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? <Loader2 className="animate-spin" /> : <Plus className="ml-2 h-4 w-4" />}
                    إضافة العرض
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2">
          <Card className="bg-[#112240] border-[#d4af37]/20 text-white">
            <CardHeader>
              <CardTitle className="text-[#d4af37]">العروض الحالية</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#d4af37] h-8 w-8" /></div>
              ) : (
                <div className="space-y-4">
                  {offers?.map((offer) => (
                    <div key={offer.id} className="flex items-center justify-between p-4 bg-[#0a192f] rounded-lg border border-[#d4af37]/10">
                      <div className="flex items-center gap-4">
                        <img src={offer.imageUrl} className="w-16 h-16 rounded object-cover" alt="" />
                        <div>
                          <div className="font-bold">{offer.title}</div>
                          <div className="text-sm text-gray-400">{offer.newPrice} ريال</div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => deleteMutation.mutate(offer.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
