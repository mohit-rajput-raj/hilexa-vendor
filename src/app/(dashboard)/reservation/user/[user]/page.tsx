'use client'
import React from 'react'
import DashboardPage from '../../_components/users-details'
import { useParams } from 'next/navigation'

type Props = {}

const page = (props: Props) => {
  const {user} = useParams();
    const id = Array.isArray(user)
    ? user[0]
    : user || "";
  return (
    <DashboardPage id={id}/>
  )
}

export default page