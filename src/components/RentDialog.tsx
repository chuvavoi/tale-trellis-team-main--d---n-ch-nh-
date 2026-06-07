import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRentals } from "@/lib/rentals";
import { toast } from "sonner";

export function RentDialog({
  bookId,
  bookTitle,
  trigger,
}: {
  bookId: string;
  bookTitle: string;
  trigger: React.ReactNode;
}) {
  const { rent } = useRentals();
  const [open, setOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const confirm = () => {
    if (!endDate) {
      toast.error("Vui lòng chọn ngày trả sách");
      return;
    }
    if (endDate < today) {
      toast.error("Ngày trả phải sau hôm nay");
      return;
    }
    rent(bookId, endDate);
    toast.success(`Đã thuê "${bookTitle}"`, {
      description: `Đọc đến ${format(endDate, "dd/MM/yyyy")}`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Thuê sách</DialogTitle>
          <DialogDescription>
            Ngày bắt đầu được ghi nhận tự động là hôm nay. Hãy chọn ngày bạn muốn
            kết thúc.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-lg bg-secondary/60 p-4 text-sm">
            <div className="text-muted-foreground">Ngày bắt đầu</div>
            <div className="font-medium mt-1">
              {format(new Date(), "EEEE, dd 'tháng' MM, yyyy", { locale: vi })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Ngày kết thúc</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full mt-2 justify-start text-left font-normal",
                    !endDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {endDate ? format(endDate, "dd/MM/yyyy") : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < today}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={confirm}>Xác nhận thuê</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
