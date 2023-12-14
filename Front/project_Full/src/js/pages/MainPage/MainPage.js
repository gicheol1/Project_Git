import ViewerContainer from "./ViewerContainer";
import ViewerContainer2 from "./ViewerContainer2";
import ViewerContainer3 from "./ViewerContainer3";


function MainPage() {
    return (
      <div className="Main">
        <ViewerContainer />
        <ViewerContainer3 />
        <ViewerContainer2 /> 
      </div>
    );
  }
  
  export default MainPage;