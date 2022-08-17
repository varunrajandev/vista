import React from 'react'
import JobsDataTable from '../../components/Jobs/JobsDataTable'
import { jobData } from '../../Data'

function JobsTable() {
  return (
    <>
    <JobsDataTable data = {jobData}/>
    </>
  )
}

export default JobsTable