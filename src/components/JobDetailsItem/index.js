import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobDetailCard from '../JobDetailCard'
import SimilarJobsCard from '../SimilarJobsCard'
import Loader from 'react-loader-spinner'
import { useParams } from 'react-router-dom'

const jobDetailStatusConst = {
  initial: 'INITIAL',
  isLoading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

const initialState = {
  jobDetailStatus: jobDetailStatusConst.initial,
  jobDetial: {},
  simlarJob: [],
}

const JobDetailsItem = () => {

  const {id} = useParams()

  const [apiStatus, setApiStatus] = useState(initialState)

  const getJobDetial = async () => {
    setApiStatus(pre => ({...pre, jobDetailStatus: jobDetailStatusConst.isLoading}))
    const url = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const res = await fetch(url, option)
    const data = await res.json()
    if (res.ok === true) {
      setApiStatus(pre => ({
        ...pre,
        jobDetial: data.job_details,
        simlarJob: data.similar_jobs,
        jobDetailStatus: jobDetailStatusConst.success,
      }))
    }
  }

  useEffect(()=>{
    getJobDetial()
  },[])

  const renderJobData = () => {
    const {jobDetailStatus, jobDetial, simlarJob} = apiStatus

    switch (jobDetailStatus) {
      case jobDetailStatusConst.isLoading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case jobDetailStatusConst.success:
        return (
          <>
            <JobDetailCard jobDetial={jobDetial} />
            <h1 className="text-white text-2xl font-bold">Similar Jobs</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simlarJob.map(each => (
                <SimilarJobsCard key={each.id} jobData={each} />
              ))}
            </ul>
          </>
        )
      default :
        return null
    }
  }

  return(
    <div className="min-h-screen bg-[#000000]">
        <Header />
        <div className=" mt-4 flex flex-col gap-4 px-3 md:px-[3rem] py-2">
          {renderJobData()}
        </div>
      </div>
  )
}

export default JobDetailsItem
