import React, { ChangeEvent } from "react";

interface TitleOptions {
  text: string;
  fontColor: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  padding: number;
  margin: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  horizontalAlign: string;
  verticalAlign: string;
  wrap: boolean;
  maximumWidth: number | null;
  dockInsidePlotArea: boolean;
}

interface TitleConfiguratorProps {
  titleOptions: TitleOptions;
  setTitleOptions: (options: TitleOptions) => void;
}

const TitleConfigurator: React.FC<TitleConfiguratorProps> = ({
  titleOptions,
  setTitleOptions,
}) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    const newValue = type === 'checkbox' ? 
    (e.target as HTMLInputElement).checked 
    : type === 'number' 
    ? parseFloat(value) 
    : value === "false" 
    ? undefined : value;
    
    // Create a new TitleOptions object with updated value
    const updatedTitleOptions: TitleOptions = {
        ...titleOptions,
        [name]: newValue
    };

    // Set the updated TitleOptions object
    setTitleOptions(updatedTitleOptions);
  };

  const fontFamilies = [
    "Arial",
    "Verdana",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Palatino",
    "Garamond",
  ];
  const fontWeights = ["normal", "bold", "bolder", "lighter"];
  const fontStyles = ["normal", "italic", "oblique"];
  const alignments = ["left", "center", "right"];

  const titleInputs = [
    { label: "Title Text", name: "text", type: "text" },
    { label: "Font Color", name: "fontColor", type: "color" },
    {
      label: "Font Family",
      name: "fontFamily",
      type: "select",
      options: fontFamilies,
    },
    { label: "Font Size", name: "fontSize", type: "number" },
    {
      label: "Font Weight",
      name: "fontWeight",
      type: "select",
      options: fontWeights,
    },
    {
      label: "Font Style",
      name: "fontStyle",
      type: "select",
      options: fontStyles,
    },
    { label: "Padding", name: "padding", type: "number" },
    { label: "Margin", name: "margin", type: "number" },
    { label: "Background Color", name: "backgroundColor", type: "color" },
    { label: "Border Color", name: "borderColor", type: "color" },
    { label: "Border Width", name: "borderWidth", type: "number" },
    {
      label: "Horizontal Align",
      name: "horizontalAlign",
      type: "select",
      options: alignments,
    },
    // { label: 'Vertical Align', name: 'verticalAlign', type: 'select', options: alignments },
    { label: "Wrap", name: "wrap", type: "checkbox" },
    { label: "Maximum Width", name: "maximumWidth", type: "number" },
    {
      label: "Dock Inside Plot Area",
      name: "dockInsidePlotArea",
      type: "checkbox",
    },
  ];

  return (
    <div>
      <h3>Title Configuration</h3>
      <section
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
      >
        {titleInputs.map((input) => (
          <div>
            <label key={input.name}>
              {input.label}:
              {input.type === "select" ? (
                <select
                  name={input.name}
                //   value={titleOptions[input.name as keyof TitleOptions] !== null ? titleOptions[input.name as keyof TitleOptions] as string : ''}
                value={titleOptions[input.name as keyof TitleOptions] as string}
                  onChange={handleInputChange}
                >
                  {input.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : input.type === "checkbox" ? (
                <input
                  type="checkbox"
                  name={input.name}
                  checked={titleOptions[input.name as keyof TitleOptions] as boolean ?? false}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type={input.type}
                  name={input.name}
                  value={titleOptions[input.name as keyof TitleOptions] as string}
                  onChange={handleInputChange}
                />
              )}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TitleConfigurator;
