"use client"

import { useEffect, useState } from "react"
import {
  Pencil,
  Trash2,
  Zap,
  Star,
  Eye,
  EyeOff,
} from "lucide-react"
import ReusableDragDropList from "../../components/shared/ReusableDragDropList"
import {useSelector,useDispatch} from 'react-redux';
import {fetchLeadStage,changeLeadStagePriority} from './leadStageSlice';
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import CustomButton from "../../components/ui/CustomButton";
import AddLeadStage from "./AddLeadStage";
import { useModal } from "../../context/ModalContext";


const LeadStageList = () => {
  const [stages, setStages] = useState([]);

  const {openModal,closeModal}=useModal();

  const dispatch=useDispatch();

  const {leadStages,error,loading} =useSelector((state)=>state.leadStages);
  
  console.log(leadStages);
  useEffect(()=>{
    dispatch(fetchLeadStage())
  },[dispatch])


// change priority


useEffect(() => {
  setStages(leadStages);
}, [leadStages]);

const changePriority = async (newOrder) => {
  if (!newOrder) return;
  setStages(newOrder);

  for (let index = 0; index < newOrder.length; index++) {
    const item = newOrder[index];
    if (!item?.id) continue; // undefined ko skip karo

    const response = await dispatch(
      changeLeadStagePriority({
        leadStageId: item.id,
        data: { priority: index + 1 },
      })
    ).unwrap();

    setStages((prev) =>
      prev.map((stage) =>
        stage?.id === response.data?.id ? response.data : stage
      )
    );
  }
};




  if(loading.fetch){
    return (<Loader text="Loading LeadStage..." size="lg"/>)
  }

  if(error.fetch){
    return(<ErrorState 
       title="failed to load lead stage"
       message={error.fetch}
       onRetry={()=>dispatch(fetchLeadStage())}
    />)
  }


  // const [data, setData] = useState(leadStages)

  /* -------- Active Toggle -------- */
  // const toggleActive = (id) => {
  //   setData((prev) =>
  //     prev.map((item) => {
  //       if (item.id === id) {
  //         const updated = {
  //           ...item,
  //           is_active: item.is_active === 1 ? 0 : 1,
  //         }

  //         alert(
  //           updated.is_active === 1
  //             ? `"${item.stage_name}" is now ACTIVE`
  //             : `"${item.stage_name}" is now INACTIVE`
  //         )

  //         return updated
  //       }
  //       return item
  //     })
  //   )
  // }


  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-2xl font-bold flex justify-between">
          Lead Stage Ordering
        <CustomButton variant="themePrimary"
        onClick={()=>openModal({
          title:"Add Lead Stage",
          size:"md",
          content:<AddLeadStage onClose={closeModal}/>
        })}

        >add stage</CustomButton>
        </h1>

        {/* ================= DRAG LIST ================= */}
        <ReusableDragDropList
          items={stages || []}
          onChange={changePriority}
          renderItem={(item) => {
             if(!item) return null
            
            return ( <div className="flex items-center justify-between w-full">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <span
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: item.color_code }}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">
                      {item.stage_name}
                    </h3>

                    {item.is_default === 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                        <Star size={12} /> Default
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                  Priority: {stages.findIndex(s => s.id === item.id) + 1}                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
              

                {/* Active / Inactive */}
                <button
                  onClick={() => toggleActive(item.id)}
                  className={`p-2 rounded-lg ${
                    item.is_active
                      ? "text-green-600 hover:bg-green-100"
                      : "text-gray-400 hover:bg-gray-100"
                  }`}
                  title="Toggle Active"
                >
                  {item.is_active ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>

                {/* Edit */}
                <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                  <Pencil size={16} />
                </button>

                {/* Delete */}
                <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>)
          }}
        />

        {/* ================= PREVIEW ================= */}
        {/* <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Lead Stage Preview (Active Only)
          </h2>

          <div className="flex gap-3 flex-wrap">
            {leadStages
              .filter((stage) => stage.is_active === 1)
              .sort((a, b) => a.priority - b.priority)
              .map((stage) => (
                <div
                  key={stage.id}
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow"
                  style={{ backgroundColor: stage.color_code }}
                >
                  {stage.stage_name}
                </div>
              ))}

            {leadStages.filter((s) => s.is_active === 1).length === 0 && (
              <p className="text-sm text-gray-500">
                No active stages
              </p>
            )}
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default LeadStageList;
