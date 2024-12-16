class HomePage{
 
    webElements = {
        
        signUpOption: ()=> cy.get('#signin2'),

        homeOption: ()=> cy.get('#nava'),
        
        logInOption: ()=>cy.get('#login2'),

        logOutOption: ()=>cy.get('#logout2'),

        welcomeUser: ()=>cy.get('#nameofuser'),

        laptopCategory: ()=>cy.get('.list-group-item').contains('Laptops'),

        cartOption: ()=>cy.get('#cartur')

    }

    clickOnSignUp(){
        this.webElements.signUpOption().click()
    }

    clickOnLogIn(){
        this.webElements.logInOption().should('be.visible').click()
    }

    clickOnLaptopOption(){
        this.webElements.laptopCategory().click()
    }

    clickOnLogOut(){
        this.webElements.logOutOption().click()
    }

    clickOnCartOption(){
        this.webElements.cartOption().click()
        cy.wait(1000)
    }

    getTextUserLogged(){

        return this.webElements.welcomeUser().should('be.visible').then(($elem)=>
        {
           return $elem.text()
        })
    }

    clickOnHomeOption(){
        this.webElements.homeOption().click()
    }

    verifyThatUserLoggedTextIsNotVisible(){
        this.webElements.welcomeUser().should('not.be.visible')
    }
}

export default HomePage;