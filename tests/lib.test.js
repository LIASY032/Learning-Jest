const lib = require("../lib");
const db = require('../db');
const mail = require('../mail')
describe("absolute", ()=>{
it("absolute - should return a positive number if input is positive", () => {
    const result = lib.absolute(1)
    expect(result).toBe(1)
});
it("absolute - should return a positive number if input is negative", () => {
    const result = lib.absolute(-1)
    expect(result).toBe(1)
});
it("absolute - should return 0 if input is 0", () => {
    const result = lib.absolute(0)
    expect(result).toBe(0)
});
})


describe("greet", ()=>{
    it("should return the greeting message", ()=>{
        const result = lib.greet("Mosh");
        expect(result).toMatch(/Mosh/)
    })
})

describe("getCurrencies", ()=>{
    it('should return supported currencies', ()=>{
        const result = lib.getCurrencies()

        // Too egneral
        expect(result).toBeDefined()
          expect(result).not.toBeNull();

          //Too specific
  expect(result[0]).toBe("USD")
    expect(result.length).toBe(3)

    //Proper way
      expect(result).toContain("USD");
        expect(result).toContain("AUD")

        // Ideal way
          expect(result).toEqual(expect.arrayContaining(["USD", "AUD"]))
    })
})


describe('getProduct', ()=>{
    it('should return the product with the ID', ()=>{
        const result = lib.getProduct(1);

        //specific
        expect(result).toEqual({id:1, price:10})

        //chech the object contains
         expect(result).toMatchObject({id:1, price:10})


         expect(result).toHaveProperty('id', 1)
    })
})

describe('registerUser',()=>{
    it('should throw if username is falsy', ()=>{
        //Null
        //undefined
        //NaN
        //''
        //0
        //flase
       const args = [null, undefined, NaN, '', 0, false]
       args.forEach(a =>{
           expect(()=>{
               lib.registerUser(a);
               }).toThrow()
       })
    });
     it('should return a user object if valid user name is passed', ()=>{
        const result = lib.registerUser('mosh')
        expect(result).toMatchObject({username: 'mosh'})
    })
   
})


describe('applyDiscount', ()=>{
    it('should apply 10% discount if custimer has more than 10 points', ()=>{
        db.getCustomerSync = function(customerId){
            console.log('Fake reading customer...');
            return {
                id: customerId,
                points: 20
            }
        }
        
        const order = {customerId: 1, totalPrice: 10}
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)
    })
})

describe('notifyCustomer', ()=>{
    it('should send an email to the customer', async ()=>{

const mockFunction = jest.fn()
// mockFunction.mockReturnValue(1);
// mockFunction.mockResolvedValue(1)
// mockFunction.mockRejectedValue(new Error('...'))
// const result = await mockFunction()

        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'})



        mail.send = jest.fn()
        
        lib.notifyCustomer({customerId: 1})
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a')
    })
})