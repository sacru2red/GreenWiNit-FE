import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/api/products'

const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['products', 'detail', id],
    queryFn: () => productsApi.getProduct(id),
  })
}

export default useProduct
