const proxy = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        proxy("/api/**", {
            // "https://github.com/chimurai/http-proxy-middleware"
            target: "http://localhost:8000",
            secure: false,
            changeOrigin: true,
        })
    );
};

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(
//         '/api',
//         createProxyMiddleware({
//             target: 'http://localhost:8000',
//             changeOrigin: true,
//         })
//     );
// };




// module.exports = function(proxy, allowedHost) {
//     const disableFirewall = !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';
//     return {
//         // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
//         // websites from potentially accessing local content through DNS rebinding:
//         // https://github.com/webpack/webpack-dev-server/issues/887
//         // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
//         // However, it made several existing use cases such as development in cloud
//         // environment or subdomains in development significantly more complicated:
//         // https://github.com/facebook/create-react-app/issues/2271
//         // https://github.com/facebook/create-react-app/issues/2233
//         // While we're investigating better solutions, for now we will take a
//         // compromise. Since our WDS configuration only serves files in the `public`
//         // folder we won't consider accessing them a vulnerability. However, if you
//         // use the `proxy` feature, it gets more dangerous because it can expose
//         // remote code execution vulnerabilities in backends like Django and Rails.
//         // So we will disable the host check normally, but enable it if you have
//         // specified the `proxy` setting. Finally, we let you override it if you
//         // really know what you're doing with a special environment variable.
//         // Note: ["localhost", ".localhost"] will support subdomains - but we might
//         // want to allow setting the allowedHosts manually for more complex setups
//         allowedHosts: disableFirewall ? 'all' : [allowedHost],


//     }
// }