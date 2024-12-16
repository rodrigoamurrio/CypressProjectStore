class CartPage{
    
    webElements = {
        
        productTable: ()=>cy.get('tbody'),

        productTilteOnTable: ()=>cy.get('.success :nth-child(2)')

    }

    getRowLengthTable(){
        return this.webElements.productTable().find('tr').should('be.visible').then((row)=>{
            return row.length
        })
    }

    VerifyProductAddedToACart(productName){ 
        return this.webElements.productTilteOnTable().should('be.visible').then((row)=>{
        if(row.text().includes(productName)){
            return true                   
        }
        })                
    }
    
}

export default CartPage;