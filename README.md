<p>This package contains a CLI command that will look for all of the sass partials (_<name>.scss) you have in your current folder and compile all of their sass stylings into the named css file.</p>
<h2>Command Usage</h2>
<p>To install SassLink globally, use <code>npm install -g sass-link</code> which will provide access to the sass-link command. Upon doing so, use <code>npx sass-link <css file name></code> to compile your partials to a css file. You can also not include the css file name and it will ask you for it after you use the command.</p>
<h2>JS Usage</h2>
<div class="highlight highlight-source-js">
    <span class="pl-k">const</span> <span class="pl-s1">sassLink</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'sass-link'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <br/>
    <span class="pl-k">const</span> <span class="pl-s1">result</span> <span class="pl-c1">=</span> <span class="pl-s1">sassLink</span><span class="pl-kos">.</span><span class="pl-en">link</span><span class="pl-kos">(</span><span class="pl-s1">cssFileName</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
</div>