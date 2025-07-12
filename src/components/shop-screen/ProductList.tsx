const shopProducts = [
  {
    id: 1,
    name: '에코 텀블러',
    status: '교환가능',
    value: 1200,
    thumbnail: 'img/2.png',
  },
  {
    id: 2,
    name: '에코 백',
    status: '품절',
    value: 850,
    thumbnail: 'img/2.png',
  },
  {
    id: 3,
    name: '대나무 칫솔 세트',
    status: '교환가능',
    value: 600,
    thumbnail: 'img/2.png',
  },
  {
    id: 1,
    name: '에코 텀블러',
    status: '교환가능',
    value: 450,
    thumbnail: 'img/2.png',
  },
  {
    id: 1,
    name: '에코 텀블러',
    status: '교환가능',
    value: 1200,
    thumbnail: 'img/2.png',
  },
  {
    id: 2,
    name: '에코 백',
    status: '품절',
    value: 850,
    thumbnail: 'img/2.png',
  },
  {
    id: 3,
    name: '대나무 칫솔 세트',
    status: '교환가능',
    value: 600,
    thumbnail: 'img/2.png',
  },
  {
    id: 1,
    name: '에코 텀블러',
    status: '교환가능',
    value: 450,
    thumbnail: 'img/2.png',
  },
]

// const formatPrice = (price: number) => {
//   return price.toLocaleString('ko-KR');
// };

const ProductList = () => {
  return (
    <div className="px-[17px] py-[26px]">
      <div className="grid grid-cols-2">
        {shopProducts.map((product) => {
          return (
            <div key={product.id} className="rounded-[25px] p-[16px] text-left">
              <div className="mb-[8px] min-h-[140px] min-w-[140px] items-center justify-center rounded-[10px] bg-white p-[20px]">
                <img
                  className="items-center justify-center"
                  src={product.thumbnail}
                  alt={product.name}
                  width="160"
                  height="160"
                />
              </div>
              <p className="text-sm text-black">{product.name}</p>
              <p className="text-xs text-gray-500">{product.status}</p>
              <p className="text-lg text-green-600">{product.value}p</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList
