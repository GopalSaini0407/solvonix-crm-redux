import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchLeadStage } from "./leadStageSlice";

const LeadStageList=()=>{

  const dispatch=useDispatch();

  const {leadStages,error,loading}=useSelector((state)=>state.leadStages);

  console.log(leadStages);

  useEffect(()=>{
    dispatch(fetchLeadStage())
  },[dispatch])
  return(
    <>

    </>
  )
}

export default LeadStageList;