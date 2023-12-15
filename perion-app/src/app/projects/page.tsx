import { z } from "zod";
import { MyResponse } from "../api/projects/route";
import { ProjectModel } from "@/db/models/project";

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

const PageProjects = async () => {
  const projects = await fetchProject();
  console.log(projects);

  return (
    <>
      <div></div>
    </>
  );
};

export default PageProjects;
