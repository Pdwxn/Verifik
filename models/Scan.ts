import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IScan {
  userId?: mongoose.Types.ObjectId
  barcode: string
  product?: mongoose.Types.ObjectId
  scannedAt: Date
}

export interface ScanDocument extends IScan, Document {}

const ScanSchema = new Schema<ScanDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  barcode: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  scannedAt: { type: Date, default: Date.now },
})

const Scan: Model<ScanDocument> =
  mongoose.models.Scan ?? mongoose.model<ScanDocument>('Scan', ScanSchema)

export default Scan
