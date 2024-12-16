class SignUpPage{
    
    webElements = {
        
        userName: ()=>cy.get('#sign-username'),

        userPassword: ()=>cy.get('#sign-password'),

        signUpButton: ()=>cy.get('.btn-primary').contains('Sign up')

    }

    enterUserName(userName){
        cy.wait(1000)
        this.webElements.userName().type(userName)
    }

    enterUserPassword(userPassword){
        this.webElements.userPassword().type(userPassword)
    }

    clickOnSignButton(){
        this.webElements.signUpButton().click()
    }

    alertSignUpUserSuccess(message){
        cy.on('window:alert',(txt)=>{
            expect(message).to.equals(txt)
        })
        
    }
}

export default SignUpPage;