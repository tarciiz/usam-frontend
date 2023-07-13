import Menu from "../components/Menu";


function BasePage(props){

    return (
    <div className="container-fluid">
        <div className="row" style={{'height': '100vh'}}>
            <div className="col-sm-2 m-0 p-0">
                <Menu/>
            </div>
            <div className="col-sm-10">
                <div className="container" style={{"height": "100%"}}>
                    <h4 className="pb-3 pt-3">{props.title}</h4>

                    {props.children}

                </div>
            </div>
        </div>
    </div>)
}

export default BasePage;