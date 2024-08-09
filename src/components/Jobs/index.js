import { Component } from "react";
import { BsSearch } from "react-icons/bs";
// import {ThreeDots} from "react-loader-spinner";
import Cookies from "js-cookie";
import Header from "../Header";
import JobItem from "../JobItem";
import "./style.css";

const userInfoStatusConstans = {
  initial: "INITIAL",
  isLoading: "LOADING",
  success: "SUCCESS",
  failure: "FAIL",
};

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

const jobStatusConts = {
  initial: "INITIAL",
  isLoading: "LOADING",
  noRecored: "NORECORD",
  success: "SUCCESS",
  fail: "FAIL",
};

class Jobs extends Component {
  state = {
    userInfoStatus: userInfoStatusConstans.initial,
    userDetial: {},
    employeeType: [],
    salaryRange: "",
    searchInput: "",
    jobStatus: jobStatusConts.initial,
    jobList: [],
    jobCount: null,
  };

  renderSearchInput = () => (
    <div className="w-full md:w-[30%] border-[#cbd5e1] border-[1px] flex items-center">
      <input
        type="search"
        className="w-full bg-transparent px-2 py-1"
        placeholder="Search"
        onChange={(e) => {
          this.setState({ searchInput: e.target.value });
        }}
      />

      <button
        type="button"
        data-testid="searchButton"
        className="p-2 bg-[#202020]"
        onClick={this.getJobDetails}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  );

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      {/* <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> */}loading
    </div>
  );

  renderUserInfo = () => {
    const { userDetial, userInfoStatus } = this.state;

    switch (userInfoStatus) {
      case userInfoStatusConstans.isLoading:
        return this.renderLoading();
      case userInfoStatusConstans.success:
        return (
          <div className="w-full h-full p-4 user-bg-img rounded-xl">
            <img src={userDetial.profile_image_url} alt="profile" />
            <h1 className="text-[#6366f1] text-xl font-bold mt-3">
              {userDetial.name}
            </h1>
            <p className="text-[#2c364c] text-lg ">{userDetial.short_bio}</p>
          </div>
        );
      case userInfoStatusConstans.failure:
        return (
          <button
            className="px-2 py-1 bg-[#6366f1] text-md font-bold text-white rounded"
            onClick={() => {
              this.getUsertInfo();
            }}
          >
            Retry
          </button>
        );
      default:
        return null;
    }
  };

  renderTypesOFEmploy = () => {
    let { employeeType } = this.state;
    const onSelect = (e) => {
      if (e.target.checked === true) {
        employeeType.push(e.target.value);
      } else {
        employeeType = employeeType.filter((each) => each !== e.target.value);
      }
      this.setState({ employeeType: employeeType }, this.getJobDetails);
    };

    return (
      <>
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map((each) => (
            <li key={each.employmentTypeId} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={each.employmentTypeId}
                value={each.employmentTypeId}
                onClick={onSelect}
              />
              <label htmlFor={each.employmentTypeId}>{each.label}</label>
            </li>
          ))}
        </ul>
      </>
    );
  };

  renderSalaryRange = () => {
    return (
      <>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map((each) => (
            <li key={each.salaryRangeId} className="flex items-center gap-2">
              <input
                type="radio"
                id={each.salaryRangeId}
                value={each.salaryRangeId}
                name="SalaryRange"
                onClick={(e) => {
                  this.setState(
                    { salaryRange: e.target.value },
                    this.getJobDetails
                  );
                }}
              />
              <label htmlFor={each.salaryRangeId}>{each.label}</label>
            </li>
          ))}
        </ul>
      </>
    );
  };

  getUsertInfo = async () => {
    this.setState({ userInfoStatus: userInfoStatusConstans.isLoading });
    const jwtToke = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/profile";
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToke}`,
      },
    };

    const res = await fetch(url, option);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (res.status === 200) {
      this.setState({
        userDetial: data.profile_details,
        userInfoStatus: userInfoStatusConstans.success,
      });
    } else {
      this.setState({ userInfoStatus: userInfoStatusConstans.failure });
    }
  };

  getJobDetails = async () => {
    this.setState({ jobStatus: jobStatusConts.isLoading });
    const { employeeType, salaryRange, searchInput } = this.state;
    const jwtToke = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join(
      ","
    )}&minimum_package=${salaryRange}&search=${searchInput}`;
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToke}`,
      },
    };
    const res = await fetch(url, option);
    const data = await res.json();
    if (res.status === 200) {
      if (data.total === 0) {
        this.setState({ jobStatus: jobStatusConts.noRecored });
      } else {
        this.setState({
          jobStatus: jobStatusConts.success,
          jobList: data.jobs,
          jobCount: data.total,
        });
      }
    }
    console.log(res);
    console.log(data);
  };

  componentDidMount() {
    this.getUsertInfo();
    this.getJobDetails();
  }

  renderJobList = () => {
    const { jobStatus, jobList } = this.state;

    switch (jobStatus) {
      case jobStatusConts.isLoading:
        return this.renderLoading();
      case jobStatusConts.success:
        return (
          <ul className="flex flex-col gap-4 mt-4">
            {jobList.map((each) => (
              <JobItem key={each.id} jobDetail={each} />
            ))}
          </ul>
        );
      case jobStatusConts.noRecored:
        return (
          <div className="mt-10 flex flex-col items-center justify-center">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="h-22"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
            <button
              type="button"
              className="px-3 py-1 bg-[#6366f1] text-md font-bold text-white rounded"
              onClick={this.getJobDetails}
            >
              Retry
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="bg-[#000000] min-h-screen">
        <Header />
        <div className="text-white mt-4  px-3 md:px-[3rem] py-2 grid grid-col-1 md:grid-cols-8 gap-4">
          <div className="md:col-span-2 flex flex-col  gap-4">
            <div className="md:hidden">{this.renderSearchInput()}</div>
            <div className="min-h-[20vh] flex items-center justify-center">
              {this.renderUserInfo()}
            </div>
            <hr className="p-[.5px] bg-[#cbd5e1]" />
            {this.renderTypesOFEmploy()}
            <hr className="p-[.5px] bg-[#cbd5e1]" />
            {this.renderSalaryRange()}
          </div>
          <div className="md:col-span-6">
            <div className="hidden md:block">{this.renderSearchInput()}</div>
            {this.renderJobList()}
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
