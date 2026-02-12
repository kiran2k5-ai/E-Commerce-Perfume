import React from 'react'
    import axios from "axios"
const Checkout = () => {
  return (
const handlePayment = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: product.price
      }
    )

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: data.amount,
      currency: data.currency,
      name: "Perfume Store",
      description: product.name,
      order_id: data.id,
      handler: function (response) {
        alert("Payment Successful")
        console.log(response)
      },
      theme: {
        color: "#ec4899"
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  } catch (error) {
    console.log(error)
  }
}

    <div>
      
    </div>
  )
}

export default Checkout
