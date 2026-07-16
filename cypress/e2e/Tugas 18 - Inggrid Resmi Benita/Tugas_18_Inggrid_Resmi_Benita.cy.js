describe('Scenario: Testing API Module Categories', () => {

    const baseUrl = 'https://api.escuelajs.co/api/v1';

    it('TC-CATEGORIES-001 -  GET All Categories', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/categories`
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.eq(200);

            // Expected Response Body
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('name');
            expect(response.body[0]).to.have.property('slug');
            expect(response.body[0]).to.have.property('image');
            expect(response.body[0]).to.have.property('creationAt');
            expect(response.body[0]).to.have.property('updatedAt');

            //Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-002 - GET Category By Valid ID', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/categories/118`
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.eq(200);

            // Expected Response Body
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('slug');
            expect(response.body).to.have.property('image');
            expect(response.body).to.have.property('creationAt');
            expect(response.body).to.have.property('updatedAt');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-003 - GET Category By Invalid ID', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/categories/200`,
            failOnStatusCode: false
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.be.oneOf([400, 404]);

            // Expected Response Body
            expect(response.body).to.have.property('message');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-004 - POST Create Category', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/categories`,
            body: {
                name: 'gmmtv Artist',
                image: 'https://phptp.dummy/gmmtv-artist'
            }
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.eq(201);

            // Expected Response Body
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq('gmmtv Artist');
            expect(response.body.image).to.eq('https://phptp.dummy/gmmtv-artist');
            expect(response.body).to.have.property('slug');
            expect(response.body).to.have.property('creationAt');
            expect(response.body).to.have.property('updatedAt');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-005 - POST Create Category With Duplicate Data', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/categories`,
            failOnStatusCode: false,
            body: {
                name: 'gmmtv Artist',
                image: 'https://phptp.dummy/gmmtv-artist'
            }
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.eq(400);

            // Expected Response Body
            expect(response.body).to.have.property('message');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-006 - POST Create Category With Empty Body', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/categories`,
            failOnStatusCode: false,
            body: {}
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.be.oneOf([400, 404, 500]);

            // Expected Response Body
            expect(response.body).to.have.property('message');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-007 - PUT Update Category Invalid ID', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/categories/200`,
            failOnStatusCode: false,
            body: {
                "name": "gmmtv Artist Update",
                "slug": "gmmtv-artist",
                "image": "https://phptp.dummy/gmmtv-artist"
            }
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.be.oneOf([400, 404]);

            // Expected Response Body
            expect(response.body).to.have.property('message');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-008 - PUT Update Category Valid ID', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/categories/118`,
            body: {
                "name": "gmmtv Artist Update",
                "image": "https://phptp.dummy/gmmtv-artist"
            }
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.eq(200);

            // Expected Response Body
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq('gmmtv Artist Update');
            expect(response.body.image).to.eq('https://phptp.dummy/gmmtv-artist');
            expect(response.body).to.have.property('creationAt');
            expect(response.body).to.have.property('updatedAt');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-009 - PUT Update Category Empty Image', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/categories/118`,
            failOnStatusCode: false,
            body: {
                "name": "gmmtv Artist Update",
                "slug": "gmmtv-artist",
                "image": ""
            }
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.eq(400);

            // Expected Response Body
            expect(response.body).to.have.property('message');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-010 - DELETE Invalid ID', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/categories/200`,
            failOnStatusCode: false,
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.be.oneOf([400, 404]);

            // Expected Response Body
            expect(response.body).to.have.property('message');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-011 - DELETE Valid ID', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/categories/118`,
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.eq(200);

            // Expected Response Body
            expect(response.body).to.eq('true');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });

    it('TC-CATEGORIES-012 - PATCH Update Category Valid ID', () => {
        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/categories/80`,
            failOnStatusCode: false,
            body: {
                "name": "dmd Artist Update Patch"
            }
        }).then((response) => {
            // Expected Response Code
            expect(response.status).to.be.oneOf([404, 405]);

            // Expected Response Body
            expect(response.body).to.have.property('message');

            // Expected Response Time
            expect(response.duration).to.be.lessThan(5000);
        });
    });
});