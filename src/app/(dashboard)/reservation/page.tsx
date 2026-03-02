import React from 'react'

import { GuestDataTable } from './_components/datatable'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='bg-background pt-4 rounded-2xl'><GuestDataTable /></div>
    )
}

export default page