export function redirectToHashIfNeeded() {
    const path = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;

    const hasHash = hash.startsWith('#/');
    const isRoot = path === '/';

    if (!hasHash && !isRoot) {
        const newUrl = '/#' + path + search;
        window.location.replace(newUrl);
    }
}
