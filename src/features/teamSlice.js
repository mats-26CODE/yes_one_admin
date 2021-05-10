import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamHeader: "",
  teamIntro: "",
  teamTrait: "",

  teamInfo: {},
  teamTraits: {},
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    saveTeamIntro: (state, action) => {
      state.teamHeader = action.payload;
      state.teamIntro = action.payload;
    },
    fetchTeamInfo: (state, action) => {
      console.log("team info reducer:", action.payload);
      state.teamInfo = action.payload;
    },
    saveTeamTrait: (state, action) => {
      state.teamTrait = action.payload;
    },
    fetchTeamTraits: (state, action) => {
        state.teamTraits = action.payload;
    }
  },
});

export const {
  saveTeamIntro,
  fetchTeamInfo,
  saveTeamTrait,
  fetchTeamTraits
} = teamSlice.actions;

export const selectTeam = (state) => state.team.teamInfo;
export const selectTeamTraits = (state) => state.team.teamTraits;

export default teamSlice.reducer;
