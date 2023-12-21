import { CssBaseline } from '@mui/material';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeContextType {
    activeTheme: ThemeOptions;
    setActiveTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType>(null!);

export const useCustomTheme = () => useContext(ThemeContext);

interface CustomThemeProviderProps {
    children: React.ReactNode;
    themes: { [themeName: string]: ThemeOptions };
    defaultThemeName?: string;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children, themes, defaultThemeName }) => {
    const [activeThemeName, setActiveThemeName] = useState(defaultThemeName || Object.keys(themes)[0]);

    const activeTheme = useMemo(() => {
        return createTheme(themes[activeThemeName]);
    }, [activeThemeName, themes]);

    useEffect(() => {
        if (!themes[activeThemeName]) {
            const newThemeName = Object.keys(themes)[0];
            setActiveThemeName(newThemeName);
        }
    }, [activeThemeName, themes]);

    const changeTheme = (themeName: string) => {
        if (themes[themeName]) {
            setActiveThemeName(themeName);
        }
    };

    return (
        <ThemeContext.Provider value={{ activeTheme, setActiveTheme: changeTheme }}>
            <ThemeProvider theme={activeTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
