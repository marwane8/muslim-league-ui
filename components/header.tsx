import React from 'react'

import Head from 'next/head'
import { NextPage } from 'next'

type Props = {
    title?: string 
}


const Header: NextPage<Props> = ({title = 'Muslim League CT'}: Props) => (
    <Head>
        <title>{title}</title>
        <meta charSet='utf-8'/>
        <meta name="viewport" content='initial-scale=1.0, width=device-width'/>
    </Head>    
)


export default Header