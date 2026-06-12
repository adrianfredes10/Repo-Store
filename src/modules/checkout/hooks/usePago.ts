import { useMutation } from "@tanstack/react-query";
import { pagoService } from "../services/pagoService";

export const useCreatePreference = () => {
  return useMutation({
    mutationFn: pagoService.createPreference,
    onSuccess: (data) => {
      // Redirigir al checkout de MercadoPago
      window.location.href = data.init_point;
    },
  });
};
