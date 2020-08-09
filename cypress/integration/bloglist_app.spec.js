describe('BlogList app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user1 = {
            name: 'Daniel Leskosky',
            username: 'dleskosky',
            password: 'iam31180'
        }
        const user2 = {
            name: 'John Gardus',
            username: 'jgardus',
            password: 'iam29293'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user1)
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
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

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'dleskosky', password: 'iam31180'})
        })

        it('a new blog can be added to list', function() {
            cy.contains('new blog').click()
            cy.get('#newTitle').type('TDD harms architecture')
            cy.get('#newAuthor').type('Robert C. Martin')
            cy.get('#newUrl').type('http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html')
            cy.get('#createButton').click()
            cy.contains('TDD harms architecture')
        })

        it('a user can like a blog', function() {
            cy.addBlog({
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
            })
            cy.get('#viewButton').click()
            cy.get('#likeButton').click()
            cy.get('.numberOfLikes').contains('1')
        })

        it('a user can delete a blog', function() {
            cy.addBlog({
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
            })
            cy.get('#viewButton').click()
            cy.get('#deleteButton').click()
            cy.get('html').should('not.contain', 'TDD harms architecture')
        })

        it('a blog can only be deleted by user that added it to list', function() {
            cy.addBlog({
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
            })
            cy.get('#logoutButton').click()
            cy.login({ username: 'jgardus', password: 'iam29293'})
            cy.get('#viewButton').click()
            cy.get('html').should('not.contain', 'remove') 
        })

        it('blogs are in descending order according to the number of likes', function() {
            cy.addBlogWithLikes({
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 2
            })
            cy.addBlogWithLikes({
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 3
            })
            cy.addBlogWithLikes({
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 1
            })
            cy.contains('TDD harms architecture').parent().find('#viewButton').as('viewButton2Likes')
            cy.contains('Canonical string reduction').parent().find('#viewButton').as('viewButton3Likes')
            cy.contains('Type wars').parent().find('#viewButton').as('viewButton1Like')
            cy.get('@viewButton2Likes').click()
            cy.get('@viewButton3Likes').click()
            cy.get('@viewButton1Like').click()
            cy.get('.numberOfLikes').then( likes => {
                cy.get(likes[0]).should('contain', '3')
                cy.get(likes[1]).should('contain', '2')
                cy.get(likes[2]).should('contain', '1')
            })
        })
    })
})