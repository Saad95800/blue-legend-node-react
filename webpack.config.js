const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const NODE_ENV = 'development';

const common = {
    nodeEnv: new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: `'development'`
        }
    }),
    path: path.resolve(__dirname, 'assets/client/dist'),
    publicPath: '/',
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        }
    ],
    resolve: {extensions: ['.js']}
};

var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
    common.nodeEnv,
    new HtmlWebPackPlugin({
        template: './src/client/index.html',
        filename: './index.html'
    })
  ];

module.exports = [
    {
        // client side rendering
        target: 'web',
        entry: {
            client: './assets/client/index.js'
        },
        output: {
            path: path.resolve(__dirname, './assets/client/dist'),
            filename: '[name].js',
            publicPath: common.publicPath
        },
        watch: true,
        mode: NODE_ENV,
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
              })
          ],
        resolve: common.resolve,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env","@babel/preset-react"
                            ]
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                { 
                    test: require.resolve('jquery'), 
                    use: [{
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }
            ]
        },
        devtool: 'source-map',
        devServer: {
            contentBase: common.path,
            publicPath: common.publicPath,
            open: true,
            historyApiFallback: true
        },
        externals: {
            jquery: 'jQuery'
          }
    },
    // {
    //     // server side rendering
    //     target: 'node',
    //     entry: {
    //         server: './app.js'
    //     },
    //     output: {
    //         path: common.path,
    //         filename: '[name].js',
    //         publicPath: common.publicPath,
    //         libraryTarget: 'commonjs2',
    //     },
    //     mode: NODE_ENV,
    //     externals: [nodeExternals()],
    //     plugins: [
    //         common.nodeEnv,
    //         new CleanWebpackPlugin(['dist'], {verbose: true}),
    //     ],
    //     resolve: common.resolve,
    //     module: {
    //         rules: common.loaders
    //     },
    //     plugins:[
    //     ]
    // }
];