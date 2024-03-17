import React from 'react';

type TCustomConfigProps = {
    customConfig: {
        theme: string;
        height: number;
        width: number;
    };
    setCustomConfig: React.Dispatch<React.SetStateAction<{
        theme: string;
        height: number;
        width: number;
    }>>;
};

type TCustomConfigField = {
    name: keyof TCustomConfigProps['customConfig'];
    label: string;
    type: string;
    options?: string[];
};

const CustomConfigurator: React.FC<TCustomConfigProps> = ({ customConfig, setCustomConfig }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let newValue: string | number = value;
        if (type === 'number') {
            // Ensure the value is at least 100
            newValue = Math.max(parseInt(value) || 0, 200);
        }
        setCustomConfig(prevConfig => ({
            ...prevConfig,
            [name]: newValue,
        }));
    };

    const customConfigFields: TCustomConfigField[] = [
        { name: 'theme', label: 'Theme', type: 'select', options: ['light1', 'light2', 'dark1', 'dark2'] },
        { name: 'height', label: 'Height', type: 'range' },
        { name: 'width', label: 'Width', type: 'range' },
    ];

    const renderField = (field: TCustomConfigField) => {
        if (field.type === 'select' && field.options) {
            return (
                <select
                    key={field.name as string}
                    name={field.name as string}
                    value={customConfig[field.name]}
                    onChange={handleInputChange}
                >
                    {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        } else if (field.type === 'range' && (field.name === 'width' || field.name === 'height')) {
            return (
                <input
                    key={field.name as string}
                    type="range"
                    name={field.name as string}
                    value={customConfig[field.name]}
                    min="500"
                    max="2000"
                    step="100"
                    onChange={handleInputChange}
                />
            );
        } else {
            return (
                <input
                    key={field.name as string}
                    type={field.type}
                    name={field.name as string}
                    value={customConfig[field.name]}
                    onChange={handleInputChange}
                />
            );
        }
    };

    return (
        <div>
            {customConfigFields.map(field => (
                <div key={field.name}>
                    <label>{field.label}: </label>
                    {renderField(field)}
                    <br />
                </div>
            ))}
        </div>
    );
};

export default CustomConfigurator;
