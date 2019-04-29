
function validateAccSiteZone1(/**{accountId:number, siteId:number, zoneId:number}*/bidParams) {
    return ['accountId', 'siteId', 'zoneId'].every(item => {
        bidParams[item] = parseInt(bidParams[item])
        return !isNaN(bidParams[item])
    })
}
function validateAccSiteZone2(/**{accountId:number, siteId:number, zoneId:number}*/bidParams) {
    const requiredParams = ['accountId', 'siteId', 'zoneId']
    for (let i = 0; i < requiredParams.length; i++) {
        bidParams[requiredParams[i]] = parseInt(bidParams[requiredParams[i]])
        if (isNaN(bidParams[requiredParams[i]])) {
            return false
        }
    }
    return true
}
function validateAccSiteZone3(/**{accountId:number, siteId:number, zoneId:number}*/bidParams) {
    for (let i = 0, requiredParams = ['accountId', 'siteId', 'zoneId'], p = requiredParams[i]; i < requiredParams.length; i++, p = requiredParams[i]) {
        bidParams[p] = parseInt(bidParams[p])
        if (isNaN(bidParams[p])) {
            return false
        }
    }
    return true
}


const validationFunctionTests = [
    validateAccSiteZone1,
    validateAccSiteZone2,
    validateAccSiteZone3
]

const bidParamTestValues = [{
    accountId: '',
    siteId: '303',
    zoneId: 'foo'
},{
    accountId: '1',
    siteId: '100',
    zoneId: '200'
},{
    accountId: Number.MIN_VALUE,
    siteId: 0,
    zoneId: 1000
},{
    accountId: {},
    siteId: {},
    zoneId: {}
},{
    accountId: true,
    siteId: false,
    zoneId: true
},{
    accountId: NaN,
    siteId: undefined,
    zoneId: null
}].forEach((bidParamTest, paramIndex) => {
    console.group(`Test (${paramIndex+1})`)
    
    console.group('values ')
    
    console.log('  {')
    Object.keys(bidParamTest).forEach(n => {
        console.log('    %c%s%c: %c%s, ', 'color:lightsteelblue', n, 'color:gray', 'color:cornflowerblue', bidParamTest[n])
    })
    console.log('  }')
    
    console.groupEnd()
    
    validationFunctionTests.forEach((validationFunctionTest, index) => {
        const result = validationFunctionTest(bidParamTest)
        console.log(`%cvalidateAccSiteZone%c${index+1} %c %s`, 'color:cornflowerblue', 'color:white', `color: ${result ? 'blue' : 'red'};`, validationFunctionTest(bidParamTest))
    })
    
    console.groupEnd()
})

