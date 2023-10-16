import "./overview.scss"
import  { topDealUsers } from "../../data"

const Overview = () => {
  return (
    <div className="overview">
        <h1>Overview</h1>
        <div className="list">
            {topDealUsers.map((user) => (
                <div className="listItem" key={user.id}>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Overview