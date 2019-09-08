module.exports = class SourceMapWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('SourceMapWebpackPlugin', (compilation) => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('SourceMapWebpackPlugin', (pluginArgs, cb) => {
                pluginArgs.body.unshift({
                    tagName: 'script',
                    voidTag: false,
                    attributes: {
                        type: 'application/json',
                        src: `${pluginArgs.body[0].attributes.src}.map`
                    }
                });
                cb(null, pluginArgs);
            });

        });
    }
}