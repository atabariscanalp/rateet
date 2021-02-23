import React from 'react'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  const reactRedux = require('react-redux')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [
        [reactRedux, 'useSelector']
    ]
  })
}