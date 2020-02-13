module.exports = {
    babel: {
        plugins: [
            'babel-plugin-styled-components',
            [ '@babel/plugin-proposal-decorators', { 'legacy': true } ]
        ]
    },
    eslint: {
        enable: true /* (default value) */,
        mode: 'file'
    }
};
