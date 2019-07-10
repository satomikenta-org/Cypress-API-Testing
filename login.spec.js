
const BASE_URL = "http://localhost:3000"

it('should return msg and jwt', () => {
  const email = "<EMAIL>";
  const password = "<PASSWORD_CORRECT>";
  const requestBodyData = {email, password};
  cy.request('POST', `${BASE_URL}/login`, requestBodyData)
  .then( res => {
    // return value from expressAPI is " res.json({ msg: 'success', token: 'e.....'}) "
    expect(res.body).to.have.property( 
      "msg", // expected property 
      "success" // expected value of property "msg" in this case 'success'
    );
    expect(res.body).to.have.property("token") // only check response has specified property.
  })
});

it('should return unauthorized when invalid password', () => {
  const email = "<EMAIL>";
  const invalidPass = "<PASSWORD_INVALID>";
  const requestBodyData = { email, password: invalidPass };
  // if wanna test statusCode 4XX etc, we have to provide option "failOnStatusCode: false" like below. 
  cy.request({method:'POST', url: `${BASE_URL}/login`, body: requestBodyData, failOnStatusCode: false })
  .then( (res) => {
    expect(res.status).to.equal(401) // we can also assert value of property like this.
    expect(res.body.msg).to.equal('unauthorized')
  })
});



