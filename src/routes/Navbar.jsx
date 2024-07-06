import React from 'react';
import Select from 'react-select';
// import '../Styles/Navbar.css';

const Navbar = ({id ,  userLang, setUserLang, userTheme,
    setUserTheme, fontSize, setFontSize , submit }) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]
    return (
        <div className="flex mx-2 bg-[#474747] p-2">
            <select 
                value={userLang} 
                onChange={(e) => setUserLang(e.target.value)} 
                className="mr-4 bg-[#474747] text-[#fff]"
            >
                {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
            </select>
            <select 
                value={userTheme} 
                onChange={(e) => setUserTheme(e.target.value)} 
                className="mr-4 bg-[#474747] text-[#fff]"
              
            >
                {themes.map(theme => (
                    <option key={theme.value} value={theme.value}>{theme.label}</option>
                ))}
            </select>
            <div className='flex justify-center items-center mx-4 '>  <label className='mx-2 text-white'>Font Size</label>
            <input type="range" min="18" max="30"
                value={fontSize} step="2"
                onChange={(e) => { setFontSize(e.target.value) }} className=''/></div>
            <button onClick={submit} className='text-white border-2 px-3 bg-red-500 rounded-xl'>run</button>
        </div>
    )
}

export default Navbar