import React from 'react';
import { TLegendConfigure } from './useCanvasjsConfig';

type TLegendConfiguratorProps = {
    legendConfigure: TLegendConfigure;
    setLegendConfigure: React.Dispatch<React.SetStateAction<TLegendConfigure>>;
};
type TLegendField = {
    name: keyof TLegendConfigure;
    label: string;
    type: string;
    options?: string[] | undefined;
};

const LegendConfigurator: React.FC<TLegendConfiguratorProps> = ({
    legendConfigure,
    setLegendConfigure,
}: TLegendConfiguratorProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLegendConfigure(prevOptions => ({
            ...prevOptions,
            [name]: value,
        }));
    };

    const legendFields = [
        { name: 'fontColor', label: 'Font Color', type: 'color' },
        { name: 'fontSize', label: 'Font Size', type: 'number' },
        { name: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', 'bold', 'bolder', 'lighter'] },
        { name: 'fontStyle', label: 'Font Style', type: 'select', options: ['normal', 'italic', 'oblique'] },
        { name: 'verticalAlign', label: 'Vertical Align', type: 'select', options: ['top', 'center', 'bottom'] },
        { name: 'horizontalAlign', label: 'Horizontal Align', type: 'select', options: ['left', 'center', 'right'] },
    ];

    const renderField = (field: TLegendField) => {
        if (field.type === 'select' && field.options) {
            return (
                <select
                    key={field.name}
                    name={field.name}
                    value={legendConfigure[field.name]}
                    onChange={handleInputChange}
                >
                    {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        } else {
            return (
                <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={legendConfigure[field.name]}
                    onChange={handleInputChange}
                />
            );
        }
    };

    return (
        <div>
            {legendFields.map((field) => (
                <div key={field.name}>
                    <label>{field.label}: </label>
                    {renderField(field as TLegendField)}
                    <br />
                </div>
            ))}
        </div>
    );
};

export default LegendConfigurator;
