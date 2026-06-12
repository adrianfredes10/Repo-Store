export interface PedidoItemInput {
  producto_id: number;
  cantidad: number;
}

export interface PedidoCreateRequest {
  direccion_entrega_id: number;
  forma_pago_id: number;
  observaciones?: string;
  items: PedidoItemInput[];
}

export interface DetallePedido {
  id?: number;
  producto_id: number | null;
  producto_nombre: string;
  precio_unitario: string;
  cantidad: number;
  subtotal: string;
}

export interface EstadoPedido {
  id: number;
  codigo: string;
  nombre: string;
  orden: number;
}

export interface FormaPago {
  id: number;
  codigo: string;
  nombre: string;
  activa: boolean;
}

export interface DireccionEntrega {
  id: number;
  usuario_id?: number;
  alias: string;
  calle: string;
  numero?: string;
  referencia?: string | null;
  ciudad?: string;
  codigo_postal?: string;
  es_principal?: boolean;
  created_at?: string;
}

export interface HistorialEstado {
  estado_anterior: EstadoPedido | null;
  estado_nuevo: EstadoPedido;
  usuario: { id: number; nombre: string } | null;
  fecha: string;
  observacion: string | null;
}

export interface Pedido {
  id: number;
  usuario_id: number;
  estado: EstadoPedido;
  total: string;
  observaciones: string | null;
  fecha_creacion: string;
  fecha_confirmacion: string | null;
  fecha_entrega: string | null;
  items: DetallePedido[];
  historial: HistorialEstado[];
  direccion_entrega: DireccionEntrega;
  forma_pago: FormaPago;
}

// Pagos
export interface PagoCrearResponse {
  pago_id: number;
  preference_id: string;
  init_point: string;
  public_key: string | null;
}
