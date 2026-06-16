import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import * as openFoodFactsService from './openFoodFactsService'
import * as openBeautyFactsService from './openBeautyFactsService'
import { calculate } from './scoringService'
import type { IProduct } from '@/types/product'

function serializeProduct(doc: unknown): IProduct {
  return JSON.parse(JSON.stringify(doc))
}

export async function getProductByBarcode(barcode: string): Promise<IProduct | null> {
  try {
    await connectDB()
  } catch (error) {
    console.error('[productService] MongoDB connection failed:', error)
    return null
  }

  try {
    const cached = await Product.findOne({ barcode }).lean()
    if (cached) return serializeProduct(cached)

    const foodData = await openFoodFactsService.fetch(barcode)
    if (foodData) {
      const scored = calculate(foodData)
      const product = await Product.create({ barcode, ...foodData, ...scored })
      return serializeProduct(product.toObject())
    }

    const beautyData = await openBeautyFactsService.fetch(barcode)
    if (beautyData) {
      const scored = calculate(beautyData)
      const product = await Product.create({ barcode, ...beautyData, ...scored })
      return serializeProduct(product.toObject())
    }

    return null
  } catch (error) {
    console.error('[productService] getProductByBarcode error:', error)
    return null
  }
}

export async function getRecentScans(userId: string, limit = 20): Promise<IProduct[]> {
  try {
    await connectDB()
  } catch (error) {
    console.error('[productService] MongoDB connection failed:', error)
    return []
  }

  try {
    const { default: Scan } = await import('@/models/Scan')
    const scans = await Scan.find({ userId })
      .sort({ scannedAt: -1 })
      .limit(limit)
      .populate('product')
      .lean()
    return scans
      .map(s => (s.product ? serializeProduct(s.product) : null))
      .filter(Boolean) as IProduct[]
  } catch (error) {
    console.error('[productService] getRecentScans error:', error)
    return []
  }
}
