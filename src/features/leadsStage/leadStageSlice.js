import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'; 
import leadStageService from './leadStageService';



export const fetchLeadStage=createAsyncThunk("leadStage/fetchLeadStage",async(_,thunkAPI)=>{

    try {
        return await leadStageService.getLeadStage();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
})

export const addLeadStage=createAsyncThunk("leadStage/addLeadStage",async(data,thunkAPI)=>{

    try {
        return await leadStageService.addLeadStage(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
})

export const updateLeadStage=createAsyncThunk("leadStage/updateLeadStage",async({leadStageId,data},thunkAPI)=>{
   try{
           return await leadStageService.updateLeadStage(leadStageId,data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || err.message);

    }
})

export const changeLeadStagePriority=createAsyncThunk("leadStage/changeLeadStagePriority",async({leadStageId,data},thunkAPI)=>{

    try {
        return await leadStageService.changeLeadStagePriority(leadStageId,data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
})

const initialState={
    leadStages:[],
    loading:{
        fetch:false,
        create:false,
        update:false,
        priority:false,

    },
    error:{
        fetch:false,
        create:false,
        update:false,
        priority:false,

    }
}

const leadStageSlice=createSlice({
    name:"leadStages",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder

    //  fetch lead stage
     .addCase(fetchLeadStage.pending,(state)=>{
    state.loading.fetch=true;
    state.error.fetch=null;
     })

    .addCase(fetchLeadStage.fulfilled,(state,action)=>{
        state.loading.fetch=false;
        state.leadStages=action.payload.data;
    })

    .addCase(fetchLeadStage.rejected,(state,action)=>{
        state.loading.fetch=false;
        state.error.fetch=action.payload;
    })

    // add lead stage

    .addCase(addLeadStage.pending,(state)=>{
     state.loading.create=true;
     state.error.create=null;
    })
    
    .addCase(addLeadStage.fulfilled,(state,action)=>{
        state.loading.create=false;
        state.leadStages.push(action.payload);
    })
    .addCase(addLeadStage.rejected,(state,action)=>{
        state.loading.create=false;
        state.error.create=action.payload;
    })
    
    // update lead stage
    .addCase(updateLeadStage.pending,(state)=>{
        state.loading.update=true;
        state.error.update=null;
    })
    .addCase(updateLeadStage.fulfilled,(state,action)=>{
        state.loading.update=false;
        const index=state.leadStages.findIndex((leadStage)=>leadStage.id===action.payload.id);
        if(index !==-1) state.leadStages[index]=action.payload;
    })
    .addCase(updateLeadStage.rejected,(state,action)=>{
        state.loading.update=false;
        state.error.update=action.payload;
    })

    // change lead stage priority

    .addCase(changeLeadStagePriority.pending,(state)=>{
        state.loading.priority=true;
        state.error.priority=null;
    })
    .addCase(changeLeadStagePriority.fulfilled,(state,action)=>{
      state.loading.priority=false;
      state.leadStages=action.payload;
       })
    .addCase(changeLeadStagePriority.rejected,(state,action)=>{
        state.loading.priority=false;
        state.error.priority=null;
    })

    }
})

export default leadStageSlice.reducer;