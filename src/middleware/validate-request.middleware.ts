import { Request, Response, NextFunction, RequestHandler } from 'express';
import mongoose from 'mongoose';

/**
 * Middleware to validate MongoDB ObjectId
 */
export const validateObjectId = (idField: string) => {
    return function (req: Request, res: Response, next: NextFunction): void {
      const id = req.params[idField] || req.body[idField];
  
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
          success: false,
          message: `Invalid ${idField}`,
        });
        return;
      }
  
      next();
    };
  };

/**
 * Middleware to validate request body based on common validations
 */
export const validateSaleBody = (req: Request, res: Response, next: NextFunction): void => {
  const { products, buyer, amountPaid, grandTotal, status } = req.body;
  
  // Basic validation
  if (!products || !Array.isArray(products) || products.length === 0) {
    res.status(400).json({
      success: false,
      message: 'At least one product is required'
    });
    return;
  }
  
  if (!buyer) {
    res.status(400).json({
      success: false,
      message: 'Buyer is required'
    });
    return;
  }
  
  if (typeof amountPaid !== 'number' || amountPaid < 0) {
    res.status(400).json({
      success: false,
      message: 'Amount paid must be a number and at least 0'
    });
    return;
  }
  
  if (typeof grandTotal !== 'number' || grandTotal < 0) {
    res.status(400).json({
      success: false,
      message: 'Grand total must be a number and at least 0'
    });
    return;
  }
  
  if (status !== 'completed' && status !== 'due') {
    res.status(400).json({
      success: false,
      message: 'Status must be either "completed" or "due"'
    });
    return;
  }
  
  // Validate products
  for (let i = 0; i < products.length; i++) {
    const { product, quantity, pricePerUnit, totalAmount } = products[i];
    
    if (!product || !mongoose.Types.ObjectId.isValid(product)) {
      res.status(400).json({
        success: false,
        message: `Invalid product ID in product at index ${i}`
      });
      return;
    }
    
    if (typeof quantity !== 'number' || quantity < 1) {
      res.status(400).json({
        success: false,
        message: `Quantity must be a number and at least 1 in product at index ${i}`
      });
      return;
    }
    
    if (typeof pricePerUnit !== 'number' || pricePerUnit < 0) {
      res.status(400).json({
        success: false,
        message: `Price per unit must be a number and at least 0 in product at index ${i}`
      });
      return;
    }
    
    if (typeof totalAmount !== 'number' || totalAmount < 0) {
      res.status(400).json({
        success: false,
        message: `Total amount must be a number and at least 0 in product at index ${i}`
      });
      return;
    }
  }
  
  next();
};