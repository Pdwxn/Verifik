import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Scan from '@/models/Scan'

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id')

  if (!userId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  try {
    await connectDB()
    const scans = await Scan.find({ userId })
      .sort({ scannedAt: -1 })
      .limit(50)
      .populate('product', 'name brand imageUrl score scoreLabel productType barcode')
      .lean()

    return NextResponse.json({ scans })
  } catch (error) {
    console.error('[GET /api/scans]', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
