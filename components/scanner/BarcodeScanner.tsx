'use client'

import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'

interface Props {
  onDetected: (barcode: string) => void
  onError?: (error: string) => void
}

export default function BarcodeScanner({ onDetected, onError }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsRef = useRef<{ stop: () => void } | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    const reader = new BrowserMultiFormatReader()

    const originalConsoleError = console.error
    console.error = (...args: unknown[]) => {
      const msg = args[0]?.toString() ?? ''
      if (
        msg.includes('MultiFormatReader') ||
        msg.includes('NotFoundException') ||
        msg.includes('ChecksumException') ||
        msg.includes('non-ReaderException')
      ) {
        return
      }
      originalConsoleError.apply(console, args)
    }

    const startScanning = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices()
        if (devices.length === 0) {
          onError?.('No se encontró cámara')
          setHasPermission(false)
          return
        }

        const backCamera = devices.find(d =>
          d.label.toLowerCase().includes('back') ||
          d.label.toLowerCase().includes('rear') ||
          d.label.toLowerCase().includes('environment')
        ) ?? devices[0]

        setHasPermission(true)
        setIsScanning(true)

        const controls = await reader.decodeFromVideoDevice(
          backCamera.deviceId,
          videoRef.current!,
          (result, error) => {
            if (result) {
              onDetected(result.getText())
            }
          }
        )
        controlsRef.current = controls
      } catch {
        setHasPermission(false)
        onError?.('No se pudo acceder a la cámara')
      }
    }

    startScanning()

    return () => {
      controlsRef.current?.stop()
      console.error = originalConsoleError
    }
  }, [onDetected, onError])

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">Acceso a la cámara denegado</p>
        <p className="text-sm text-gray-400">Habilita el permiso de cámara en la configuración de tu navegador</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-40">
            <div className="absolute inset-0 bg-transparent border-2 border-white/80 rounded-lg" />
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-6 h-6 border-emerald-400 border-2 ${
                i === 0 ? 'border-r-0 border-b-0 rounded-tl-sm' :
                i === 1 ? 'border-l-0 border-b-0 rounded-tr-sm' :
                i === 2 ? 'border-r-0 border-t-0 rounded-bl-sm' :
                          'border-l-0 border-t-0 rounded-br-sm'
              }`} />
            ))}
            {isScanning && (
              <div className="absolute left-2 right-2 top-1/2 h-0.5 bg-emerald-400 opacity-80"
                style={{ animation: 'scanLine 2s ease-in-out infinite' }} />
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/80 text-sm">Apunta al código de barras del producto</p>
      </div>
      <style>{`
        @keyframes scanLine {
          0%, 100% { transform: translateY(-30px); opacity: 0.3; }
          50% { transform: translateY(30px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
