process.env.NODE_ENV = "test";

const request = require('supertest');

const app = require('./app');
let items = require('./fakeDb');

let cheetos = {
    "name": "cheetos",
    "price": 2.50
};

beforeEach(function() {
    items.push(cheetos);
});

afterEach(function() {
    items.length = 0;
}); 

describe("GET /items", function () {
    test("Get list of items", async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual([{
            "name": "cheetos",
            "price": 2.50
        }])
    })
})

describe("POST /items", function() {
    test("Create new item", async function() {
        const resp = await request(app)
            .post('/items')
            .send({
                "name": "gummi",
                "price": 1.25
            });
        
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            "added": {
                "name": "gummi",
                "price": 1.25
            }
        })
    })
})

describe("PATCH /items/[name]", function() {
    test("Update a single item", async function() {
        const resp = await request(app)
            .patch(`/items/${cheetos.name}`)
            .send({
                "name": "cheetos2",
                "price": 2.50
            });
        
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            "updated": {
                "name": "cheetos2",
                "price": 2.50
            }
        })
    })
})

describe("DELETE /items/[name]", function() {
    test("Delete an item", async function() {
        const resp = await request(app).delete(`/items/${cheetos.name}`);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ "message": "Deleted" })
    })
})