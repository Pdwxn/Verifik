'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const BarcodeScanner = dynamic(() => import('@/components/scanner/BarcodeScanner'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function ScanPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastScanned, setLastScanned] = useState<string | null>(null)

  const handleDetected = useCallback(async (barcode: string) => {
    if (loading || barcode === lastScanned) return
    setLastScanned(barcode)
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/products/${barcode}`)
      if (res.ok) {
        router.push(`/product/${barcode}`)
      } else if (res.status === 404) {
        setError('Producto no encontrado en nuestra base de datos')
        setTimeout(() => { setError(null); setLastScanned(null) }, 3000)
      } else {
        setError('Error al buscar el producto')
        setTimeout(() => { setError(null); setLastScanned(null) }, 3000)
      }
    } catch {
      setError('Sin conexión a internet')
      setTimeout(() => { setError(null); setLastScanned(null) }, 3000)
    } finally {
      setLoading(false)
    }
  }, [loading, lastScanned, router])

  return (
    <div className="fixed inset-0 bg-black" style={{ maxWidth: '448px', margin: '0 auto' }}>
      <BarcodeScanner onDetected={handleDetected} onError={setError} />

      <div className="absolute top-0 left-0 right-0">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-white font-bold text-lg drop-shadow">Verifik</h1>
          <div className="w-8 h-8 bg-white/20 rounded-full" />
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-white font-medium">Buscando producto...</p>
        </div>
      )}

      {error && (
        <div className="absolute top-20 left-4 right-4">
          <div className="bg-red-500 text-white px-4 py-3 rounded-xl text-sm font-medium text-center shadow-lg">
            {error}
          </div>
        </div>
      )}
    </div>
  )
}
