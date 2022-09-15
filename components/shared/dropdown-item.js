import Link from 'next/link';
import React from 'react';

export default function DropDownItem(props) {

    let { href, children, ...rest } = props;
    // console.log(typeof href);

    return (
        <Link href={href}>
            <a {...rest}>
                {children}
            </a>
        </Link>
    );
}
