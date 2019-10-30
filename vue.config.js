const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "utils": path.resolve(__dirname, 'src/utils/'),
                "store": path.resolve(__dirname, 'src/store/')
            }
        }
    }
}