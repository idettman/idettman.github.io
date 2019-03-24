// Storage Mock
function storageMock() {
    var storage = {};

    return {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return key in storage ? storage[key] : null;
        },
        removeItem: function(key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function(i) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

global.window = this.window || {
    location: {
        hash: 'foo'
    },
    localStorage: storageMock()
}

global.window.__rubicon_oauth_configuration__ = {
    useCookies: false,
    nodeEnv: 'production',
    debug: false,
    clientId: 60,
    clientRedirectUri: 'https://platform.rubiconproject.com/applications/campaign-management',
    platformUrl: 'https://platform.rubiconproject.com',
    platformServiceUser: '/services/user/me',
    loginUrl: 'https://login.rubiconproject.com',
    loginServiceLogin: '/oauth/authorize',
    loginServiceLogout: '/logout'
};