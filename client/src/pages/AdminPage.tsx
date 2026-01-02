import { useOffers, useDeleteOffer } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { OfferForm } from "@/components/OfferForm";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { data: offers, isLoading } = useOffers();
  const deleteMutation = useDeleteOffer();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">لوحة التحكم</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-[#1a237e]">إضافة عرض</Button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <OfferForm onSuccess={() => setShowForm(false)} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading ? <Loader2 className="animate-spin" /> : 
          offers?.map(offer => (
            <OfferCard key={offer.id} offer={offer} isAdmin onDelete={() => deleteMutation.mutate(offer.id)} />
          ))
        }
      </div>
    </div>
  );
}
