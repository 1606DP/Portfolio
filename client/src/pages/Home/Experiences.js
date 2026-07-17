import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experiences || [];
  const selectedExperience = experiences[selectedItemIndex] || {};

  return (
    <div>
      <SectionTitle title="Experiences" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {experiences.map((experiences, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5
                   ${selectedItemIndex === index ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#50dba826] py-3 " : "text-white border-x-tertiary"}`}
              >
                {experiences.period}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="text-secondary text-xl">
            {selectedExperience.title || ""}
          </h1>
          <h1 className="text-tertiary text-xl">
            {selectedExperience.company || ""}
          </h1>
          <p className="text-white">
           {selectedExperience.description || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
