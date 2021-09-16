import "./loadingAnimationLinear.css";

function LoadingAnimationLinear(props) {
  return (
    <div className="lds-ellipsis">
      <div style={{ backgroundColor: props.color }}></div>
      <div style={{ backgroundColor: props.color }}></div>
      <div style={{ backgroundColor: props.color }}></div>
      <div style={{ backgroundColor: props.color }}></div>
    </div>
  );
}

export default LoadingAnimationLinear;
