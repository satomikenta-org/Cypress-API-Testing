


const token = "<JWT>";

it('should return threads list', () => {
  // we defined BASE_URL in cypress.json, so we can write url like "/login" etc
  cy.request({method: 'GET', url: `/thread/list/0`, auth: {bearer: `${token}`} }) // place auth token in authorization header.
  .then(res => {
    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(2)
    expect(res.body[0]).to.have.property('id', 2) // property 'id' and value = 2.
  })
});

it('should return 0 length arr when put /2', () => { // pagination test
  cy.request({method: 'GET', url: `/thread/list/2`, auth: {bearer: `${token}`} })
  .then(res => {
    expect(res.body).to.have.lengthOf(0)
  })
});


it('should response unauthorized without auth header', () => {
  cy.request({ method: 'GET', url: '/thread/list/0', failOnStatusCode: false })
  .then(res => {
    expect(res.status).to.equal(401);
  })
});


it('should response unauthorized with invalid token', () => {
  cy.request({method: 'GET', url: `/thread/list/0`, auth: {bearer: `invalidtoken`}, failOnStatusCode: false })
  .then( res => {
    expect(res.status).to.equal(401);
  })
});


it('should order by DESC', () => {
  cy.request({ method: 'GET', url: '/thread/list/0', auth: {bearer: `${token}`}})
  .then(res => {
    const thread0_created_at = res.body[0].created_at;
    const thread1_created_at = res.body[1].created_at;
    expect(Cypress.moment(thread1_created_at).isBefore(thread0_created_at)).to.be.true; // we can check dateTime order with Cypress.moment().
    // expect(Cypress.moment(thread0_created_at).isAfter(thread1_created_at)).to.be.true;
  })
});
