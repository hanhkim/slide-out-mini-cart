'use client'

import { getProduct } from '@/services/products.service'
import type { Product } from '@/types/cart.types'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

type HeroProductProps = {
  productId: string
}

export default function HeroProduct({ productId }: HeroProductProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      setLoading(true)
      setError(null)

      try {
        const data = await getProduct(productId)
        if (!cancelled) {
          setProduct(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load product'
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadProduct()

    return () => {
      cancelled = true
    }
  }, [productId])

  useEffect(() => {
    if (loading || !cardRef.current) return

    const animation = gsap.fromTo(
      cardRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
    )

    return () => {
      animation.kill()
    }
  }, [loading])

  if (loading) {
    return (
      <section className="hero-product-shell">
        <div className="hero-product-status">Loading product...</div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="hero-product-shell">
        <div className="hero-product-status hero-product-status--error">
          {error ?? 'Product not found'}
        </div>
      </section>
    )
  }

  return (
    <section className="hero-product-shell" ref={cardRef}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <span>${product.price}</span>
      {product.highResImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="hero-product-image"
          src={product.highResImageUrl}
          alt={product.title}
        />
      ) : (
        <div className="hero-product-image hero-product-image--placeholder" />
      )}
    </section>
  )
}
