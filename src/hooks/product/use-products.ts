import { useQuery } from '@tanstack/react-query'
import { productQueryKeys, productsApi } from '@/api/products'

const useProducts = () => {
  return useQuery({
    queryKey: productQueryKeys.products.list().queryKey,
    queryFn: () => productsApi.getProducts(),
  })
}

export default useProducts
