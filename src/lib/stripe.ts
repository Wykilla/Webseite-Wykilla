import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const getStripeCustomer = async (email: string) => {
  const customers = await stripe.customers.list({ email, limit: 1 })
  return customers.data[0]
}

export const createStripeCustomer = async (email: string, name?: string) => {
  return await stripe.customers.create({
    email,
    name,
  })
}
