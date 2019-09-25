'use strict'

import React from 'react'

export default (props) => {
  return (
    <html>
      <head>
        {/* gets a meta value by name (in this case, the page title) that was set in the Admin and prints it. Here, we're just using plain JS to fallback to a Default Title if the metaValue doesn't exist. */}
        <title>{props.metaValue('title') || 'Default Title'}</title>
        {/* renders <meta> tags for any meta info provided to us by the Admin. */}
        <props.MetaTags />
        {/*  includes the client side React library, as well as the component specific script for our single page app to render itself and handle events. Without this line, our code won't work client side! */}
        <props.Libs />
        {/* renders <link> tags for stylesheets that are generated based on any CSS files imported into the components being used on this page. We could have alternatively inlined our CSS for platforms like AMP that require it. */}
        <props.CssLinks />
        <link rel='icon' type='image/x-icon' href={props.deployment(`${props.contextPath}/resources/img/favicon.ico`)} />
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' />
      </head>
      <body>
        <h1>Welcome to Fusion!</h1>
        {/* One more subtle but important piece of code is the id='fusion-app' attribute applied to the <div> tag in our page body. It's important that this id exists and is precisely fusion-app, as this will be the hook that Fusion looks for to re-mount the app on the client side. Without it our application won't know what element to mount to on the page, and thus won't work client side. */}
        <div id='fusion-app' className='col-12'>
          {/* props.children is a React standard prop, but for our purposes it will include all the other components (layouts, chains, and features) that were configured in the Admin to exist on the page. Without it, none of the content on our page gets displayed. */}
          {props.children}
        </div>
        {/* <props.Fusion /> bootstraps data from the server that will hydrate our React components. */}
        <props.Fusion />
      </body>
    </html>
  )
}