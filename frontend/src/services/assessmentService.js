import api from "./api";

export const createAssessment = async (data) => {
  const response = await api.post("/assessment", data);
  return response.data;
};

export const resetAssessmentToday = async () => {
  const response = await api.delete("/assessment/reset");
  return response.data;
};