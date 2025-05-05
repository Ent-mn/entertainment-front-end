import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface CapacitySearchModalProps {
  onSearch: (capacity: number) => void;
}

export function CapacitySearchModal({ onSearch }: CapacitySearchModalProps) {
  const [capacity, setCapacity] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (capacity) {
      onSearch(capacity);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] bg-[#272727] border-none">
      <DialogHeader>
        <DialogTitle className="text-white">Зочдын тоо</DialogTitle>
        <DialogDescription className="text-gray-400">
          Та хэдэн хүн бодож байна?
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="capacity" className="text-white">
            Хүний тоо
          </Label>
          <Input
            id="capacity"
            type="number"
            min="1"
            value={capacity || ""}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="bg-[#1C1C1C] border-gray-700 text-white"
            placeholder="Жишээ нь: 10"
          />
        </div>
        <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
          Хайх
        </Button>
      </form>
    </DialogContent>
  );
} 