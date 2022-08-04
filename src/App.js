import React, { useState, useEffect } from "react";
import $ from "jquery";
import useSystemTheme from 'react-use-system-theme';

import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Switch from "react-switch";

const App = (props) =>  {
  const [foo, setFoo] = useState("bar");  
  const [resumeData, setResumeData] = useState({});  
  const [sharedData, setSharedData] = useState({});  
  const [checked, setChecked] = useState(false);  
  const [thema, setThema] = useState('light');  

  function applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
    swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`;
    loadResumeFromPath(resumePath);
  }

  function swapCurrentlyActiveLanguage(oppositeLangIconId) {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute("filter", "brightness(40%)");
    document
      .getElementById(pickedLangIconId)
      .setAttribute("filter", "brightness(40%)");
  }
  function loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        setSharedData(data);
      },
    });
  }
  let systemTheme = useSystemTheme();
  useEffect (() => {
    loadSharedData();
    applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
    console.log(systemTheme)
    if(systemTheme != null){
      if(systemTheme == "dark"){
        setChecked(true)
      }else{
        setChecked(false)
      }
      setThema(systemTheme)
    }
  }, [systemTheme]);

  function loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        setResumeData(data);
      },
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }
  
  const onThemeSwitchChange = (checked) => {
    setChecked(checked);
    if(checked){
      setThema('dark');
    }else{
      setThema('light');
    }
  }
  
  return (
      <div>
        <div className="row mx-auto text-center language">
          <div className="mx-auto" style={{paddingLeft: "100px"}}>
            <div
              onClick={() =>
                applyPickedLanguage(
                  window.$primaryLanguage,
                  window.$secondaryLanguageIconId
                )
              }
              style={{ display: "inline" }}
            >
              <span
                className="iconify language-icon mr-5"
                data-icon="twemoji-flag-for-flag-brazil"
                data-inline="false"
                id={window.$primaryLanguageIconId}
              ></span>
            </div>
            <div
              onClick={() =>
                applyPickedLanguage(
                  window.$secondaryLanguage,
                  window.$primaryLanguageIconId
                )
              }
              style={{ display: "inline" }}
            >
              <span
                className="iconify language-icon"
                data-icon="twemoji-flag-for-flag-united-kingdom"
                data-inline="false"
                id={window.$secondaryLanguageIconId}
              ></span>
            </div>
          </div>
          <div className="pull-right" style={{marginRight: "10px", marginTop: "5px"}}>
            <Switch
              checked={checked}
              onChange={onThemeSwitchChange}
              offColor="#d6d6d6"
              onColor="#353535"
              className="react-switch"
              width={90}
              height={40}
              uncheckedIcon={
                <span
                  className="iconify"
                  data-icon="twemoji:owl"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "20px",
                    color: "#353239",
                  }}
                ></span>
              }
              checkedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:sun-with-face"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "10px",
                    color: "#353239",
                  }}
                ></span>
              }
              id="icon-switch"
            />
          </div>
        </div>
        <Header sharedData={sharedData.basic_info} systemTheme={thema} />
        <About
          resumeBasicInfo={resumeData.basic_info}
          sharedBasicInfo={sharedData.basic_info}
        />
        {/* <Projects
          resumeProjects={resumeData.projects}
          resumeBasicInfo={resumeData.basic_info}
        /> */}
        <Skills
          sharedSkills={sharedData.skills}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Experience
          resumeExperience={resumeData.experience}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Footer sharedBasicInfo={sharedData.basic_info} />
      </div>
  );

}

export default App;
