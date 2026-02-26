import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type OrderInput, type OrderResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateOrder() {
  const { toast } = useToast();

  return useMutation<OrderResponse, Error, OrderInput>({
    mutationFn: async (data: OrderInput) => {
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Ocorreu um erro ao processar seu pedido.");
      }

      return res.json();
    },
    onError: (error) => {
      toast({
        title: "Erro no pedido",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
