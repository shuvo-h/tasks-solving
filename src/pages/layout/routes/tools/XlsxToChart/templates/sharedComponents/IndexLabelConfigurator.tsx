import React from 'react';
import { TIndexLabelConfig } from './useCanvasjsConfig';


type TIndexLabelConfiguratorProps = {
    indexLabelConfig: TIndexLabelConfig;
    setIndexLabelConfig: React.Dispatch<React.SetStateAction<TIndexLabelConfig>>;
};

type TIndexLabelField = {
    name: keyof TIndexLabelConfig;
    label: string;
    type: string;
    options?: string[] | undefined;
};


const IndexLabelConfigurator = ({
    indexLabelConfig,
    setIndexLabelConfig,
}: TIndexLabelConfiguratorProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIndexLabelConfig(prevOptions => ({
            ...prevOptions,
            [name]: value,
        }));
    };

    const indexLabelFields: TIndexLabelField[] = [
        { name: 'indexLabel', label: 'Index Label', type: 'text' },
        { name: 'indexLabelFontColor', label: 'Font Color', type: 'color' },
        { name: 'indexLabelFontSize', label: 'Font Size', type: 'number' },
        { name: 'indexLabelFontStyle', label: 'Font Style', type: 'select', options: ['normal', 'italic', 'oblique'] },
        { name: 'indexLabelFontWeight', label: 'Font Weight', type: 'select', options: ['normal', 'bold', 'bolder', 'lighter'] },
        { name: 'indexLabelBackgroundColor', label: 'Background Color', type: 'color' },
        { name: 'indexLabelBorderColor', label: 'Border Color', type: 'color' },
        { name: 'indexLabelPadding', label: 'Padding', type: 'number' },
        { name: 'indexLabelWrap', label: 'Wrap Text', type: 'checkbox' },
        { name: 'indexLabelMaxWidth', label: 'Max Width', type: 'number' },
        { name: 'indexLabelPlacement', label: 'Placement', type: 'select', options: ['inside', 'outside', 'auto'] },
        { name: 'indexLabelLineThickness', label: 'Line Thickness', type: 'number' },
        { name: 'indexLabelOrientation', label: 'Orientation', type: 'select', options: ['horizontal', 'vertical'] },
    ];

    const renderField = (field: TIndexLabelField) => {
        if (field.type === 'select' && field.options) {
            return (
                <select
                    key={field.name as string}
                    name={field.name as string}
                    value={indexLabelConfig[field.name]}
                    onChange={handleInputChange}
                >
                    {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        } else if (field.type === 'checkbox') {
            return (
                <input
                    key={field.name as string}
                    type="checkbox"
                    name={field.name as string}
                    checked={indexLabelConfig[field.name] as boolean}
                    onChange={handleInputChange}
                />
            );
        } else {
            return (
                <input
                    key={field.name as string}
                    type={field.type}
                    name={field.name as string}
                    value={indexLabelConfig[field.name]}
                    onChange={handleInputChange}
                />
            );
        }
    };

    return (
        <div>
            {indexLabelFields.map(field => (
                <div key={field.name}>
                    <label>{field.label}: </label>
                    {renderField(field)}
                    <br />
                </div>
            ))}
        </div>
    );
};

export default IndexLabelConfigurator;
