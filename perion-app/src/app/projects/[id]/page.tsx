import { z } from "zod";
import { ProjectModel } from "@/db/models/project";
import { MyResponse } from "@/app/api/projects/route";

const fetchProject = async () => {
  "use server";
  try {
    const response = await fetch("http://localhost:3000/api/projects");
    const responseJson: MyResponse<ProjectModel> = await response.json();
    const data = responseJson.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const PageProjectDetail = async () => {
  const projects = await fetchProject();
  console.log(projects);

  return (
    <>
      <div></div>
    </>
  );
};

export default PageProjectDetail;
