import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCouponSchema, type InsertCoupon } from "@shared/schema";
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function CouponForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const form = useForm<InsertCoupon>({
    resolver: zodResolver(insertCouponSchema),
    defaultValues: {
      store: "",
      code: "",
      discount: "",
      description: "",
      expiryDate: new Date(),
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertCoupon) => {
      const res = await apiRequest("POST", "/api/coupons", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coupons"] });
      toast({ title: "تم إضافة الكوبون بنجاح" });
      onSuccess();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4 text-slate-900">
        <FormField
          control={form.control}
          name="store"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 font-bold">المتجر</FormLabel>
              <FormControl>
                <Input {...field} className="bg-gray-50 text-slate-900 border-slate-200" placeholder="مثلاً: أمازون" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 font-bold">كود الخصم</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 text-slate-900 border-slate-200" placeholder="مثلاً: AMZ50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 font-bold">قيمة الخصم</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-50 text-slate-900 border-slate-200" placeholder="مثلاً: 50%" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 font-bold">الوصف</FormLabel>
              <FormControl>
                <Input {...field} className="bg-gray-50 text-slate-900 border-slate-200" placeholder="وصف قصير للعرض" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 font-bold">تاريخ الانتهاء</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  className="bg-gray-50 text-slate-900 border-slate-200"
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                  value={field.value ? new Date(field.value).toISOString().split('T')[0] : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#f97316] h-12 rounded-xl font-bold" disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className="animate-spin" /> : "إضافة الكوبون"}
        </Button>
      </form>
    </Form>
  );
}
