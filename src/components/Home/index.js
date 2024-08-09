import Header from '../Header'
import {Link} from 'react-router-dom'
import './style.css'

const Home = props => {
  const findJobsBtn = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="bg-image-home min-h-screen">
      <Header />
      <div className="px-3 md:px-[3rem] py-2 md:mt-14 md:w-[40%]">
        <h1 className="text-[#f1f5f9] text-2xl font-bold mt-4 md:text-5xl">
          Find The Job That Fits Your Life
        </h1>
        <p className="text-[#cbd5e1] mt-7 md:text-xl">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button
            type="button"
            className=" px-3 py-1 bg-[#6366f1] text-md font-bold text-white rounded mt-3 md:mt-5"
            onClick={findJobsBtn}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
