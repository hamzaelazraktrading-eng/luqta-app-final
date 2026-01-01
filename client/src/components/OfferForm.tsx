import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOfferSchema, type InsertOffer, type Offer } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOffer, useUpdateOffer } from "@/hooks/use-offers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

interface OfferFormProps {
  offer?: Offer;
  trigger?: React.ReactNode;
}

export function OfferForm({ offer, trigger }: OfferFormProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!offer;

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
      category: "general",
    },
  });

  const onSubmit = async (data: InsertOffer) => {
    try {
      if (isEditing && offer) {
        await updateMutation.mutateAsync({ id: offer.id, ...data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setOpen(false);
      form.reset();
    } catch (error) {
      // Error handled by hook
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary text-primary-foreground">
            <Plus className="ml-2 h-4 w-4" />
            إضافة عرض جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-white/10 text-foreground">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-primary">
            {isEditing ? "تعديل العرض" : "إضافة عرض جديد"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="title">عنوان العرض</Label>
            <Input id="title" {...form.register("title")} placeholder="مثال: خصم 50% على العطور" />
            {form.formState.errors.title && (
              <p className="text-destructive text-xs">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">التصنيف</Label>
            <select 
              {...form.register("category")}
              className="flex h-11 w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/50"
            >
              <option value="general">عام</option>
              <option value="electronics">إلكترونيات</option>
              <option value="fashion">أزياء</option>
              <option value="perfumes">عطور</option>
              <option value="food">مأكولات</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="oldPrice">السعر القديم</Label>
              <Input id="oldPrice" {...form.register("oldPrice")} placeholder="200 SAR" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPrice">السعر الجديد</Label>
              <Input id="newPrice" {...form.register("newPrice")} placeholder="100 SAR" />
              {form.formState.errors.newPrice && (
                <p className="text-destructive text-xs">{form.formState.errors.newPrice.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="discount">نسبة الخصم</Label>
            <Input id="discount" {...form.register("discount")} placeholder="50%" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">رابط الصورة</Label>
            <Input id="imageUrl" {...form.register("imageUrl")} placeholder="https://..." />
            {form.formState.errors.imageUrl && (
              <p className="text-destructive text-xs">{form.formState.errors.imageUrl.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea 
              id="description" 
              {...form.register("description")} 
              className="bg-secondary/50 border-input min-h-[100px]"
              placeholder="وصف تفصيلي للعرض..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>إلغاء</Button>
            <Button type="submit" disabled={isPending} className="w-32">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (isEditing ? "حفظ التعديلات" : "نشر العرض")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
