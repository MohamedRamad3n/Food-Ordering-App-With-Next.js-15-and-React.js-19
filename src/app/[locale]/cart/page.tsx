import CartItem from "./_components/CartItem"
import CartItemForm from "./_components/CartItemForm"

const cartPage = () => {
  return (
    <main>
      <section className='section-gap'>
        <div className='container'>
          <h1 className='text-primary text-center font-bold text-4xl italic mb-10'>
            Cart
          </h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <CartItem />
            <CartItemForm />
          </div>
        </div>
      </section>
    </main>
  )
}

export default cartPage
