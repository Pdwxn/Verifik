import ProductCard from '@/components/product/ProductCard'
import { getRecentScans } from '@/services/productService'

async function getUserId(): Promise<string | null> {
  return null
}

export default async function HistoryPage() {
  const userId = await getUserId()
  const products = userId ? await getRecentScans(userId) : []

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Historial</h1>

      {!userId && (
        <div className="bg-blue-50 rounded-2xl p-4 text-center mb-4">
          <p className="text-blue-700 text-sm font-medium">Inicia sesión para guardar tu historial</p>
        </div>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="text-5xl">📭</div>
          <p className="font-semibold text-gray-700">Aún no has escaneado productos</p>
          <p className="text-sm text-gray-400">Escanea tu primer producto para verlo aquí</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
