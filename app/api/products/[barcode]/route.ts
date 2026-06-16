import { NextRequest, NextResponse } from 'next/server'
import { getProductByBarcode } from '@/services/productService'
import { connectDB } from '@/lib/mongodb'
import Scan from '@/models/Scan'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ barcode: string }> }
) {
  const { barcode } = await params

  if (!barcode || !/^\d{8,14}$/.test(barcode)) {
    return NextResponse.json({ error: 'Barcode inválido' }, { status: 400 })
  }

  try {
    const product = await getProductByBarcode(barcode)

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    const userId = request.headers.get('x-user-id')
    if (userId) {
      await connectDB()
      Scan.create({ userId, barcode, product: product._id }).catch(console.error)
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('[GET /api/products]', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
