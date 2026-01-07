import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import contactService from "./contactService";


  export const fetchContacts=createAsyncThunk("contacts/fetchContacts",async(params,thunkAPI)=>{
    try {
        return await contactService.getContacts(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
   });

  export const addContact=createAsyncThunk("contacts/addContact",async(Contactdata,thunkAPI)=>{
    
    try {
        return await contactService.addContact(Contactdata)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
   })

  export const updateContact=createAsyncThunk("contacts/updateContacts",async({contactId,contactData},thunkAPI)=>{

    try{
        return await contactService.updateContact(contactId,contactData);
    } catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
   })

  export const fetchContactFields=createAsyncThunk("contacts/getContactFields",async(_,thunkAPI)=>{
   
    try {
        return await contactService.getContactFields();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
        
    }

   })

   const initialState={
    contacts:[],
        fields:[],
        activityLog:[],
        loading: {
            fetch: false,
            create: false,
            update: false,
          },
          error: {
            fetch: null,
            create: null,
            update: null,
          }
   }




   const contactSlice=createSlice({
    name:"contacts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

        // get contacts
        .addCase(fetchContacts.pending,(state)=>{
         state.loading.fetch=true;
         state.error.fetch=null;
        })
        .addCase(fetchContacts.fulfilled,(state,action)=>{
            state.loading.fetch=false;
            state.contacts=action.payload || []
        })
        .addCase(fetchContacts.rejected,(state,action)=>{
            state.loading.fetch=false;
            state.error.fetch=action.payload
        })

        // add contact

        .addCase(addContact.pending,(state)=>{
            state.loading.fetch=true;
            state.error.fetch=null;
        })
        .addCase(addContact.fulfilled,(state,action)=>{
            state.loading.fetch=false;
            state.contacts.push(action.payload);
        })
        .addCase(addContact.rejected,(state,action)=>{
            state.loading.fetch=false;
            state.error.fetch=action.payload;
        })

        // update contact
         
        .addCase(updateContact.pending,(state)=>{
            state.loading.update=true;
            state.error.update=null;
        })
        .addCase(updateContact.fulfilled,(state,action)=>{
            state.loading.update=false;
            const index=state.contacts.findIndex((contact)=>contact.id===action.payload.id);
            if(index!==-1) state.contacts[index]=action.payload;
        })
        .addCase(updateContact.rejected,(state,action)=>{
            state.loading.update=false;
            state.error.update=action.payload;
        })

        // fetchContactFields

        .addCase(fetchContactFields.pending,(state)=>{
         state.loading.fetch=true;
         state.error.fetch=null;
        })
        .addCase(fetchContactFields.fulfilled,(state,action)=>{
            state.loading.fetch=false;
            state.fields=action.payload;
        })
        .addCase(fetchContactFields.rejected,(state,action)=>{
            state.loading.fetch=false;
            state.error.fetch=action.payload;
        })

    }
   })

export default contactSlice.reducer;