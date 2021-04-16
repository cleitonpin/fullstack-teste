import { Router } from 'express';
import ProdutoController from './controllers/ProdutoController';

const router = Router();

router.post('/produto', ProdutoController.create);
router.get('/:name', ProdutoController.search);
router.get('/', ProdutoController.index);
router.delete('/:_id', ProdutoController.delete);
router.put('/:_id', ProdutoController.update);

export { router };
