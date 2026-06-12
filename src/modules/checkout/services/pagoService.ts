import { api } from "@/lib/axios";
import type { PagoCrearResponse } from "../types";

export const pagoService = {
  createPreference: async (pedidoId: number): Promise<PagoCrearResponse> => {
    const { data } = await api.post<PagoCrearResponse>("/api/v1/pagos/create-preference", {
      pedido_id: pedidoId,
    });
    return data;
  },

  confirmPayment: async (
    pedidoId: number,
    paymentId?: number
  ): Promise<{ estado: string; pedido_id: number }> => {
    const { data } = await api.post<{ estado: string; pedido_id: number }>(
      "/api/v1/pagos/confirm",
      { pedido_id: pedidoId, payment_id: paymentId }
    );
    return data;
  },
};
