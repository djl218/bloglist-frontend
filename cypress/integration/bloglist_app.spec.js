describe('BlogList app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Daniel Leskosky',
            username: 'dleskosky',
            password: 'iam31180'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('dleskosky')
            cy.get('#password').type('iam31180')
            cy.get('#login-button').click()

            cy.contains('Daniel Leskosky logged in')
        })

        it('fails with wrong username', function() {
            cy.contains('login').click()
            cy.get('#username').type('dles')
            cy.get('#password').type('iam31180')
            cy.get('#login-button').click()

            cy.get('.error')
              .should('contain', 'wrong username or password')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
              .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'Daniel Leskosky logged in')
        })

        it('fails with wrong password', function() {
            cy.contains('login').click()
            cy.get('#username').type('dleskosky')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
              .should('contain', 'wrong username or password')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
              .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'Daniel Leskosky logged in')
        })
    })
})