<style>
  .cardContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.card {
  box-sizing: border-box;
  flex-direction: column;
    word-wrap: break-word;
    width: 50%;
    flex: 0 0 auto;
    padding-bottom: 1.75rem;
    
}
.cardColor {
    display: flex;
    width: 100%;
    height: 100px;
    boder: 2px solid black;
    margin-bottom: 0.75rem;
}
.cardTitle{
  font-size:1.5em;
}
.bgBlue{ background: #3c3cb9;}
.bgDarkBlue{background:	#0f1038;}
.bgLightBlue{background:#4547c9;}
.bgWhite{background:white;}
.bgGray{background:#dbdbeb;}
.bgCoolGray{background:#cfcfe3;}

.section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  padding: 3.1em 0;
}
.sectionPadded {
    margin: 0 4em;
  }

.typography{font-family:Raleway, sans-serif; text-decoration:none; font-size:24px;}
.xlText{font-size: 80px;}
.lgText{font-size:52px;}
.mdText{font-size:32px}

</style>
# Style Guide for DSD Website's brand
To establish consistency and aid to developers, this guide aims to set a ruleset of common styles and resources such as colors, typography, and more.
Please use [Global.css](https://github.com/dallassoftwaredevelopers/DSDsite/blob/main/src/app/globals.css) 

# Getting Started
Global.css contains a collection of common styling properties and CSS classes which can be used to both create new CSS classes and "pre-build" styles onto one class you can then cascade onto the HTML element you want to style. This guide will list all available properties and CSS classes from the global.css file.
<br>
To use a property from global.css into your file, use the <code>var()</code> function when declaring your own property. For example, if we wanted to set the color of a text within a container with the class <code>myCustomClass</code> to our primary blue color, we would use the <code>--blue</code> prefix property as so:
<pre class="brush: css notranslate">
element.css
<code>
.myCustomClass {
  color: var(--blue);
}
</code>
</pre>

To add a class from global.css to your html element in tsx, wrap the 
<pre class="brush: css notranslate">
element.tsx
<code>
return(
  &lt;div className={`bgGray ${myCustomClass}`}&gt;
    Lorem Ipsum
  &lt;/div&gt;
)
</code>
</pre>

# Visual Style

## Colors and Font
The most unifying visual component is the consistent use of colors and font settings.<br>
<span class="cardTitle">Font Family</span>
<code style="display:block;">
font-family: Raleway, sans-serif;
<br>
font-size: 24px;
</code>
<br>
The core colors below are for background and textual elements. They are listed with their CSS variable value for easy access.

<section class="cardContainer">
 <article class="card">
  <div class="cardColor bgBlue"></div>
  <div><span class="cardTitle">Primary Color</span><br><code>--blue</code></div>
 </article>
 <article class="card">
  <div class="cardColor bgDarkBlue"></div>
  <div><span class="cardTitle">Secondary Color</span><br><code>--dark-blue</code></div>
 </article>
 <article class="card">
  <div class="cardColor bgWhite"></div>
  <div><span class="cardTitle">White</span><br><code>--white</code></div>
 </article>
 <article class="card">
  <div class="cardColor bgLightBlue"></div>
  <div><span class="cardTitle">Light Blue</span><br><code>--light-blue</code></div>
 </article>
 <article class="card">
  <div class="cardColor bgGray"></div>
  <div><span class="cardTitle">Gray</span><br><code>--gray</code></div>
 </article>
 <article class="card">
  <div class="cardColor bgCoolGray"></div>
  <div><span class="cardTitle">Cool Gray</span><br><code>--cool-gray</code></div>
 </article>
</section>

## Typography
<p class="typography xlText"><code>.xlText</code> Heading 1 / XL Text</p>
<p class="typography lgText"><code>.lgText</code> Heading 2 / Large Text</p>
<p class="typography mdText"><code>.mdText</code> Heading 3 / Medium Text</p>
<p class="typography">Normal Text</p>

## Design Elements
### Sections
<div class="section bgBlue">
  <div class="sectionPadded">
  <p class="typography lgText">Blue <code>.bgBlue</code></p>
  Nam sagittis scelerisque maximus. Integer id volutpat augue, nec suscipit ante. Nulla facilisi. Proin interdum lectus ligula, in elementum leo lacinia et. Ut nec condimentum urna. Morbi at elit tellus. Praesent vel faucibus purus, sed laoreet orci. Donec tempus elit vel purus gravida laoreet. Fusce maximus metus eget dolor scelerisque, eu ornare arcu faucibus. In ut lacus id ligula tempus blandit sed sed nisl.
  </div>
</div>
<div class="section bgDarkBlue">
  <div class="sectionPadded">
  <p class="typography lgText">Dark Blue <code>.bgDarkBlue</code></p>
  Nam sagittis scelerisque maximus. Integer id volutpat augue, nec suscipit ante. Nulla facilisi. Proin interdum lectus ligula, in elementum leo lacinia et. Ut nec condimentum urna. Morbi at elit tellus. Praesent vel faucibus purus, sed laoreet orci. Donec tempus elit vel purus gravida laoreet. Fusce maximus metus eget dolor scelerisque, eu ornare arcu faucibus. In ut lacus id ligula tempus blandit sed sed nisl.
  </div>
</div>
<div class="section bgGray" style="color:black;>
  <div class="sectionPadded">
  <p class="typography lgText">Gray <code>.bgGray</code></p>
  Nam sagittis scelerisque maximus. Integer id volutpat augue, nec suscipit ante. Nulla facilisi. Proin interdum lectus ligula, in elementum leo lacinia et. Ut nec condimentum urna. Morbi at elit tellus. Praesent vel faucibus purus, sed laoreet orci. Donec tempus elit vel purus gravida laoreet. Fusce maximus metus eget dolor scelerisque, eu ornare arcu faucibus. In ut lacus id ligula tempus blandit sed sed nisl.
  </div>
</div>
<div class="section bgLightBlue">
  <div class="sectionPadded">
  <p class="typography lgText">Light Blue <code>.bgLightBlue</code></p>
  Nam sagittis scelerisque maximus. Integer id volutpat augue, nec suscipit ante. Nulla facilisi. Proin interdum lectus ligula, in elementum leo lacinia et. Ut nec condimentum urna. Morbi at elit tellus. Praesent vel faucibus purus, sed laoreet orci. Donec tempus elit vel purus gravida laoreet. Fusce maximus metus eget dolor scelerisque, eu ornare arcu faucibus. In ut lacus id ligula tempus blandit sed sed nisl.
  </div>
</div>
<div class="section bgWhite">
  <div class="sectionPadded">
  <p class="typography lgText">White <code>.bgWhite</code></p>
  Nam sagittis scelerisque maximus. Integer id volutpat augue, nec suscipit ante. Nulla facilisi. Proin interdum lectus ligula, in elementum leo lacinia et. Ut nec condimentum urna. Morbi at elit tellus. Praesent vel faucibus purus, sed laoreet orci. Donec tempus elit vel purus gravida laoreet. Fusce maximus metus eget dolor scelerisque, eu ornare arcu faucibus. In ut lacus id ligula tempus blandit sed sed nisl.
  </div>
</div>

### Breakpoints
<pre>
--max-width: 1450px;
--breakpoint-xs: 0;
--breakpoint-sm: 576px;
--breakpoint-md: 768px;
--breakpoint-lg: 992px;
--breakpoint-xl: 1200px;
</pre>