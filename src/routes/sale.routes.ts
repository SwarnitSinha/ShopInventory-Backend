import express from 'express';
import { SaleController } from '../controllers/sale.controller';
import { validateSaleBody, validateObjectId } from '../middleware/validate-request.middleware';
import { authenticateUser } from '../middleware/auth.middleware';

const router = express.Router();

// Soft delete a sale
router.post('/delete/:id', validateObjectId('id'), SaleController.deleteSale);

/**
 * @route GET /api/sales
 * @description Get all sales with pagination
 * @access Private
 */
router.get(
    '/', authenticateUser,
    SaleController.getSales.bind(SaleController)
  );
  
  
  
  /**
   * @route POST /api/sales
   * @description Create a new sale
   * @access Private
   */
  router.post(
    '/', authenticateUser,
    validateSaleBody,
    SaleController.createSale.bind(SaleController)
  );

   router.get('/filter',authenticateUser, SaleController.searchSales.bind(SaleController));
  
  /**
   * @route GET /api/sales/:id
   * @description Get a sale by ID
   * @access Private
   */
  router.get(
    '/:id', authenticateUser, 
    validateObjectId('id'),
    SaleController.getSaleById.bind(SaleController)
  );
  
  /**
   * @route PATCH /api/sales/:id
   * @description Update a sale by ID
   * @access Private
   */
  router.patch(
    '/:id', authenticateUser,
    validateObjectId('id'),
    SaleController.updateSale.bind(SaleController)
  );



// Create a new sale
router.post( '/',authenticateUser, validateSaleBody, SaleController.createSale.bind(SaleController)  );


export default router;
