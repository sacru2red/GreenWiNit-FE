import { ServerAddress } from '@/api/address'
import { ClientAddress } from '@/types/addresses'
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

export function initHistoryAndLocation(to: string = '/') {
  // 브라우저의 히스토리 스택을 완전히 클리어하고 싶지만,
  // 해당 방법을 찾지 못했음 (아마 보안상의 이유로 그런 방법이 없는 것으로 추측)
  // 스택에 루트 두개 넣어서 뒤로가기 버튼 눌러도 루트로 이동하게끔 처리함
  if (window.location.pathname !== to) {
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }
  window.history.pushState(null, '', to)
  window.history.pushState(null, '', to)
}

export const serverToClientAddress = (serverAddress: ServerAddress): ClientAddress => {
  return {
    id: serverAddress.deliveryAddressId,
    name: serverAddress.recipientName,
    phone: serverAddress.phoneNumber,
    address: {
      roadAddress: serverAddress.roadAddress,
      zoneCode: serverAddress.zipCode,
      detailAddress: serverAddress.detailAddress,
    },
  }
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
