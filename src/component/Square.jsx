function Square(props) {
    return (
      <button
        className="square"
        style={{
          
          fontSize: "40px",
          width: "100px",
          height: "100px",
          verticalAlign: "top",
          outline: "none",
          borderColor:"black",
          background:"#AA6C39",
          color:"#552600",
        }}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }

  export default Square;
