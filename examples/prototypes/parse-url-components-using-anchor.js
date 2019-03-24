export function parseUrl(url) {
    let parsed = document.createElement('a');

    parsed.href = decodeURIComponent(url);

    return {
        href: parsed.href,
        protocol: (parsed.protocol || '').replace(/:$/, ''),
        hostname: parsed.hostname,
        port: +parsed.port,
        pathname: parsed.pathname.replace(/^(?!\/)/, '/'),
        hash: (parsed.hash || '').replace(/^#/, ''),
        host: parsed.host || window.location.host
    };
}