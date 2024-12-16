class ProductDetailPage{
    
    webElements = {

        productTitle: ()=>cy.get('.name'),

        priceProduct: ()=> cy.get('.price-container'),

        addToCartButton: ()=>cy.get('.btn-success')

    }

    clickOnAddToCartButton(){
        this.webElements.addToCartButton().click()
        cy.wait(900)
    }

    getProductTitle(){
        return this.webElements.productTitle().should('be.visible').then(($elem)=>
            {
               return $elem.text()
            })
    }

    getProductPrice(){
        return this.webElements.priceProduct().should('be.visible').then(($elem)=>
            {
               return $elem.text()
            })
    }

    alertAddToCartItem(){
        cy.on('window:alert',(txt)=>{
            expect(['Product added','Sign up successful.']).to.contains(txt)
        })
    }
}

export default ProductDetailPage;