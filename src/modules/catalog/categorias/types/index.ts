export interface CategoriaSimple {
  id: number;
  nombre: string;
  descripcion: string | null;
  parent_id: number | null;
  activa: boolean;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
  parent_id: number | null;
  activa: boolean;
  created_at: string;
  subcategorias: CategoriaSimple[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
