import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import type { PedidoCreateRequest, Pedido } from "../types";

interface UseCreateOrderOptions {
  formaPagoCodigo?: string;
}

export const useCreateOrder = ({ formaPagoCodigo }: UseCreateOrderOptions = {}) => {
  const navigate = useNavigate();
  const clearCart = useCartStore((s) => s.clear);
  const qc = useQueryClient();

  return useMutation<Pedido, Error, PedidoCreateRequest>({
    mutationFn: orderService.create,
    onSuccess: (pedido) => {
      clearCart();
      qc.invalidateQueries({ queryKey: ["pedidos"] });

      if (formaPagoCodigo === "MERCADOPAGO") {
        navigate(`/pago/${pedido.id}`);
      } else {
        navigate("/pedidos");
      }
    },
  });
};
