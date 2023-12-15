import { MyResponse } from "../api/projects/route";
import { ProjectModel } from "@/db/models/project";

const PageProjects = async () => {
  return (
    <>
      <div>
        <div className="min-h-screen bg-white text-gray-900 flex justify-center -mt-[23rem]">
          <div className="max-w-screen-xl m-0 sm:m-[28rem] bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-11/12 p-10 sm:p-12">
              <div className="flex text-base font-black font-serif items-center justify-center px-1 py-1 "></div>
              <div className="flex items-center justify-center">
                <h1 className="text-2xl xl:text-3xl font-medium">
                  Create Projects
                </h1>
              </div>
              <div className="mt-7 flex flex-col items-center">
                <div className="mx-auto max-w-xs">
                  <div className="my-[1rem]"></div>
                  <form action={""}>
                    <div>
                      <label htmlFor="">Title</label>
                      <input
                        className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="title"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Project Description</label>
                      <input
                        className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="projectDescription"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Work Description</label>
                      <input
                        className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="workDescription"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Position</label>
                      <input
                        className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="position"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Location</label>
                      <input
                        className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="location"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Job Type</label>
                      <input
                        className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="jobType"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Experience</label>
                      <input
                        className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="experience"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Benefits</label>
                      <input
                        className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="benefits"
                      />
                    </div>
                    <button
                      className="mt-5 tracking-wide font-semibold  bg-blue-600 text-gray-100 w-full py-3 rounded-lg hover:bg-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      <span className="ml-3">Add</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageProjects;
