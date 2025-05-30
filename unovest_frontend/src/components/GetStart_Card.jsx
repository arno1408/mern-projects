import { useNavigate } from "react-router-dom"
import RoundedBtn from "./RoundedBtn"

const GetStart_Card = (props) => {
    const navigate = useNavigate()
    return (
        <>
            <div className="getStart-card-div"
                style={{ boxShadow: "0px 20px 80px 2px #000" }}
            >

                <div className=" getStart-card-sub-div">Let us do the math for you, so you can enjoy financial freedom</div>


                <div className="flex w-full ">
                    <RoundedBtn label='Get Started'
                        // onClick={() => { navigate('quiz') }}
                        type={props.type}
                    />
                </div>
            </div>
        </>
    )
}

export default GetStart_Card