/*  /components/layouts/article-right-rail.jsx  */

import React from 'react'

const ArticleRightRail = (props) => {
  return (
    <div className='row'>
      <header className='col-12 fixed-on-small'>
        {props.children[0]}
      </header>
      <section className='col-12'>
        <div className='row'>
          <article className='col-xs-12 col-md-8'>
            {props.children[1]}
          </article>
          <aside className='col-xs-12 col-md-4'>
            {props.children[2]}
          </aside>
        </div>
      </section>
      <footer className='col-12'>
        {props.children[3]}
        <p>Copyright &copy; 2018</p>
      </footer>
    </div>
  )
}

/*
    inject the child Feature and/or Chain components via props.children. 
    For Layouts, props.children is an array of objects ordered by the list of section names provided in the component's .sections definition. 
    We've also added some Bootstrap classes so our layout will work properly.

    The .sections property blow is necessary to provide the PageBuilder Admin with the names of the sections available in this Layout
    without it, editors won't know which section they are dragging and dropping Features into!
*/
ArticleRightRail.sections = ['header', 'main', 'sidebar', 'footer']

export default ArticleRightRail