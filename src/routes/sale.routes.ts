import express from 'express';
import { SaleController } from '../controllers/sale.controller';

const router = express.Router();

// Get all sales
router.get('/', SaleController.getSales);

// Get a sale by ID
router.get('/:id', SaleController.getSaleById);

//filter
router.get('/filter', SaleController.filterSales);

// Create a new sale
router.post('/', SaleController.createSale);

// Update a sale by ID
router.patch('/:id', SaleController.updateSale);

// Soft delete a sale by ID
router.delete('/:id', SaleController.deleteSale);

export default router;
