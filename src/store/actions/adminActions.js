import actionTypes from "./actionTypes";
import {
  getAllCode,
  createNewUser,
  getAllUsers,
  deleteUser,
  editUser,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getAllSpecialty,
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      const res = await getAllCode("GENDER");

      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCode("ROLE");

      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCode("POSITION");

      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const createNewuser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await createNewUser(data);

      if (res && res.errCode === 0) {
        // console.log("check user redux:", res);
        toast.success("Create a new user succeeded!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log(e);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllUsers("ALL");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log(e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteuser = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await deleteUser(id);

      if (res && res.errCode === 0) {
        toast.success("Delete user succeeded!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const edituser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await editUser(data);

      if (res && res.errCode === 0) {
        dispatch(editUsersSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(editUsersFailed());
      }
    } catch (e) {
      dispatch(editUsersFailed());
      console.log(e);
    }
  };
};
export const editUsersSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUsersFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getTopDoctorHomeService(10);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
      console.log(e);
    }
  };
};
//
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
      console.log(e);
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save info doctor success!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        toast.error(`Save info doctor error!`);
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save info doctor error!");
      console.log("SAVE_DETAIL_DOCTOR_FAILED: ", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
      console.log(e);
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCode("TIME");

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.SAVE_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SAVE_ALLCODE_SCHEDULE_TIME_FAILED,
      });
      console.log(e);
    }
  };
};
// doctor in fo
export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
      const resPrice = await getAllCode("PRICE");
      const resPayment = await getAllCode("PAYMENT");
      const resProvince = await getAllCode("PROVINCE");
      const resSpecialty = await getAllSpecialty();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0
      ) {
        const data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInfoFailed());
      console.log(e);
    }
  };
};

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
