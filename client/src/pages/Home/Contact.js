import React from "react";
import SectionTitle from "../../components/SectionTitle";
import contactImg from "../../resources/contact_img.png";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const contact = portfolioData?.contact || {};

  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col ">
          <p className="text-tertiary text-sm">{"{"}</p>
          {Object.keys(contact).map((key) =>
            key !== '_id' ? (
              <p key={key} className="ml-5">
                <span className="text-tertiary">{key} : </span>
                <span className="text-tertiary">{contact[key]}</span>
              </p>
            ) : null
          )}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="flex h-[400px] ">
          <img src={contactImg} alt="Contact illustration" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
