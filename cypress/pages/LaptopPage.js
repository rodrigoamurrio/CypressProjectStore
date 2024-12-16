class LaptopPage{
    
    webElements = {
        
        laptopItem: (productName)=> cy.get('.hrefch').contains(productName),

        priceProduct: (productName)=> cy.get('.hrefch').contains(productName).parent().next()

    }

    selectALaptop(laptopType){
        this.webElements.laptopItem(laptopType).click()
    }

    getPrice(laptopType){
        return this.webElements.priceProduct(laptopType).should('be.visible').then(($elem)=>
            {
               return $elem.text()
            })
    }

}

export default LaptopPage;