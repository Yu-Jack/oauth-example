const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

const baseConfig = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

const clientConfig = Object.assign({}, baseConfig, {
    entry: "./client/vue/src/main.js",
    output: {
        path: path.resolve(__dirname, "client", "vue", "dist")
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": path.join(__dirname, "client", "vue", "src"),
        },
        extensions: [".ts", ".js", ".vue"],
    },
})

const resourceConfig = Object.assign({}, baseConfig, {
    entry: "./resource_server/vue/src/main.js",
    output: {
        path: path.resolve(__dirname, "resource_server", "vue", "dist")
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": path.join(__dirname, "resource_server", "vue", "src"),
        },
        extensions: [".ts", ".js", ".vue"],
    },
})

module.exports = [
    clientConfig, resourceConfig
]