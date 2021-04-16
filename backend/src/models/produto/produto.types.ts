import { Document, Model } from 'mongoose'

export interface IProduto {
    _id: string;
    name: string;
    type: string;
    rating: Number;
    value: Number;
    createdAt: Date;
    thumbnail: string;
}

export interface IProdutoDocument extends IProduto, Document {
    _id: string;
    setCreatedAt: (this: IProdutoDocument) => Promise<void>;
    
}

export interface IProdutoModel extends Model<IProdutoDocument> {
    findByType: (
        this: IProdutoModel,
        type: string
    ) => Promise<Array<IProdutoDocument>>;
}

