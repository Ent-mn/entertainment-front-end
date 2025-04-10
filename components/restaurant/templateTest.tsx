"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TemplateRenderer from "../template/customizeTemplate";

const TemplateTest = () => {
  const [template, setTemplate] = useState();

  const fetchData = async () => {
    try {
      const { data }: any = await axios.post(
        "/api/api",
        {
          sn: "section_template_list_all",
          id: 1,
          page_number: 1,
          page_size: 101,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Q9eW!zD0EeL7@ANeyJ1c2VyX2lkIjoiMSIsImlhdCI6MTcxODU5OTU0NywiZXhwIjoxNzUwMTM1NTQ3fQ.muFJPyUNLrjjeHTVI4Vjj-wkHoGJ7YceHPIsDNuhlOQ",
          },
        }
      );

      if (data) {
        setTemplate(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      {template ? <TemplateRenderer data={template} /> : "data alga "}
    </div>
  );
};

export default TemplateTest;
