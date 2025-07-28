import { useQuery } from '@tanstack/react-query'
import { productQueryKeys, productsApi } from '@/api/products'

const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: productQueryKeys.detail(id).queryKey,
    queryFn: () => productsApi.getProduct(id),
  })
}

export default useProduct
