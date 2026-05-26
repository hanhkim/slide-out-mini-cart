'use client'

import type { CartLineItem } from '@/types/cart.types'
import { useCart } from '@/hooks/use-cart'
import { formatCurrency } from '@/utils/currency'
import { useState } from 'react'

type CartItemProps = {
  item: CartLineItem
}

function QtyStepper({ item }: { item: CartLineItem }) {
  const { decrement, increment, isItemPending } = useCart()
  const pending = isItemPending(item.id)
  const [bumpKey, setBumpKey] = useState(0)

  const bump = (delta: number) => {
    setBumpKey((k) => k + 1)
    if (delta > 0) increment(item.id)
    else decrement(item.id)
  }

  return (
    <div className={`mc-stepper ${pending ? 'is-pending' : ''}`}>
      <button
        type="button"
        className="mc-step-btn"
        onClick={() => bump(-1)}
        aria-label={`Decrease quantity of ${item.product.title}`}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
          <path
            d="M3 8h10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <span className="mc-qty" key={`${item.quantity}-${bumpKey}`}>
        {item.quantity}
      </span>
      <button
        type="button"
        className="mc-step-btn"
        onClick={() => bump(1)}
        aria-label={`Increase quantity of ${item.product.title}`}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
          <path
            d="M8 3v10M3 8h10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, isItemPending, currency } = useCart()
  const lineTotal = item.product.price * item.quantity
  const pending = isItemPending(item.id)

  return (
    <li className={`mc-line ${pending ? 'is-pending' : ''}`}>
      <div className="mc-line-img">
        {item.product.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.product.thumbnailUrl} alt="" width={76} height={92} />
        ) : (
          <div className="mc-line-img-placeholder" />
        )}
      </div>
      <div className="mc-line-body">
        <div className="mc-line-head">
          <div className="mc-line-title">
            <div className="mc-line-name">{item.product.title}</div>
          </div>
          <button
            type="button"
            className="mc-line-remove"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.product.title}`}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="mc-line-foot">
          <QtyStepper item={item} />
          <div className="mc-line-price">
            <span className="mc-line-price-amount">
              {formatCurrency(lineTotal, currency)}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}
