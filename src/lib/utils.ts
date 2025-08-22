import { ClientAddress, GetServerAddress } from '@/types/addresses'
import { clsx, type ClassValue } from 'clsx'
import { ForwardedRef } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIsoToDateString(isoString: string): string {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 0-based
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

export const serverToClientAddress = (serverAddress: GetServerAddress) => {
  return {
    id: serverAddress.deliveryAddressId,
    name: serverAddress.recipientName,
    phone: serverAddress.phoneNumber,
    address: {
      roadAddress: serverAddress.roadAddress,
      zonecode: serverAddress.zipCode,
      detailAddress: serverAddress.detailAddress,
      sigungu: '',
      roadnameCode: '',
    },
  } satisfies ClientAddress
}

export function mergeRefs<T>(...refs: (ForwardedRef<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    })
  }
}
