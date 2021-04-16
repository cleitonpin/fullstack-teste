import { Schema } from 'mongoose';
import { IProdutoDocument } from './produto.types';

const ProdutoSchema = new Schema({
    name: String,
    type: String,
    value: Number,
    rating: Number,
    thumbnail: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})


// statics
ProdutoSchema.statics.findByType = function(type: string | null): Promise<IProdutoDocument> {
    if (!type) {
        return this.find();
    }

    return this.find({ type })
};


export default ProdutoSchema;