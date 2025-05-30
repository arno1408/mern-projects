const Dashboard_input_card = ({ label, children }) => {
    return (
        <>
            <div className="dashboard-card-div backdrop-blur-xl  bg-mob-home-card-gradient">
                <p className="small-level1-p dashboard-card-p">{label}</p>
                {children}
            </div>
        </>
    )
}
 
export default Dashboard_input_card