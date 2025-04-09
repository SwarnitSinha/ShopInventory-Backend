import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the individual product in a sale
export interface ISaleProduct {
  product: mongoose.Types.ObjectId | string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
}

// Interface for the Sale document
export interface ISale extends Document {
  invoiceNumber: string;
  products: ISaleProduct[];
  buyer: mongoose.Types.ObjectId | string;
  amountPaid: number;
  grandTotal: number;
  status: 'completed' | 'due';
  isDeleted: boolean;
  saleDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema for products in a sale
const SaleProductSchema = new Schema<ISaleProduct>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: [0, 'Price per unit must be at least 0']
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount must be at least 0']
  }
}, { _id: false });

// Helper function to generate invoice numbers
function generateInvoiceNumber() {
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD format
  const randomPart = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  return `INV-${datePart}-${randomPart}`;
}

// Create the schema for sales
const SaleSchema = new Schema<ISale>({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    default: generateInvoiceNumber, // Generate automatically
  },
  products: {
    type: [SaleProductSchema],
    required: true,
    validate: {
      validator: function(products: ISaleProduct[]) {
        return products.length > 0;
      },
      message: 'At least one product is required'
    }
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer',
    required: [true, 'Buyer is required']
  },
  amountPaid: {
    type: Number,
    required: true,
    min: [0, 'Amount paid must be at least 0']
  },
  grandTotal: {
    type: Number,
    required: true,
    min: [0, 'Total amount must be at least 0']
  },
  status: {
    type: String,
    enum: ['completed', 'due'],
    required: true
  },
  saleDate: {
    type: Date,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create and export the model
const Sale = mongoose.model<ISale>('Sale', SaleSchema);

export default Sale;