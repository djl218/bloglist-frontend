Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBloglistappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistappUser')).token}`
          }
    })

    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addBlogWithLikes', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistappUser')).token}`
          }
    })

    cy.visit('http://localhost:3000')
})