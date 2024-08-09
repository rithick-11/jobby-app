import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import {IoMdOpen} from 'react-icons/io'

const JobDetailCard = ({jobDetial}) => {
  const {
    company_logo_url,
    title,
    rating,
    location,
    employment_type,
    job_description,
    company_website_url,
    skills,
    life_at_company,
    package_per_annum,
  } = jobDetial
  return (
    <div className="bg-[#202020] p-5 rounded-xl flex flex-col gap-4 text-white">
      <div className="flex items-center gap-3">
        <img
          src={company_logo_url}
          className="h-[10vh] md:h-[15vh]"
          alt="job details company logo"
        />
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="flex items-center gap-2 ">
            <FaStar className="text-[#fbbf24] text-xl" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Description</h1>
        <a
          href={company_website_url}
          className="flex text-[#6366f1] text-lg items-center gap-1"
        >
          <p>Visit</p>
          <IoMdOpen />
        </a>
      </div>
      <p>{job_description}</p>
      <h1 className="text-2xl font-bold">Skills</h1>
      <ul className="grid  md:grid-cols-3 gap-3">
        {skills.map(each => (
          <li key={each.name} className="flex items-center gap-2">
            <img src={each.image_url} className="h-10" alt={each.name} />
            <p>{each.name}</p>
          </li>
        ))}
      </ul>
      <h1 className="text-2xl font-bold">Life at Company</h1>
      <div className="flex items-start justify-between gap-4">
        <p>{life_at_company.description}</p>
        <img src={life_at_company.image_url} className="w-[40vw]" alt="life at company" />
      </div>
    </div>
  )
}

export default JobDetailCard
