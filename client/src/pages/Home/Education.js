import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Education() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const education = portfolioData?.education || [];
  return (
    <div>
      <SectionTitle title="Education"/>
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {education.map(
          (education,index) => (
            <div onClick={() => {
              setSelectedItemIndex(index);
            }}
            className="cursor-pointer">
              <h1 className={`text-xl px-5 ${selectedItemIndex === index ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#50dba826] py-3 " : "text-white border-x-tertiary"}`}>
                {education.period}
                </h1>
              </div>
          )
        )}
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="text-secondary text-xl">
            {education[selectedItemIndex]?.school || ""}
          </h1>
          <h1 className="text-white text-xl">
            {education[selectedItemIndex]?.title || ""}
          </h1>
          <h1 className="text-tertiary text-xl">
            {education[selectedItemIndex]?.description || ""}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Education;
