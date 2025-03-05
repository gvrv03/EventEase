import AllEMVs from '@/components/Events/AllEventsMV/AllEMVs'
import React from 'react'

const AllEventMangers = () => {
  return (
    <div>
      <AllEMVs/>
    </div>
  )
}

export default AllEventMangers
export const dynamic = "force-dynamic";
export const revalidate = 0;