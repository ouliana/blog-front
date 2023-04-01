describe('Blog app', function resetDBs() {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      username: 'ouliana',
      name: 'Ouliana Kotik',
      password: 'mypass',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('/');
  });

  describe('User not logged in', function () {
    it('Login form is shown', function isFormVisible() {
      cy.getBySel('username').should('be.visible');
      cy.getBySel('password').should('be.visible');
      cy.contains('sign in');
    });
  });

  describe('Login', function testLoginFunctionality() {
    it('Succeeds with correct credentials', function isLoginSuccessful() {
      cy.getBySel('username').type('ouliana');
      cy.getBySel('password').type('mypass');
      cy.getBySel('signin').click();

      cy.contains('Ouliana Kotik logged in');
    });

    it('Fails with wrong password', function isFailedWithWrongPassword() {
      cy.getBySel('username').type('ouliana');
      cy.getBySel('password').type('wrong');
      cy.getBySel('signin').click();

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });

    describe('when logged in', function testLoggedUserFunctionality() {
      beforeEach(() => {
        cy.login({
          username: 'ouliana',
          password: 'mypass',
        });
      });

      it('A blog can be created', function isBlogVisible() {
        cy.getBySel('togglable').click();

        cy.getBySel('input-title').type('React patterns');
        cy.getBySel('input-author').type('Michael Chan');
        cy.getBySel('input-url').type('https://reactpatterns.com/');

        cy.getBySel('save').click();

        cy.get('html').should('contain', 'React patterns Michael Chan');
      });

      it('A user can like a blog', function isLikesIncremented() {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
        });

        cy.getBySel('toggle-details-visibility').click();
        cy.getBySel('submitLikes').should('exist');
        cy.getBySel('submitLikes').click();
        cy.get('html').should('contain', 'likes 1');
      });

      it('A user who created a blog can delete it', function testOwner() {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
        });

        cy.getBySel('toggle-details-visibility').click();

        cy.getBySel('remove-blog').should('be.visible');
        cy.getBySel('remove-blog').click();
        cy.get('html').should('not.contain', 'React patterns Michael Chan');
      });

      it(`A user can not delete someone else's blog`, function testNonOwner() {
        cy.getBySel('logout').click();

        const anotherUser = {
          username: 'another',
          name: 'Another User',
          password: 'another',
        };
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, anotherUser);

        cy.login({
          username: 'another',
          password: 'another',
        });

        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        });
        cy.getBySel('logout').click();

        cy.login({
          username: 'ouliana',
          password: 'mypass',
        });

        cy.getBySel('toggle-details-visibility').click();

        cy.getBySel('remove-blog').should('not.be.visible');
      });
    });
  });

  describe('Display blogs', function testBlogsFunctionality() {
    beforeEach(() => {
      cy.login({
        username: 'ouliana',
        password: 'mypass',
      });

      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      });
      cy.createBlog({
        title: 'The title with some likes',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      });
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      });
      cy.createBlog({
        title: 'The title with zero likess',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
      });
      cy.visit('/');
    });

    it('Blogs are ordered according to likes', function displayBlogs() {
      cy.get('.blog').eq(0).should('contain', 'The title with the most likes');
      cy.get('.blog')
        .eq(1)
        .should('contain', 'The title with the second most likes');
    });

    it('Clicks on likes changes order', function () {
      cy.get('.blog').eq(2).contains('view').click();

      cy.get('.blog').eq(2).siblings().contains('like').click();
      cy.get('.blog').eq(2).siblings().contains('6');
      cy.get('.blog').eq(2).siblings().contains('like').click();
      cy.get('.blog').eq(2).siblings().contains('7');
      cy.get('.blog').eq(2).siblings().contains('like').click();

      cy.get('.blog').eq(1).should('contain', 'The title with some likes');
    });
  });
});
