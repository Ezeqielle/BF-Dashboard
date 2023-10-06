import Overview from "../../components/overview/Overview"
import"./addingdashbard.scss"

const Addingdashboard = () => {
  return (
    <div className="addingdashbard">
      <div className="box box1">
        <Overview />
      </div>
      <div className="box box2 graph">Box2</div>
      <div className="box box3 graph">Box3</div>
      <div className="box box4 graph">Box4</div>
      <div className="box box5">Box5</div>
    </div>
  )
}

export default Addingdashboard