/*
    If all you'd like is to list the sections your layout should contain and assign some classes to the containers for CSS purposes, 
    your Layout can be a simple array of objects with the properties id, cssClass (or className alternatively), 
    and element (this is optional, Fusion defaults to a <section> if not specified). 
*/
export default [
    {
      id: 'header',
      cssClass: 'col-xs-12 fixed-on-small',
      element: 'header'
    },
    {
      id: 'main',
      cssClass: 'col-xs-12 col-md-9',
      element: 'article'
    },
    {
      id: 'sidebar',
      cssClass: 'col-xs-12 col-md-3',
      element: 'aside'
    },
    {
      id: 'footer',
      cssClass: 'col-xs-12',
      element: 'footer'
    },
]

// This Layout would then result in HTML resembling the following on the webpage:
/*

<header id="header" class="col-xs-12 fixed-on-small">
  // Header Features/Chains
</header>
<article id="main" class="col-xs-12 col-md-9">
  // Main Features/Chains
</article>
<aside id="sidebar" class="col-xs-12 col-md-3">
  // Sidebar Features/Chains
</aside>
<footer id="footer" class="col-xs-12">
  // Footer Features/Chains
</footer>


*/