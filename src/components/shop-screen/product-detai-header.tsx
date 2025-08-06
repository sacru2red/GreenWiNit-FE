import PageHeaderSection from '../common/page-header-section'

interface ProductDetailHeaderProps {
  imgUrl: string | undefined
  name: string | undefined
  price: number | undefined
}

const ProductDetailHeader = ({ imgUrl, name, price }: ProductDetailHeaderProps) => {
  return (
    <div className="relative w-full bg-white">
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
      </PageHeaderSection>
      <div className="flex h-[300px] w-full justify-center bg-gray-100 p-[2px]">
        <img src={imgUrl} alt="Product" />
      </div>
      <div className="px-[16px] py-[8px] text-left font-bold">
        <p className="text-xl text-black">{name}</p>
        <p className="text-2xl text-green-500">{price} 포인트</p>
      </div>
      <hr />
    </div>
  )
}

export default ProductDetailHeader
