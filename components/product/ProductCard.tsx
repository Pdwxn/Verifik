import Image from 'next/image'
import Link from 'next/link'
import type { IProduct } from '@/types/product'
import ScoreBadge from '@/components/ui/ScoreBadge'

interface Props {
  product: IProduct
}

const TYPE_LABELS: Record<string, string> = {
  food: 'Alimento', beverage: 'Bebida', cosmetic: 'Cosmético',
  personal_care: 'Aseo personal', household: 'Hogar', other: 'Otro',
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.barcode}`}
      className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform">
      <div className="w-14 h-14 rounded-xl bg-gray-50 flex-shrink-0 overflow-hidden">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name ?? 'Producto'} width={56} height={56}
            className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">📦</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate text-sm">{product.name ?? 'Sin nombre'}</p>
        <p className="text-xs text-gray-400 truncate">{product.brand ?? '—'}</p>
        <span className="inline-block mt-1 text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
          {TYPE_LABELS[product.productType] ?? product.productType}
        </span>
      </div>
      {product.score !== undefined && product.scoreLabel && (
        <ScoreBadge score={product.score} label={product.scoreLabel} />
      )}
    </Link>
  )
}
