import HomePage from "../../pages/HomePage"
import LoginPage from "../../pages/LoginPage"
import SignUpPage from "../../pages/SignUpPage"
import LaptopPage from "../../pages/LaptopPage"
import ProductDetailPage from "../../pages/ProductDetailPage"
import CartPage from "../../pages/CartPage"


describe('Product store tests', function(){
    
    const homePage = new HomePage()
    const signUpPage = new SignUpPage()
    const loginPage = new LoginPage() 
    const laptopPage = new LaptopPage()
    const productDetailPage = new ProductDetailPage()
    const cartPage = new CartPage()

    beforeEach(()=>{

        cy.fixture('storeData').then(function(data){
            this.data = data
        })

        cy.visit(Cypress.env('url'))

    })
    
    it('First flow', function(){

        let userNameRandom = this.data.userName + Math.floor(100 + Math.random() * 900)
        
        //1. Register a new user.
        
        homePage.clickOnSignUp()

        signUpPage.enterUserName(userNameRandom)
        signUpPage.enterUserPassword(this.data.userPassword)
        signUpPage.clickOnSignButton()
        signUpPage.alertSignUpUserSuccess('Sign up successful.')
        
        //2. Login and logout with the registerd user

        homePage.clickOnLogIn()
        loginPage.enterUserName(userNameRandom)
        loginPage.enterUserPassword(this.data.userPassword)
        loginPage.clickOnSignButton()

        // Verify the user is logged properly
        homePage.getTextUserLogged().then((act)=>{    
            expect(act).equal('Welcome ' + userNameRandom)     
        })
        homePage.clickOnLogOut()
        // Verify that  user is logout properly
        homePage.verifyThatUserLoggedTextIsNotVisible()

        //3. Add a laptop
        
        homePage.clickOnLaptopOption()
        laptopPage.selectALaptop(this.data.productName)      
        //Verify that the laptop MacBook is on the product detail
        productDetailPage.getProductTitle().then((act)=>{    
            expect(act).equal(this.data.productName)     
        })
        productDetailPage.clickOnAddToCartButton()
        homePage.clickOnCartOption()

        //4. Verify that the laptop Macbook air was added to the cart

        // Verify that one row in the product table
        cartPage.getRowLengthTable().then((act)=>{    
            expect(1).equal(act)     
        })

        // Verify that the laptop Macbook air is on the product table
        cartPage.VerifyProductAddedToACart(this.data.productName).then((act)=>{    
            expect(true).equal(act)     
        })        
    })

    it('Second flow', function(){

        let laptopGalleryPrice
        let productDetailPrice
        
        cy.visit('https://www.demoblaze.com/index.html')
        
        homePage.clickOnLaptopOption()

        laptopPage.getPrice(this.data.productName).then((act)=>{    
            laptopGalleryPrice = act
        })

        laptopPage.selectALaptop(this.data.productName)

        //Verify that the laptop MacBook is on the product detail
        productDetailPage.getProductTitle().then((act)=>{    
            expect(act).equal(this.data.productName)     
        })

        productDetailPage.getProductPrice().then((act)=>{    
            productDetailPrice = act
        })

        cy.then(() => {
            expect(laptopGalleryPrice).equal(productDetailPrice.split(' ')[0])
        });        
    })

})