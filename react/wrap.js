import React from 'react'

export default function (props) {
  if (!props.create && props.create != null) {
    return <span></span>
  }
  return (
    <div style={{ display: props.show ? 'inherit' : 'none'}}>
      { props.children }
    </div>
  )
}

/*
<Wrap create={false}>
  <p>foo</p>
</Wrap>

<Wrap show={false}>
  <p>foo</p>
</Wrap>
*/