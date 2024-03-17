import React from 'react';
import { TAxiosConfig } from './useCanvasjsConfig';



interface Props {
    axisConfig: TAxiosConfig;
    setAxisConfig: React.Dispatch<React.SetStateAction<TAxiosConfig>>;
}

const AxisConfigurator= ({ axisConfig, setAxisConfig }:Props) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAxisConfig(prevConfig => ({
            ...prevConfig,
            [name]: name === 'labelFontSize' || name === 'interval' || name === 'labelAngle' || name === 'tickLength' || name === 'labelMaxWidth' ? parseInt(value) : value
        }));
    };

    // Define an array of axis configuration properties
    const axisProperties: { name: keyof TAxiosConfig; label: string; type?: string }[] = [
        { name: 'title', label: 'Title' },
        { name: 'labelFontSize', label: 'Label Font Size', type: 'number' },
        { name: 'interval', label: 'Interval', type: 'number' },
        { name: 'labelAngle', label: 'Label Angle', type: 'number' },
        { name: 'interlacedColor', label: 'Interlaced Color', type: 'color' },
        { name: 'tickLength', label: 'Tick Length', type: 'number' },
        { name: 'labelMaxWidth', label: 'Label Max Width', type: 'number' }
    ];

    return (
        <div>
            {axisProperties.map(property => (
                <div key={property.name}>
                    <label>
                        {property.label}:
                        {property.type === 'color' ? (
                            <input
                                type="color"
                                name={property.name}
                                value={axisConfig[property.name] as string}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <input
                                type={property.type || 'text'}
                                name={property.name}
                                value={axisConfig[property.name]}
                                onChange={handleInputChange}
                            />
                        )}
                    </label>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default AxisConfigurator;
