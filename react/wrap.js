import React from 'react'

export default function (props) {
    const isCreate = ('create' in props) ? props.create : 'WRAP_CREATE_UNDEFINED'
    const isShow = ('show' in props) ? props.show : 'WRAP_SHOW_UNDEFINED'
    const tag = props.tag || 'div'
    // 定义了create
    if (isCreate !== 'WRAP_CREATE_UNDEFINED') {
        if (!props.create) {
            return null
        } else {
            return (
                React.createElement(tag, {
                    className: props.className || ''
                }, props.children)
            )
        }
    } else {
        return (
            React.createElement(tag, {
                className: props.className || '',
                style: { display: getShowStyle(props.show) },
            }, props.children)
        )
    }
}

function getShowStyle(show) {
    if (show === undefined) {
        return 'inherit'
    }
    return show ? 'inherit' : 'none'
}

/*
类似 vue v-if v-show

<Wrap create={false}>
  <p>foo</p>
</Wrap>
<Wrap show={false} className='flex' tag='div'>
  <p>foo</p>
</Wrap>
*/