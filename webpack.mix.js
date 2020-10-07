const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.disableNotifications();

mix.webpackConfig({
resolve: {
    alias: {
        '@components': path.resolve(__dirname, 'resources/js/components/'),
        '@assets': path.resolve(__dirname, 'resources/js/components/assets'),
        '@customComponent': path.resolve(__dirname, 'resources/js/components/CustomComponent'),
        '@actions': path.resolve(__dirname, 'resources/js/components/Redux/actions'),
        '@reducers': path.resolve(__dirname, 'resources/js/components/Redux/reducers'),
        '@ducks': path.resolve(__dirname, 'resources/js/components/Redux/Ducks'),
    }
}
});

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');



