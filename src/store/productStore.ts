import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  status: string
  value: number
  thumbnail: string
}

interface ProductStore {
  products: Product[]
  setProducts: (products: Product[]) => void
  getProductById: (id: string) => Product | undefined
}

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        setProducts: (products) => set({ products }),
        getProductById: (id) => {
          const state = get()
          return state.products.find((product) => product.id === id)
        },
      }),
      {
        name: 'product-store',
      },
    ),
  ),
)
