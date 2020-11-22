module.exports = {
    stories: [
        '../stories/**/index.@(js|mdx)',
    ],
    addons: [
        '@storybook/addon-essentials'
    ],
    webpackFinal: (config) => {
        config.module.rules.forEach(rule => {
            if (/svg/.test(rule.test)) {
                rule.test = rule.test.toString().replace('svg|', '');
            }
        });

        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.(styl|css)$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    sourceMap: true,
                                    modules: false,
                                }
                            },
                            {
                                loader: "stylus-loader",
                                options: {
                                    resolveUrl: true,
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    {
                        test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.bg\.svg$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: '[name].[ext]',
                            outputPath: 'media/'
                        }
                    },
                    {
                        test: /\.svg$/,
                        exclude: [/\.bg\.svg$/],
                        use: [
                            {
                                loader: require.resolve('babel-loader')
                            },
                            {
                                loader: require.resolve('react-svg-loader'),
                                options: {
                                    svgo: require('./svgoConfig'),
                                    name: '[name].[ext]',
                                    outputPath: 'media/',
                                }
                            }
                        ]
                    },
                ]
            }
        };
    },
    babel: async (options) => {
        return {
            ...options,
        };
    },
};