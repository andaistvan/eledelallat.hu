require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "assets/framework/css"
sass_dir = "assets/framework/compass"
# images_dir = "images"
# javascripts_dir = "assets/framework/compass"
# fonts_dir = "assets/framework/compass/fonts"

output_style = :nested

relative_assets = true

line_comments = false
color_output = false

preferred_syntax = :scss
add_import_path "assets/framework/bower-styles"
add_import_path "assets/framework/theme/parts/globals"
add_import_path "assets/framework/theme/parts/pages"
