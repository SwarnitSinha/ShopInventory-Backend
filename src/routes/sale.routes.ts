import express from 'express';
import { SaleController } from '../controllers/sale.controller';

const router = express.Router();

// Get all sales
router.get('/', SaleController.getSales);

// Filter sales (must come before `/:id`)
router.get('/filter', SaleController.filterSales);

// Get a sale by ID
router.get('/:id', SaleController.getSaleById);

// Create a new sale
router.post('/', SaleController.createSale);

// Update a sale by ID
router.patch('/:id', SaleController.updateSale);

// Soft delete a sale
router.delete('/delete', SaleController.deleteSale);

export default router;
