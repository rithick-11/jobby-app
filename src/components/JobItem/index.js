import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const JobItem = ({jobDetail}) => {
  const {
    company_logo_url,
    employment_type,
    job_description,
    location,
    package_per_annum,
    rating,
    title,
    id,
  } = jobDetail
  return (
    <Link to={`/jobs/${id}`}>
      <li className="bg-[#202020] p-5 rounded-xl flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <img className="h-12" src={company_logo_url} alt="company logo" />
          <div>
            <h1>{title}</h1>
            <div className="flex items-center gap-1">
              <FaStar className="text-[#fbbf24]" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-xl" />
              <p>{location}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-xl" />
              <p>{employment_type}</p>
            </div>
          </div>
          <p>{package_per_annum}</p>
        </div>
        <hr className="p[.5px] bg-white" />
        <h1 className="font-bold">Description</h1>
        <p>{job_description}</p>
      </li>
    </Link>
  )
}

export default JobItem
