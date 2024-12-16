class LoginPage{
    
    webElements = {
        
        userName: ()=>cy.get('#loginusername'),

        userPassword: ()=>cy.get('#loginpassword'),

        loginButton: ()=>cy.get('.btn-primary').contains('Log in')

    }

    enterUserName(userName){
        cy.wait(1000)
        this.webElements.userName().should('be.visible').type(userName).should('have.value', userName)
    }

    enterUserPassword(userPassword){
        this.webElements.userPassword().type(userPassword).should('have.value', userPassword)
    }

    clickOnSignButton(){
        this.webElements.loginButton().click()
    }
}

export default LoginPage;