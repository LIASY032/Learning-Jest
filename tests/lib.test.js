const lib = require("../lib");

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