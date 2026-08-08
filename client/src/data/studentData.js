import students from "./students.json";

const studentData = students.map((student) => ({
  ...student,
}));

export default studentData;