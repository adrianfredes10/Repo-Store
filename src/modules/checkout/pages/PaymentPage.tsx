import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreatePreference } from "../hooks/usePago";
import { Spinner } from "@/shared/ui/Spinner";

export default function PaymentPage() {
  const { pedidoId } = useParams<{ pedidoId: string }>();
  const navigate = useNavigate();
  const createPreference = useCreatePreference();

  useEffect(() => {
    const id = Number(pedidoId);
    if (!isNaN(id)) {
      createPreference.mutate(id);
    }
  // Solo ejecutar al montar
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (createPreference.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full text-center space-y-4">
          <div className="text-4xl">❌</div>
          <h1 className="font-bold text-gray-900 text-lg">Error al iniciar el pago</h1>
          <p className="text-sm text-gray-500">
            {createPreference.error instanceof Error
              ? createPreference.error.message
              : "No se pudo conectar con MercadoPago"}
          </p>
          <button
            onClick={() => navigate(`/pedidos/${pedidoId}`)}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Volver al pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full text-center space-y-4">
        <Spinner />
        <h1 className="font-bold text-gray-900 text-lg">Redirigiendo a MercadoPago...</h1>
        <p className="text-sm text-gray-500">
          Vas a ser redirigido al checkout de MercadoPago para completar tu pago.
        </p>
      </div>
    </div>
  );
}
