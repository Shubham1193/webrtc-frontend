import React from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const Navbar = ({
    id,
    userLang,
    setUserLang,
    userTheme,
    setUserTheme,
    fontSize,
    setFontSize,
    submit,
    searchQuestion,
    roomid
}) => {
    const languages = [
        // { value: "c", label: "C" },
        // { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        // { value: "java", label: "Java" },
    ];

    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];

    const navigator = useNavigate();

    let themeKey = '';
    // let keys = Object.keys(themes)
    for (let key in themes) {
        console.log(key)
      if (themes[key].value === 'vs-dark') {
        themeKey = themes[key].label;
        break; // Add a break if you want to stop once the theme is found
      }
    }

    return (
        <div className="flex bg-[#03B2F7] p-2 h-[100%]  items-center">
            <Select
                value={{ value: userLang, label: userLang }}
                onChange={(option) => setUserLang(option.value)}
                options={languages}
                className="mr-4"
                classNamePrefix="select"
                isSearchable = {false}
            />

            <Select
                value={{ value: userTheme, label: themeKey }}
                onChange={(option) => setUserTheme(option.value)}
                options={themes}
                className="mr-4"
                classNamePrefix="select"
                isSearchable = {false}
            />

            <div className='flex justify-center items-center mx-4 '>
                <label className='mx-2 text-white'>Font Size</label>
                <input
                    type="range"
                    min="15"
                    max="30"
                    value={fontSize}
                    step="2"
                    onChange={(e) => { setFontSize(e.target.value) }}
                />
            </div>

            <button onClick={submit} className='text-white border-2  h-[60%] px-4 bg-[#3285E4] rounded-xl hover:bg-sky-700' >Run</button>

            <button onClick={() => searchQuestion()} className='text-white h-[60%] border-2 px-3 bg-[#3285E4] rounded-xl mx-2 hover:bg-sky-700' >Search Problems</button>

            <div className='p-3 flex justify-center items-center bg-white rounded-xl mx-3'><p>{roomid}</p></div>
        </div>
    );
}

export default Navbar;
