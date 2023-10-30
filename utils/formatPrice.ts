import React from 'react'

export const formatPrice = (amount: number) => {
  return (
    new Intl.NumberFormat (
        'en-Uk', {
            style: 'currency',
            currency: 'usd'
        }
    ).format(amount)
  )
}
