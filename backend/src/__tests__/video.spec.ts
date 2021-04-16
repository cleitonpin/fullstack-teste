import request from 'supertest';
import { app } from "../app";
import { connect, disconnect } from "../configs/db";
import { Produto } from '../models/produto/produto.models';

const produto = {
    name: "Bebendo água",
    type: "video",
    value: 10.99,
    rating: 5.7,
    thumbnail: ""
};



describe('produto', () => {
    let _id = '';

    beforeAll(async () => {
        const product = await Produto.create(produto);
        _id = product._id;
        connect();
    })

    afterAll(() => {
        disconnect();
    })

    it('must be able to create product', async () => {
        const res = await request(app).post('/').send(produto);
        expect(res.status).toBe(201);
    });

    it('should be able delete a product', async () => {
        const res = await request(app).delete(`/${_id}`);

        expect(res.status).toBe(204);
    });

    it('should not be able delete a product', async () => {
        const res = await request(app).delete(`/1232142141b123`);

        expect(res.status).toBe(404);
    });

    it('should be able update a product', async () => {
        const res = await request(app).put(`/${_id}`).send({
            name: "Hidratando-se"
        })

        expect(res.status).toBe(204);
    });

    it('should not be able update a product', async () => {
        const res = await request(app).put(`/1232421421`).send({
            name: "Hidratando-se"
        })

        expect(res.status).toBe(404);
    });

    it('should be able list all products', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
    })

    it('should be able list all products/produtos by type of filter', async () => {
        const res = await request(app).get('/').query({
            type: 'video'
        });

        expect(res.status).toBe(200);
    })

    it('must be able to list all products  in order', async () => {
        const res = await request(app).get('/').query({
            sort: 'priceDown'
        });

        expect(res.status).toBe(200);
    })
    it('must be able to list all products by type and in order', async () => {
        const res = await request(app).get('/').query({
            sort: 'priceDown',
            type: 'video'
        });

        expect(res.status).toBe(200);
    })
})