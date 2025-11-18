'use client'

import { assets } from '@/config/assets'
import ProductCard from './ProductCard'
import CommunitySection from './CommunitySection'
import Testimonials from './Testimonials'

export default function MerchSection() {
  const products = assets.merch.products

  return (
    <section
      id="merch"
      className="relative min-h-screen py-20 bg-gradient-to-b from-ink via-gold/10 to-ink"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-gold to-magenta bg-clip-text text-transparent">
            Merch & Community
          </span>
        </h2>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Community section */}
        <CommunitySection />

        {/* Testimonials */}
        <Testimonials />
      </div>
    </section>
  )
}
