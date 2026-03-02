import React from 'react'
import { SmallCalendar } from './_component/small-calender'
import BigCalender from './_component/big-calander'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='flex gap-4'>
            <div className='bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg md:w-[269px]'><SmallCalendar />
            <div>
                <h1>Category</h1>
                <p>training</p>
                <p>meeting</p>
                <p>service</p>
            </div>
            </div>
            <div><BigCalender/></div>
        </div>
    )
}

export default page