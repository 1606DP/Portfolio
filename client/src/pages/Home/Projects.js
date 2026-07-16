import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const projects = Array.isArray(portfolioData?.projects) ? portfolioData.projects : [];
  const selectedProject = projects[selectedItemIndex] || {};

  React.useEffect(() => {
    if (projects.length === 0) {
      setSelectedItemIndex(0);
    } else if (selectedItemIndex > projects.length - 1) {
      setSelectedItemIndex(0);
    }
  }, [projects, selectedItemIndex]);

  const selectedDescription1 = selectedProject.description1 || selectedProject.description || "";
  const selectedDescription2 = selectedProject.description2 || "";

  return (
    <div>
      <SectionTitle title="Projects " />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              key={project._id || `${project.title}-${index}`}
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${selectedItemIndex === index ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#50dba826] py-3 " : "text-white border-x-tertiary"}`}
              >
                {project.title || "Untitled Project"}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-10 sm:flex-col">
          <img
            src={selectedProject.image || ""}
            alt={selectedProject.title || "Project image"}
            className="h-60 w-72"
          />
          <div className="flex flex-col gap-5">
            <a
              href={selectedProject.link || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-secondary text-xl hover:underline"
            >
              {selectedProject.title || "Project"}
            </a>
            <p className="text-white">{selectedDescription1}</p>
            <p className="text-white">{selectedDescription2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
