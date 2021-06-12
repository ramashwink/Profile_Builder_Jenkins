import getters from '../../../src/store/module/auth/getters.js'
const user={
    user:123456788,
    token:'SampleToken',
    expiresIn:null,
    isUserLoggedIn:true,
    isAdminLoggedIn:true,
}
const state=user

//userId getters function
describe("userId",()=>{
    it("returns the userId",()=>{
        const actual=getters.userId(state);
        expect(actual).toEqual(user.userId)
    })
})

//token getters function
describe("token",()=>{
    it("returns the token",()=>{
        console.log(getters.token(state));
        expect(getters.token(state)).toBe(user.token)
    })
})
//isUserLoggedIn getters function
describe("isUserLoggedIn",()=>{
    it("returns whether the user is logged In ",()=>{
        const actual=getters.isUserLoggedIn(state);
        expect(actual).toEqual(!!state.token)
    })
})

//isAuthenticated getters function
describe("isAuthenticated",()=>{
    it("returns whether the user isisAuthenticated ",()=>{
        const actual=getters.isAuthenticated(state);
        expect(actual).toEqual(!!state.token)
    })
})

//isAdminLoggedIn getters function
describe("isAdminLoggedIn",()=>{
    it("returns whether the user is Admin ",()=>{
        const actual=getters.isAdminLoggedIn(state);
        expect(actual).toEqual(state.isAdminLoggedIn)
    })
})