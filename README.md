**testing
This package contains a CLI command that will look for all of the sass partials (_\<name\>.scss) you have in your current folder and compile all of their sass stylings into the named css file. However, this means you should not use the @import, @use, or @forward commands in sass, as there is no use for them. Currently working on a solution for compiling variables and mixins with this method.
<br/>
NOTE: @import, @use, or @forward do not work. I am trying to workout a way to continue passing variables and functions, however.
<h2>Command Usage</h2>
To install SassLink globally, use <code>npm install -g sass-link</code> which will provide access to the sass-link command. Upon doing so, use <code>npx sass-link cssFileName</code> to compile your partials to a css file. You can also not include the css file name and it will ask you for it after you use the command.
<h2>JS Usage</h2>
const sassLink = require('sass-link');
<br/>
const result = sassLink.link(cssFileName);
