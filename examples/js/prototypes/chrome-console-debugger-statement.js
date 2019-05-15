(function continainerscript1 () {
    setTimeout(() => {
        console.log('debugger, activate (dev tools must be open) debugger with a breakpoint where \'debugger\' was declared')
        debugger
    }, 3000)
})()

debugger