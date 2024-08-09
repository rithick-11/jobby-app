import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const SimilarJobsCard = ({jobData}) => {
  const {
    id,
    company_logo_url,
    employment_type,
    job_description,
    location,
    rating,
    title,
  } = jobData
  return (
    <Link to={`/jobs/${id}`}>
      <li className="bg-[#202020] p-5 rounded-xl flex flex-col gap-3 text-white">
        <div className="flex items-center gap-3">
          <img src={company_logo_url} className="h-[3rem]" alt="similar job company logo" />
          <div>
            <h1 className="text-md font-bold">{title}</h1>
            <div className="flex items-center gap-2 ">
              <FaStar className="text-[#fbbf24] text-xl" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="text-lg">Description</h1>
        <p className="text-md">{job_description}</p>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-lg" />
            <p className="text-md">{location}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-lg" />
            <p className="text-md">{employment_type}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobsCard
