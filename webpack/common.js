const path = require('path');
const { merge } = require('webpack-merge');

const BASE = {
    "entry": './zinc/translated-js/entry/aoc.mjs',
    "output": {
        path: path.resolve(__dirname, '../dist'),
        filename: "aoc.js"
    },
    "target": 'node',
    module: {
        rules: [
            {
                test: /\.(mjs|js|jsx)$/,
                exclude: [/node_modules/]
            },
        ]
    },
    "externals": {
        "express": "require('express')"
    }
};

module.exports = (overrides) => merge(BASE, overrides);
