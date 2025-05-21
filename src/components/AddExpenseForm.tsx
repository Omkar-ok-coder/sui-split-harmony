
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useExpenses } from "@/context/ExpenseContext";
import { useWallet } from "@/context/WalletContext";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  description: z.string().min(2, { message: "Description is required" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  participants: z.array(z.string()).min(1, { message: "Select at least one participant" }),
});

export function AddExpenseForm() {
  const { user } = useWallet();
  const { addExpense, groupMembers } = useExpenses();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: undefined,
      participants: user?.address ? [user.address] : [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not connected",
        description: "Please connect your wallet first",
      });
      return;
    }

    addExpense({
      description: values.description,
      amount: values.amount,
      payer: user.address,
      date: new Date(),
      participants: values.participants,
    });

    form.reset({
      description: "",
      amount: undefined,
      participants: user.address ? [user.address] : [],
    });

    setOpen(false);
  };

  if (!user?.isConnected) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-suiPurple hover:bg-suiPurple-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Dinner, Movie tickets, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participants"
              render={() => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel>Split with</FormLabel>
                    <FormDescription>Select who is part of this expense</FormDescription>
                  </div>
                  {groupMembers.map((address) => (
                    <FormField
                      key={address}
                      control={form.control}
                      name="participants"
                      render={({ field }) => {
                        const shortAddr = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
                        const isCurrentUser = user?.address === address;
                        return (
                          <FormItem
                            key={address}
                            className="flex flex-row items-start space-x-3 space-y-0 py-1"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(address)}
                                onCheckedChange={(checked) => {
                                  if (isCurrentUser) return; // Don't allow unchecking self
                                  return checked
                                    ? field.onChange([...field.value, address])
                                    : field.onChange(field.value?.filter((value) => value !== address));
                                }}
                                disabled={isCurrentUser} // Current user is always included
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {isCurrentUser ? `${shortAddr} (You)` : shortAddr}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
