# Food Store — Cliente (store-app)

Frontend de la tienda para el cliente final. Permite navegar el catálogo, ver el detalle de productos con ingredientes, agregar al carrito y confirmar el pedido.

> Este repositorio es solo el cliente. Los otros dos repos del sistema son:
>
> - **admin-app** — panel de administración (productos, categorías, ingredientes, pedidos)
> - **Backend** — API REST con autenticación JWT

---

## Stack

| Tecnología | Propósito |
| --- | --- |
| React 19 + TypeScript | Framework principal |
| Vite 8 | Bundler y dev server |
| Tailwind CSS | Estilos utilitarios |
| React Router DOM | Navegación entre pantallas |
| TanStack Query | Fetching, caching y sincronización con la API |
| Axios | Cliente HTTP con baseURL desde variable de entorno |
| Zustand | Estado global del cliente (carrito) |

---

## Cómo levantar el proyecto

```bash
npm install
cp .env.example .env
npm run dev
```

El servidor corre en `http://localhost:5173`

---

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```bash
VITE_API_URL=http://localhost:3000
```

---

## Estructura de carpetas

```text
src/
├── assets/               # Imágenes, íconos, fuentes estáticas
├── features/             # Módulos por dominio de negocio
│   ├── catalog/          # Productos y categorías
│   │   ├── components/   #   ProductCard, ProductGrid, CategoryFilter
│   │   ├── hooks/        #   useProducts, useCategories
│   │   ├── pages/        #   HomePage, ProductPage
│   │   ├── services/     #   productService, categoryService, ingredientService
│   │   └── types.ts      #   Product, Category, Ingredient
│   ├── cart/             # Carrito de compras
│   │   ├── components/   #   CartDrawer, CartItem, CartSummary
│   │   ├── hooks/        #   useCart
│   │   ├── pages/        #   CartPage
│   │   └── types.ts      #   CartItem
│   └── checkout/         # Flujo de compra
│       ├── components/   #   OrderForm, OrderSummary
│       ├── hooks/        #   useCheckout
│       ├── pages/        #   CheckoutPage
│       ├── services/     #   orderService
│       └── types.ts      #   Order, OrderItem
├── shared/               # Componentes y utilidades reutilizables entre features
│   ├── ui/               #   Button, Input, Card, Modal, Badge, Spinner
│   └── layout/           #   Header, Footer, Navbar, PageWrapper
├── store/                # Estado global Zustand
│   └── useCartStore.ts   #   Items del carrito, cantidades, total
├── router/               # Configuración de rutas
│   └── index.tsx
├── lib/                  # Config de librerías externas
│   ├── axios.ts          #   Instancia con baseURL desde .env
│   └── queryClient.ts    #   Config TanStack Query
├── hooks/                # Hooks globales reutilizables
├── types/                # Tipos TypeScript compartidos entre features
├── utils/                # Funciones puras (formatPrice, formatDate)
└── main.tsx              # Punto de entrada — providers globales
```

> **Regla de imports:** cada feature es autocontenida. No importar directamente de `features/X` desde `features/Y`. El estado compartido va en `store/`, los tipos globales en `types/` y los componentes reutilizables en `shared/`.
> **Nota sobre `shared/`:** en la consigna aparece como `shared/`, que es el nombre estándar para componentes y utilidades transversales. Equivale al común `components/` pero deja en claro que no pertenece a ninguna feature en particular.

---

## Pantallas requeridas (store-app)

| Pantalla | Ruta | Feature | Estado |
| --- | --- | --- | --- |
| Listado de productos | `/` | catalog | ⬜ Por hacer |
| Detalle de producto | `/product/:id` | catalog | ⬜ Por hacer |
| Carrito | `/cart` | cart | ⬜ Por hacer |

> La store-app **no requiere autenticación** en esta entrega.

---

## Estado del desarrollo

### ✅ Completado

- [x] Setup del proyecto (React 19 + TypeScript + Vite)
- [x] Estructura de carpetas según consigna
- [x] Archivos base creados en todas las features

### 📋 Por hacer

#### Dependencias e infraestructura

- [ ] Instalar librerías (ver comandos abajo)
- [ ] `lib/axios.ts` — instancia con `baseURL` desde `VITE_API_URL`
- [ ] `lib/queryClient.ts` — configurar `QueryClient`
- [ ] `main.tsx` — envolver app con `QueryClientProvider` y `BrowserRouter`
- [ ] `.env.example` — agregar `VITE_API_URL`
- [ ] `router/index.tsx` — definir las 3 rutas
- [ ] `store/useCartStore.ts` — estado del carrito con Zustand
- [ ] `App.tsx` — verificar Tailwind con al menos una clase

#### Feature: catalog

- [ ] `types.ts` — `Product`, `Category`, `Ingredient`
- [ ] `services/productService.ts`
- [ ] `services/categoryService.ts`
- [ ] `services/ingredientService.ts`
- [ ] `hooks/useProducts.ts`
- [ ] `hooks/useCategories.ts`
- [ ] `components/ProductCard.tsx`
- [ ] `components/ProductGrid.tsx`
- [ ] `components/CategoryFilter.tsx`
- [ ] `pages/HomePage.tsx` — lista con filtro/búsqueda
- [ ] `pages/ProductPage.tsx` — detalle con ingredientes y botón agregar al carrito

#### Feature: cart

- [ ] `types.ts` — `CartItem`
- [ ] `hooks/useCart.ts`
- [ ] `components/CartItem.tsx`
- [ ] `components/CartSummary.tsx`
- [ ] `components/CartDrawer.tsx`
- [ ] `pages/CartPage.tsx` — items, cantidades, total, confirmar pedido

#### Feature: checkout

- [ ] `types.ts` — `Order`, `OrderItem`
- [ ] `services/orderService.ts`
- [ ] `hooks/useCheckout.ts`
- [ ] `components/OrderForm.tsx`
- [ ] `components/OrderSummary.tsx`
- [ ] `pages/CheckoutPage.tsx`

#### Shared UI

- [ ] `shared/ui/Button.tsx`
- [ ] `shared/ui/Input.tsx`
- [ ] `shared/ui/Card.tsx`
- [ ] `shared/ui/Modal.tsx`
- [ ] `shared/ui/Badge.tsx`
- [ ] `shared/ui/Spinner.tsx`
- [ ] `shared/layout/Navbar.tsx`
- [ ] `shared/layout/Header.tsx`
- [ ] `shared/layout/Footer.tsx`

---

## Convenciones

### Nombrado

- Componentes: `PascalCase` → `ProductCard.tsx`
- Hooks: prefijo `use` → `useCart.ts`
- Services: sufijo `Service` → `productService.ts`
- Stores: prefijo `use` + sufijo `Store` → `useCartStore.ts`
- Types: `PascalCase` → `Product`, `CartItem`

### Commits

```text
feat(catalog): add ProductCard component
fix(cart): correct quantity update logic
chore(lib): configure axios base instance
```
