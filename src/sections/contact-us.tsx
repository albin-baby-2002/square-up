"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/slider";
import React, { useState } from "react";

const ContactUs = () => {
  const [values, setValues] = useState([200, 500]);
  return (
    <div id="contact">
      <div className="border-gray-15 relative mx-auto flex w-full flex-col items-center justify-center space-y-[14px] border-b py-[100px] text-center">
        <div className="absolute top-0 z-[-2] h-full w-full bg-[radial-gradient(#191919_1px,#030303_1px)] bg-[size:20px_20px]"></div>

        <h2 className="text-[42px] font-semibold">
          Thank you for your Interest in SquareUp.
        </h2>
        <p className="text-gray-90 text-[18px] lg:max-w-[50%]">
          We would love to hear from you and discuss how we can help bring your
          digital ideas to life. Here are the different ways you can get in
          touch with us.
        </p>
        <button className="primary-btn mt-8">Get A Quote</button>
      </div>

      <div className="border-gray-15 mx-auto space-y-6 border-x p-[60px] lg:max-w-[846px]">
        <div className="grid grid-cols-2 gap-6">
          <div className="form-card flex flex-col gap-4">
            <p className="form-label">Full Name</p>
            <input className="form-input" type="text" placeholder="Type Here" />
          </div>
          <div className="form-card flex flex-col gap-4">
            <p className="form-label">Email Address</p>
            <input
              className="form-input"
              placeholder="Type Here"
              type="email"
            />
          </div>
        </div>

        <div className="form-card flex flex-col gap-5">
          <p className="form-label">Why are you contacting us?</p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Checkbox />
              <p>Web Design</p>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox />
              <p>Collaboration</p>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox />
              <p>Mobile App Design</p>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox />
              <p>Others</p>
            </div>
          </div>
        </div>

        <div className="form-card flex flex-col !gap-10">
          <div>
            <p className="form-label mb-2">Your Budget</p>
            <p>Slide to indicate your budget range</p>
          </div>
          <div className="pb-8">
            <DualRangeSlider
              label={(value) => `$${value}`}
              min={100}
              max={1000}
              labelPosition="bottom"
              step={10}
              value={values}
              onValueChange={setValues}
            />
          </div>
        </div>

        <div className="form-card flex flex-col gap-4">
          <p className="form-label">Your Message</p>
          <textarea className="form-input !h-24" placeholder="Type Here" />
        </div>

        <button className="primary-btn mt-4">Send Message</button>
      </div>
    </div>
  );
};

export default ContactUs;
