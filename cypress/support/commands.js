Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add('login', ({ username, password }) => {
  return cy
    .request('POST', `${Cypress.env('BACKEND')}/login`, {
      username,
      password,
    })
    .then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
      cy.visit('/');
    });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  });
  cy.visit('/');
});
