import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOfferSchema, type InsertOffer, type Offer } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateOffer, useUpdateOffer } from "@/hooks/use-offers";
import { Loader2 } from "lucide-react";

export function OfferForm({ offer, onSuccess }: { offer?: Offer, onSuccess?: () => void }) {
  const createMutation = useCreateOffer();
  const updateMutation = useUpdateOffer();
  const form = useForm<InsertOffer>({
    resolver: zodResolver(insertOfferSchema),
    defaultValues: offer || {
      title: "",
      description: "",
      oldPrice: "",
      newPrice: "",
      discount: "",
      imageUrl: "",
      category: "all",
      storeName: "",
      affiliateUrl: "",
    },
  });

  const onSubmit = async (data: InsertOffer) => {
    if (offer) {
      await updateMutation.mutateAsync({ id: offer.id, ...data });
    } else {
      await createMutation.mutateAsync(data);
    }
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
      <Input {...form.register("title")} placeholder="العنوان" />
      <Input {...form.register("newPrice")} placeholder="السعر الجديد" />
      <Input {...form.register("oldPrice")} placeholder="السعر القديم" />
      <Input {...form.register("storeName")} placeholder="اسم المتجر" />
      <Input {...form.register("affiliateUrl")} placeholder="رابط العرض" />
      <Input {...form.register("imageUrl")} placeholder="رابط الصورة" />
      <Button type="submit" className="w-full">حفظ</Button>
    </form>
  );
}
