import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUser = (data) => {
  return axios.post(`/api/create-new-user`, data);
};
const deleteUser = (id) => {
  return axios.delete(`/api/delete-user`, { data: { id } });
};
const editUser = (data) => {
  return axios.put(`/api/edit-user`, data);
};

const getAllCode = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};
const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const postPatientBooking = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyBooking = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};
const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};
const getDetailSpecialty = (id) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${id}`);
};
// clinic
const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};
const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};
const getDetailClinic = (id) => {
  return axios.get(`/api/get-detail-Clinic-by-id?id=${id}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
  getAllCode,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  postPatientBooking,
  postVerifyBooking,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialty,
  createNewClinic,
  getAllClinic,
  getDetailClinic,
};
