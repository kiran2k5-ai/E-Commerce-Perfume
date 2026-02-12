import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"

const Cart = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state?.product
  const [count, setCount] = useState(1)
  const [related, setRelated] = useState([])

  // Fetch related products
  useEffect(() => {
    if (!product) return

    window.scrollTo(0, 0)

    const fetchRelated = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/product/related",
          {
            category: product.category,
            id: product.id
          }
        )
        setRelated(res.data)
      } catch (error) {
        console.log("Error fetching related products:", error)
      }
    }

    fetchRelated()
  }, [product])

  if (!product) {
    return (
      <div className="text-center mt-40 text-2xl">
        Cart is empty
      </div>
    )
  }

  return (
    <div>

      {/* ================= MAIN PRODUCT ================= */}
      <div className="flex justify-center gap-40 text-black mt-20">

        <img
          src={product.image}
          alt={product.name}
          className="mt-10 w-[300px] h-[300px] rounded-xl object-cover"
        />

        <div className="flex flex-col gap-5 justify-center items-center text-xl font-serif italic border w-[550px] h-[600px] rounded-2xl p-6">

          <h1 className="text-3xl font-semibold">
            {product.name}
          </h1>

          <div className="flex flex-col text-center gap-2">
            <p>{product.description}</p>
            <p className="font-semibold">{product.price}</p>
          </div>

          <p className="text-center text-gray-600 px-6">
            Captures the essence of a carefree breeze through wildflower fields,
            evoking pure joy with its light and refreshing notes.
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            Qty
            <div className="w-16 h-10 border flex items-center justify-center rounded">
              {count}
            </div>
            <button
              onClick={() => setCount(count + 1)}
              className="px-3 text-xl"
            >
              +
            </button>
            <button
              onClick={() => count > 1 && setCount(count - 1)}
              className="px-3 text-xl"
            >
              -
            </button>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-72 h-10 bg-green-400 rounded-2xl hover:bg-green-500 transition"
          >
            Buy
          </button>

          <div className="flex justify-between items-center w-80 h-10 bg-pink-100 px-4 rounded">
            SCENT NOTES <button>+</button>
          </div>

          <div className="flex justify-between items-center w-80 h-10 bg-pink-100 px-4 rounded">
            INGREDIENTS <button>+</button>
          </div>

        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="mt-20 px-20">

        <h1 className="font-serif italic text-4xl text-center mb-10">
          Things Related To Your Taste....
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {related.length > 0 ? (
            related.map(item => (
              <div
                key={item._id}
                className="border rounded-xl p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[200px] w-full object-cover rounded"
                />

                <h2 className="mt-4 font-semibold">
                  {item.name}
                </h2>

                <p className="text-gray-600">
                  ₹{item.price}
                </p>

                <button
                  className="mt-2 px-5 py-2 text-sm bg-gradient-to-r from-pink-300 to-purple-600 text-white rounded-full hover:shadow-md transition"
                  onClick={() =>
                    navigate("/cart", {
                      state: { product: item }
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No related products found
            </p>
          )}
        </div>
      </div>
      <Carousel
  additionalTransfrom={0}
  arrows
  autoPlay
  autoPlaySpeed={1000}
  centerMode={false}
  className=""
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite={false}
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  }}
  rewind
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots={false}
  sliderClass=""
  slidesToSlide={2}
  swipeable
>
  <WithStyles
    description="React Carousel with Server Side Rendering Support – Part 1"
    headline="w3js.com - web front-end studio"
    image="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  />
</Carousel>
    </div>
  )
}

export default Cart
