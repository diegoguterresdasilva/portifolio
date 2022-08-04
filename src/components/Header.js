import React, { useEffect } from "react";
import Typical from "react-typical";

const Header = (props) =>  {
  let titles = [];
  useEffect (() => {
    if(props.systemTheme != null){
      if(props.systemTheme == "dark"){
        setTheme(true);
      }else{
        setTheme(false);
      }
    }
  }, [props.systemTheme]);

  function setTheme(tema) {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
    tema ?  "dark" : "light";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  if (props.sharedData) {
    var name = props.sharedData.name;
    titles = props.sharedData.titles.map(x => [ x.toUpperCase(), 1500 ] ).flat();
  }
  const HeaderTitleTypeAnimation = React.memo( () => {
    return <Typical className="title-styles" steps={titles} loop={50} />
  }, (props, prevProp) => true);
  return (
    <header id="home" style={{ display: 'block' }}> 
      <div className="row aligner" style={{height: '100%'}}>
        <div className="col-md-12">
          <div>
            <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
            <br/>
            <h1 className="mb-0">
              <Typical steps={[name]} wrapper="p" />
            </h1>
            <div className="title-container">
              <HeaderTitleTypeAnimation />
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
