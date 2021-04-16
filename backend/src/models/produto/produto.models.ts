import { model } from 'mongoose';
import ProdutoSchema from './produto.schema';
import { IProdutoDocument, IProdutoModel } from './produto.types';

export const Produto: IProdutoModel = model<IProdutoDocument, IProdutoModel>('produto', ProdutoSchema)