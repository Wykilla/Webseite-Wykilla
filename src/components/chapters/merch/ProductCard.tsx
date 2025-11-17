'use client'

import { Card, Button } from '@/components/ui'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    id: string
    name: string
    image: string
    price: string
    isPlaceholder: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      hover
      gradient
      className="overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gold/10 mb-4 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.isPlaceholder && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-gold/80 text-ink text-xs font-bold rounded-full">
            PLACEHOLDER
          </div>
        )}
      </div>

      {/* Product Info */}
      <h3 className="font-display text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-2xl font-bold text-gold mb-4">€{product.price}</p>

      {/* Buy Button */}
      <Button variant="primary" fullWidth glow>
        Buy Now
      </Button>
    </Card>
  )
}
