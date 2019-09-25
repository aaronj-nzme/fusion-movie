/*  /components/chains/sidebar.jsx  */

import PropTypes from 'prop-types'
import React from 'react'

// We're defining a functional component and assigning it to const Sidebar
const Sidebar = (props) => {
  const { hasBorder, heading } = props.customFields

  let classNames = 'col-xs-12 col-md-4'
  classNames = hasBorder ? `${classNames} border-left` : classNames

  return (
    <section className={classNames}>
      {heading &&
        <h3>{heading}</h3>
      }
      <div>
        {props.children}
      </div>
    </section>
  )
}

Sidebar.propTypes = {
  customFields: PropTypes.shape({
    heading: PropTypes.string,
    // We use the hasBorder custom field (that we define at the bottom of the file) to determine 
    // whether or not to add border-left to the list of classNames for our <section> container
    hasBorder: PropTypes.bool
  })
}

export default Sidebar