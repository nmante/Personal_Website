/*  external requirements  */
var path  = require("path");
var chalk = require("chalk");

/*  determine path to TypoPRO dependency  */
var typopro_basedir = path.resolve(path.join(__dirname,"..", "node_modules", "typopro"));

/*  export the Grunt plugin  */
module.exports = function (grunt) {
    /*  define the Grunt task  */
    grunt.registerTask("typopro", "Install TypoPRO Fonts", function () {
        /*  prepare task options  */
        var options = this.options({
            directory: ".",
            mergecss: false,
            specimen: false,
            blurb:    true,
            fonts: []
        });
        grunt.verbose.writeflags(options, "Options");

        /*  sanity check the usage  */
        if (options.fonts.length === 0){
            grunt.fail.fatal("no fonts specified (you have to set the \"typopro.options.fonts\" configuration!)");
        }

        /*  determine files to copy  */
        var patterns = [
            "TypoPRO-*-*.woff",
            "TypoPRO-*-*.eot",
            "TypoPRO-*-*.ttf",
            "TypoPRO-*-*.svgz",
            "TypoPRO-*-*.css"
        ];
        if (options.specimen){
            patterns.push("TypoPRO-*-*.html");
        }
        if (options.blurb){
            patterns.push("TypoPRO-*-*.txt");
        }

        /*  ensure destination directory exists  */
        var dstdir = options.directory;
        if (!grunt.file.exists(dstdir)){
            grunt.file.mkdir(dstdir);
        }

        /*  iterate over all fonts to install  */
        options.fonts.forEach(function (font) {
            /*  ensure source directory exists  */
            var srcdir = path.join(typopro_basedir, "web", "TypoPRO-" + font);
            if (!grunt.file.isDir(srcdir)) {
                grunt.fail.fatal("no such font: " + font + " (expected directory \"" + srcdir + "\")");
                return;
            }

            /*  install all files belonging to source directory  */
            grunt.log.writeln("Installing TypoPRO font family: " + chalk.green(font));
            var files = grunt.file.expand({ cwd: srcdir }, patterns);
            files.forEach(function (file) {
                var src = path.join(srcdir, file);
                var dst = path.join(dstdir, file);
                grunt.file.copy(src, dst);
            });
        });

        /*  optionally merge all CSS files  */
        if (options.mergecss) {
            var css = "";
            var files = grunt.file.expand({ cwd: dstdir }, "TypoPRO-*-*.css").sort();
            files.forEach(function (file) {
                var dst = path.join(dstdir, file);
                css += grunt.file.read(dst, { encoding: "utf8" });
                grunt.file.delete(dst);
            });
            grunt.file.write(path.join(dstdir, "TypoPRO.css"), css, { encoding: "utf8" });
        }
    });
};
