import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

/**
 * Middleware to validate sale update data
 */
export const validateUpdateSale = (req: Request, res: Response, next: NextFunction): void => {
  const { products, buyer, amountPaid, grandTotal, status, saleDate } = req.body;
  
  // Skip validation if no data provided (empty update)
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      success: false,
      message: 'No update data provided'
    });
    return;
  }
  
  // Validate products if provided
  if (products !== undefined) {
    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({
        success: false,
        message: 'If products are provided, at least one product is required'
      });
      return;
    }
    
    // Validate each product
    for (let i = 0; i < products.length; i++) {
      const { product, quantity, pricePerUnit, totalAmount } = products[i];
      
      if (!product || !mongoose.Types.ObjectId.isValid(product)) {
        res.status(400).json({
          success: false,
          message: `Invalid product ID in product at index ${i}`
        });
        return;
      }
      
      if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 1)) {
        res.status(400).json({
          success: false,
          message: `Quantity must be a number and at least 1 in product at index ${i}`
        });
        return;
      }
      
      if (pricePerUnit !== undefined && (typeof pricePerUnit !== 'number' || pricePerUnit < 0)) {
        res.status(400).json({
          success: false,
          message: `Price per unit must be a number and at least 0 in product at index ${i}`
        });
        return;
      }
      
      if (totalAmount !== undefined && (typeof totalAmount !== 'number' || totalAmount < 0)) {
        res.status(400).json({
          success: false,
          message: `Total amount must be a number and at least 0 in product at index ${i}`
        });
        return;
      }
    }
  }
  
  // Validate buyer if provided
  if (buyer !== undefined && (!buyer || !mongoose.Types.ObjectId.isValid(buyer))) {
    res.status(400).json({
      success: false,
      message: 'Invalid buyer ID'
    });
    return;
  }
  
  // Validate amountPaid if provided
  if (amountPaid !== undefined && (typeof amountPaid !== 'number' || amountPaid < 0)) {
    res.status(400).json({
      success: false,
      message: 'Amount paid must be a number and at least 0'
    });
    return;
  }
  
  // Validate grandTotal if provided
  if (grandTotal !== undefined && (typeof grandTotal !== 'number' || grandTotal < 0)) {
    res.status(400).json({
      success: false,
      message: 'Grand total must be a number and at least 0'
    });
    return;
  }
  
  // Validate status if provided
  if (status !== undefined && status !== 'completed' && status !== 'due') {
    res.status(400).json({
      success: false,
      message: 'Status must be either "completed" or "due"'
    });
    return;
  }
  
  // Validate saleDate if provided
  if (saleDate !== undefined && saleDate !== null) {
    const date = new Date(saleDate);
    if (isNaN(date.getTime())) {
      res.status(400).json({
        success: false,
        message: 'Invalid sale date format'
      });
      return;
    }
  }
  
  next();
};