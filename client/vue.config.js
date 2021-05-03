module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api/clientes': {
                    target: 'http://localhost:5555',
                },
            },
        },
    },
}